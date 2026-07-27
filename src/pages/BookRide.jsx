import { useMemo, useState } from "react";
import Container from "../components/Container";
// Optional: if you enable JSON Server / backend, you can use the api client below.
import api from "../lib/api";

const SERVICE_OPTIONS = ["Standard", "Airport", "Premium", "Shared"];

function isValidPhone(value) {
  // Simple US-friendly validation: digits only length 10–15
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function validate(values) {
  const errors = {};

  if (!values.fullName.trim()) errors.fullName = "Full name is required.";
  if (!values.phone.trim()) errors.phone = "Phone is required.";
  else if (!isValidPhone(values.phone)) errors.phone = "Enter a valid phone number.";

  if (!values.pickup.trim()) errors.pickup = "Pickup location is required.";
  if (!values.dropoff.trim()) errors.dropoff = "Drop-off location is required.";
  if (values.pickup.trim() && values.dropoff.trim() && values.pickup.trim() === values.dropoff.trim()) {
    errors.dropoff = "Drop-off must be different from pickup.";
  }

  if (!values.service) errors.service = "Please choose a service type.";

  if (!values.date) errors.date = "Pickup date is required.";
  if (!values.time) errors.time = "Pickup time is required.";

  // Basic future-time check (same-day)
  if (values.date && values.time) {
    const dt = new Date(`${values.date}T${values.time}`);
    if (Number.isNaN(dt.getTime())) {
      errors.time = "Invalid date/time.";
    } else if (dt.getTime() < Date.now() - 60_000) {
      errors.time = "Pickup time must be in the future.";
    }
  }

  return errors;
}

export default function BookRide() {
  const [values, setValues] = useState({
    fullName: "",
    phone: "",
    pickup: "",
    dropoff: "",
    service: "Standard",
    date: "",
    time: "",
    notes: "",
  });

  const [touched, setTouched] = useState({});
  const [submitState, setSubmitState] = useState({ status: "idle", message: "" });

  const errors = useMemo(() => validate(values), [values]);
  const hasErrors = Object.keys(errors).length > 0;

  function setField(name, value) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  function markTouched(name) {
    setTouched((t) => ({ ...t, [name]: true }));
  }

  async function onSubmit(event) {
    event.preventDefault();

    setTouched({
      fullName: true,
      phone: true,
      pickup: true,
      dropoff: true,
      service: true,
      date: true,
      time: true,
      notes: true,
    });

    if (hasErrors) {
      setSubmitState({ status: "error", message: "Please fix the highlighted fields and try again." });
      return;
    }

    try {
      setSubmitState({ 
        status: "submitting", 
        message: "Submitting your ride request..." 
      });

      // OPTIONAL: send to backend/json-server
      const response = await api.post("/api/bookings", values);

      setSubmitState({ 
        status: "success", 
        // message: "Ride booked! (Demo) Your request was validated successfully." });
        message: `Ride request submitted successfully. Booking ID: ${response.data.booking.id}`,
      });
 
      setValues({
        fullName: "",
        phone: "",
        pickup: "",
        dropoff: "",
        service: "Standard",
        date: "",
        time: "",
        notes: "",
      });

      setTouched({});
    //} catch (err) {
    //  setSubmitState({
    //    status: "error",
    //    message: "Could not submit booking (demo). If using a backend, check your API URL.",
    //  });
    //}
    } catch (error){
      console.error("Booking submission failed:", error);
      
      const serverMessage =
      error.response?.data?.message ||
      "Could not submit the booking. Please try again.";
       
      setSubmitState({
        status: "error",
        message: serverMessage,
      });      
    }
  }

  const fieldClass = (name) => {
    const showError = touched[name] && errors[name];
    return `w-full rounded-xl border px-3 py-2 text-sm outline-none transition
      ${showError ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-slate-200 focus:ring-2 focus:ring-slate-200"}
      bg-white`;
  };

  const ErrorText = ({ name }) =>
    touched[name] && errors[name] ? (
      <p className="mt-1 text-xs text-red-600">{errors[name]}</p>
    ) : null;

  return (
    <Container className="py-12">
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold">Book a Ride</h1>
        <p className="mt-2 text-slate-600">
          Fill out the form below to request a taxi ride. Basic validation is included for an improved UX.
        </p>

        <form onSubmit={onSubmit} className="mt-8 rounded-3xl border bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                className={fieldClass("fullName")}
                value={values.fullName}
                onChange={(e) => setField("fullName", e.target.value)}
                onBlur={() => markTouched("fullName")}
                placeholder="Jane Doe"
              />
              <ErrorText name="fullName" />
            </div>

            <div>
              <label className="text-sm font-medium">Phone</label>
              <input
                className={fieldClass("phone")}
                value={values.phone}
                onChange={(e) => setField("phone", e.target.value)}
                onBlur={() => markTouched("phone")}
                placeholder="(555) 123-4567"
              />
              <ErrorText name="phone" />
            </div>

            <div>
              <label className="text-sm font-medium">Pickup Location</label>
              <input
                className={fieldClass("pickup")}
                value={values.pickup}
                onChange={(e) => setField("pickup", e.target.value)}
                onBlur={() => markTouched("pickup")}
                placeholder="123 Main St"
              />
              <ErrorText name="pickup" />
            </div>

            <div>
              <label className="text-sm font-medium">Drop-off Location</label>
              <input
                className={fieldClass("dropoff")}
                value={values.dropoff}
                onChange={(e) => setField("dropoff", e.target.value)}
                onBlur={() => markTouched("dropoff")}
                placeholder="Airport Terminal 1"
              />
              <ErrorText name="dropoff" />
            </div>

            <div>
              <label className="text-sm font-medium">Service Type</label>
              <select
                className={fieldClass("service")}
                value={values.service}
                onChange={(e) => setField("service", e.target.value)}
                onBlur={() => markTouched("service")}
              >
                {SERVICE_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ErrorText name="service" />
            </div>

            <div>
              <label className="text-sm font-medium">Pickup Date</label>
              <input
                type="date"
                className={fieldClass("date")}
                value={values.date}
                onChange={(e) => setField("date", e.target.value)}
                onBlur={() => markTouched("date")}
              />
              <ErrorText name="date" />
            </div>

            <div>
              <label className="text-sm font-medium">Pickup Time</label>
              <input
                type="time"
                className={fieldClass("time")}
                value={values.time}
                onChange={(e) => setField("time", e.target.value)}
                onBlur={() => markTouched("time")}
              />
              <ErrorText name="time" />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-medium">Notes (optional)</label>
              <textarea
                className={fieldClass("notes")}
                value={values.notes}
                onChange={(e) => setField("notes", e.target.value)}
                onBlur={() => markTouched("notes")}
                placeholder="Gate code, luggage details, accessibility needs…"
                rows={4}
              />
            </div>
          </div>

          {submitState.status !== "idle" ? (
            <div
              className={`mt-5 rounded-2xl p-4 text-sm ${
                submitState.status === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : submitState.status === "submitting"
                  ? "bg-slate-50 text-slate-700 border border-slate-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {submitState.message || (submitState.status === "submitting" ? "Submitting…" : "")}
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
              disabled={submitState.status === "submitting"}
            >
              Confirm Booking
            </button>

            <p className="text-xs text-slate-500">
              Validation checks required fields, phone format, different pickup/drop-off, and future time.
            </p>
          </div>
        </form>
      </div>
    </Container>
  );
}