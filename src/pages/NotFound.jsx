import { Link } from "react-router-dom";
import Container from "../components/Container";

export default function NotFound() {
  return (
    <Container className="py-16">
      <div className="rounded-3xl border bg-white p-8 shadow-sm max-w-xl">
        <h1 className="text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-slate-600">
          The page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Go Home
        </Link>
      </div>
    </Container>
  );
}