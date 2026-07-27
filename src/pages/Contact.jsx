import Container from "../components/Container";

export default function Contact() {
  return (
    <Container className="py-12">
      <h1 className="text-2xl font-bold">Contact</h1>
      <p className="mt-2 text-slate-600 max-w-3xl">
        This is a starter UI. Replace the details below with real contact info.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Support</h2>
          <p className="mt-2 text-sm text-slate-600">
            Email: support@bookataxi.example<br />
            Phone: (555) 123-4567<br />
            Hours: 24/7
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Office</h2>
          <p className="mt-2 text-sm text-slate-600">
            100 Main Street<br />
            Your City, ST 00000<br />
            United States
          </p>
        </div>
      </div>
    </Container>
  );
}