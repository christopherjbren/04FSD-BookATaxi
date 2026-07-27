import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <Container className="py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-sm text-slate-600">
          © {new Date().getFullYear()} Book_A_Taxi. All rights reserved.
        </p>
        <p className="text-xs text-slate-500">
          Front-end starter • Vite + React + Tailwind
        </p>
      </Container>
    </footer>
  );
}