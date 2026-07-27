import express from "express";
import cors from "cors";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFile = path.join(__dirname, "data", "bookings.json");

const PORT = process.env.PORT || 3001;

// In production, set CLIENT_URL to your Vercel address.
// Multiple origins can be entered as a comma-separated list.
const allowedOrigins = (
  process.env.CLIENT_URL ||
  "http://localhost:5173,http://127.0.0.1:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow tools such as Postman and curl, which may not send an Origin.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("This website is not allowed to access the API."));
    },
  })
);

app.use(express.json({ limit: "100kb" }));

async function readBookings() {
  try {
    const contents = await fs.readFile(dataFile, "utf8");
    const bookings = JSON.parse(contents);

    return Array.isArray(bookings) ? bookings : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeBookings([]);
      return [];
    }

    throw error;
  }
}

async function writeBookings(bookings) {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(bookings, null, 2), "utf8");
}

function cleanText(value, maximumLength = 200) {
  return typeof value === "string"
    ? value.trim().slice(0, maximumLength)
    : "";
}

function validateBooking(body) {
  const booking = {
    fullName: cleanText(body.fullName, 100),
    phone: cleanText(body.phone, 30),
    pickup: cleanText(body.pickup, 200),
    dropoff: cleanText(body.dropoff, 200),
    service: cleanText(body.service, 50),
    date: cleanText(body.date, 20),
    time: cleanText(body.time, 20),
    notes: cleanText(body.notes, 500),
  };

  const errors = {};

  if (!booking.fullName) {
    errors.fullName = "Full name is required.";
  }

  if (!booking.phone) {
    errors.phone = "Phone number is required.";
  } else {
    const digits = booking.phone.replace(/\D/g, "");

    if (digits.length < 10 || digits.length > 15) {
      errors.phone = "Enter a valid phone number.";
    }
  }

  if (!booking.pickup) {
    errors.pickup = "Pickup location is required.";
  }

  if (!booking.dropoff) {
    errors.dropoff = "Drop-off location is required.";
  }

  if (
    booking.pickup &&
    booking.dropoff &&
    booking.pickup.toLowerCase() === booking.dropoff.toLowerCase()
  ) {
    errors.dropoff = "Drop-off must be different from pickup.";
  }

  const allowedServices = ["Standard", "Airport", "Premium", "Shared"];

  if (!allowedServices.includes(booking.service)) {
    errors.service = "Select a valid service.";
  }

  if (!booking.date) {
    errors.date = "Pickup date is required.";
  }

  if (!booking.time) {
    errors.time = "Pickup time is required.";
  }

  if (booking.date && booking.time) {
    const pickupDateTime = new Date(`${booking.date}T${booking.time}`);

    if (Number.isNaN(pickupDateTime.getTime())) {
      errors.time = "Enter a valid pickup date and time.";
    } else if (pickupDateTime.getTime() < Date.now() - 60_000) {
      errors.time = "Pickup date and time must be in the future.";
    }
  }

  return {
    booking,
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}

app.get("/", (request, response) => {
  response.json({
    message: "Book_A_Taxi API",
    endpoints: {
      health: "/api/health",
      bookings: "/api/bookings",
    },
  });
});

app.get("/api/health", (request, response) => {
  response.json({
    status: "ok",
    service: "Book_A_Taxi API",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/bookings", async (request, response, next) => {
  try {
    const bookings = await readBookings();
    response.json(bookings);
  } catch (error) {
    next(error);
  }
});

app.get("/api/bookings/:id", async (request, response, next) => {
  try {
    const bookings = await readBookings();
    const booking = bookings.find((item) => item.id === request.params.id);

    if (!booking) {
      return response.status(404).json({
        message: "Booking not found.",
      });
    }

    response.json(booking);
  } catch (error) {
    next(error);
  }
});

app.post("/api/bookings", async (request, response, next) => {
  try {
    const { booking, errors, isValid } = validateBooking(request.body);

    if (!isValid) {
      return response.status(400).json({
        message: "Please correct the booking information.",
        errors,
      });
    }

    const bookings = await readBookings();

    const newBooking = {
      id: crypto.randomUUID(),
      ...booking,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    bookings.push(newBooking);
    await writeBookings(bookings);

    response.status(201).json({
      message: "Booking submitted successfully.",
      booking: newBooking,
    });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/bookings/:id", async (request, response, next) => {
  try {
    const bookings = await readBookings();
    const updatedBookings = bookings.filter(
      (item) => item.id !== request.params.id
    );

    if (updatedBookings.length === bookings.length) {
      return response.status(404).json({
        message: "Booking not found.",
      });
    }

    await writeBookings(updatedBookings);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

app.use((error, request, response, next) => {
  console.error(error);

  if (error.message.includes("not allowed to access")) {
    return response.status(403).json({
      message: error.message,
    });
  }

  response.status(500).json({
    message: "An unexpected server error occurred.",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Book_A_Taxi API listening on port ${PORT}`);
});