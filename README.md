# Book_A_Taxi

A responsive taxi ride booking starter application created with **React**, **Vite**, **Tailwind CSS**, **React Router**, **Axios**, and a small **Express** backend.

This project was developed for a classroom assignment demonstrating how Generative AI can accelerate frontend development, page generation, navigation, form validation, API integration, and deployment preparation.

## Live Project

- **Frontend:** `https://YOUR-VERCEL-PROJECT.vercel.app`
- **Backend API:** `https://YOUR-RENDER-SERVICE.onrender.com`
- **Health Check:** `https://YOUR-RENDER-SERVICE.onrender.com/api/health`

Replace the placeholders above after deployment.

## Assignment Requirements Completed

- Structured Vite/React frontend folder hierarchy
- Responsive homepage generated with reusable React components
- About Us, Services, Contact, Booking, and Not Found pages
- Navigation among all pages using React Router
- Dedicated ride booking page linked throughout the website
- Basic client-side form validation
- Server-side validation for submitted bookings
- Axios connection between the frontend and backend
- Vercel-ready frontend configuration
- Render-ready Express backend configuration

## Technology Stack

| Area | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| HTTP requests | Axios |
| Backend | Node.js + Express |
| Demo storage | JSON file |
| Frontend hosting | Vercel |
| Backend hosting | Render |
| Source control | GitHub |

## Main Features

### Pages

- **Home:** Hero section, service highlights, and booking calls to action
- **About Us:** Company mission, values, and service focus
- **Services:** Standard, Airport, Premium, and Shared ride options
- **Contact:** Support and office information
- **Book a Ride:** Validated taxi booking form
- **Not Found:** Friendly fallback page for invalid routes

### Booking Validation

The booking form checks that:

- Full name is entered
- Phone number contains a valid number of digits
- Pickup and drop-off locations are entered
- Pickup and drop-off locations are different
- A supported service is selected
- Pickup date and time are entered
- Pickup date and time are in the future

The Express backend repeats these checks so invalid requests cannot bypass browser validation.

## Project Structure

```text
book-a-taxi/
├── backend/
│   ├── data/
│   │   └── bookings.json
│   ├── package.json
│   └── server.js
├── src/
│   ├── components/
│   │   ├── Container.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── ServiceCard.jsx
│   ├── lib/
│   │   └── api.js
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── BookRide.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   └── Services.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── package.json
├── vercel.json
└── vite.config.js
```

## Local Installation

### Prerequisites

Install:

- Node.js 20 or newer
- npm
- Git

Verify:

```bash
node --version
npm --version
git --version
```

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/book-a-taxi.git
cd book-a-taxi
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
cd ..
```

### 4. Configure the local frontend API URL

Create `.env.development` in the repository root:

```env
VITE_API_URL=http://localhost:3001
```

### 5. Start the backend

Open the first terminal:

```bash
cd backend
npm run dev
```

The API should start on:

```text
http://localhost:3001
```

Test the health endpoint:

```text
http://localhost:3001/api/health
```

### 6. Start the frontend

Open a second terminal from the repository root:

```bash
npm run dev
```

Open the local Vite URL shown in the terminal, normally:

```text
http://localhost:5173
```

## Confirm a Local Booking

1. Open the Book a Ride page.
2. Enter valid information and choose a future pickup time.
3. Submit the form.
4. Confirm a success message and booking ID appear.
5. Open:

```text
http://localhost:3001/api/bookings
```

The submitted booking should be included in the JSON response and in:

```text
backend/data/bookings.json
```

## Production Build Test

Before deployment, run:

```bash
npm run build
npm run preview
```

The Vite production output is generated in `dist/`.

## Push to GitHub

Create an empty GitHub repository, then run from the project root:

```bash
git init
git add .
git commit -m "Create Book_A_Taxi application"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/book-a-taxi.git
git push -u origin main
```

For later updates:

```bash
git add .
git commit -m "Describe the update"
git push
```

## Deploy the Backend to Render

Deploy the backend first so its URL can be added to Vercel.

1. Sign in to Render.
2. Select **New > Web Service**.
3. Connect the GitHub repository.
4. Configure:

| Setting | Value |
|---|---|
| Runtime | Node |
| Branch | `main` |
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Health Check Path | `/api/health` |

5. Add the environment variable:

```text
CLIENT_URL=http://localhost:5173
```

6. Create the service.
7. Copy the generated Render URL, for example:

```text
https://book-a-taxi-api.onrender.com
```

8. Verify:

```text
https://book-a-taxi-api.onrender.com/api/health
```

The server uses `process.env.PORT` and binds to `0.0.0.0`, which allows it to run correctly on Render.

## Deploy the Frontend to Vercel

1. Sign in to Vercel.
2. Select **Add New > Project**.
3. Import the GitHub repository.
4. Configure:

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Root Directory | `./` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

5. Add the environment variable:

```text
VITE_API_URL=https://YOUR-RENDER-SERVICE.onrender.com
```

6. Deploy the project.
7. Copy the assigned Vercel URL.

The included `vercel.json` rewrites nested React Router URLs to `index.html`, preventing 404 errors when refreshing routes such as `/services` or `/book`.

## Complete the CORS Configuration

After Vercel provides the live frontend URL, update the Render environment variable:

```text
CLIENT_URL=https://YOUR-VERCEL-PROJECT.vercel.app,http://localhost:5173
```

Save the change and allow Render to redeploy.

## Confirm a Deployed Booking

1. Open the Vercel website.
2. Submit a valid booking.
3. Open browser developer tools and select **Network**.
4. Confirm the request shows:

```text
POST https://YOUR-RENDER-SERVICE.onrender.com/api/bookings
Status: 201 Created
```

5. Open:

```text
https://YOUR-RENDER-SERVICE.onrender.com/api/bookings
```

6. Confirm the returned record contains the same booking ID shown by the frontend.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | API information |
| GET | `/api/health` | Service health check |
| GET | `/api/bookings` | Return all bookings |
| GET | `/api/bookings/:id` | Return one booking |
| POST | `/api/bookings` | Validate and create a booking |
| DELETE | `/api/bookings/:id` | Delete one booking |

## Environment Variables

### Frontend

```env
VITE_API_URL=http://localhost:3001
```

For Vercel, replace the value with the Render URL.

### Backend

```env
CLIENT_URL=http://localhost:5173
```

For Render, include the Vercel URL and optional local development URL as a comma-separated list.

## Generative AI Use

Generative AI assisted with:

- Initial React/Vite folder structure
- Page and component generation
- Tailwind CSS layouts
- React Router navigation
- Form validation logic
- Axios integration
- Express API setup
- Vercel and Render deployment configuration
- Project documentation

All generated code was reviewed, adapted, and tested as part of the final implementation.

## Current Scope and Limitations

This is a classroom starter project. It does not include:

- User accounts or authentication
- Driver accounts or assignment
- Payment processing
- Live maps or GPS tracking
- Real-time ride status
- Fare calculation

The Render demonstration currently uses a JSON file. Render's default service filesystem is not guaranteed to preserve file changes across every restart or redeployment. A production version should use a persistent database such as PostgreSQL.

## Suggested Evaluation Evidence

- GitHub repository folder structure
- Homepage and navigation screenshots
- Services, About, and Contact pages
- Booking form with validation errors
- Successful booking with booking ID
- Browser Network panel showing HTTP 201
- Render `/api/bookings` response
- Vercel live deployment
- Render health endpoint

## License

This project was created for educational purposes.
