import Container from "../components/Container";

export default function About() {
  return (
    <Container className="py-12">
      <h1 className="text-2xl font-bold">About Us</h1>
      <p className="mt-4 text-slate-600 max-w-3xl">
        Book_A_Taxi is committed to convenient, reliable ride booking. This project
        is a front-end starter demonstrating page structure, routing, and form validation
        for a taxi booking experience.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { title: "Mission", text: "Get riders where they need to go—safely and on time." },
          { title: "Values", text: "Safety, transparency, and great service." },
          { title: "Focus", text: "Simple UX with clear booking steps." },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="font-semibold">{c.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{c.text}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}