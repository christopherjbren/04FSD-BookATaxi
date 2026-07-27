import { Link } from "react-router-dom";
import Container from "../components/Container";
import ServiceCard from "../components/ServiceCard";

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-b from-white to-slate-50">
        <Container className="py-14">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                Fast • Reliable • Affordable
              </p>
              <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
                Book your taxi ride in minutes with <span className="text-slate-900">Book_A_Taxi</span>.
              </h1>
              <p className="mt-4 text-slate-600">
                Choose a service, enter pickup and drop-off details, and confirm your ride.
                This starter app demonstrates navigation, pages, and a validated booking form.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/book"
                  className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Book a Ride
                </Link>
                <Link
                  to="/services"
                  className="rounded-xl border px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-white"
                >
                  View Services
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-white border p-4">
                  <div className="text-xl font-bold">24/7</div>
                  <div className="text-xs text-slate-500">Support</div>
                </div>
                <div className="rounded-2xl bg-white border p-4">
                  <div className="text-xl font-bold">5–10</div>
                  <div className="text-xs text-slate-500">Min pickup*</div>
                </div>
                <div className="rounded-2xl bg-white border p-4">
                  <div className="text-xl font-bold">Safe</div>
                  <div className="text-xs text-slate-500">Drivers</div>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-400">*Demo copy for starter UI.</p>
            </div>

            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Popular services</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <ServiceCard
                  title="Standard"
                  badge="Everyday"
                  description="Affordable rides for daily commutes and errands."
                />
                <ServiceCard
                  title="Airport"
                  badge="On-time"
                  description="Scheduled pickups and drop-offs for flights."
                />
                <ServiceCard
                  title="Premium"
                  badge="Comfort"
                  description="More space, smoother ride experience."
                />
                <ServiceCard
                  title="Shared"
                  badge="Save"
                  description="Split the fare with others heading your way."
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}