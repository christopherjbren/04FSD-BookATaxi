import Container from "../components/Container";
import ServiceCard from "../components/ServiceCard";
import { Link } from "react-router-dom";

export default function Services() {
  const services = [
    { title: "Standard", badge: "Everyday", description: "Affordable rides for daily travel." },
    { title: "Airport", badge: "Scheduled", description: "Plan ahead with flight-friendly pickup times." },
    { title: "Premium", badge: "Comfort", description: "Extra comfort for business or special occasions." },
    { title: "Shared", badge: "Budget", description: "Share the ride and save on fare." },
  ];

  return (
    <Container className="py-12">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="mt-2 text-slate-600">
            Choose a service type that fits your trip.
          </p>
        </div>
        <Link
          to="/book"
          className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Book Now
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <ServiceCard key={s.title} {...s} />
        ))}
      </div>
    </Container>
  );
}