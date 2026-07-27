import { NavLink } from "react-router-dom";
import Container from "./Container";

const linkBase =
  "px-3 py-2 rounded-lg text-sm font-medium transition-colors";
const linkInactive = "text-slate-700 hover:bg-slate-100 hover:text-slate-900";
const linkActive = "bg-slate-900 text-white";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <Container className="flex items-center justify-between py-3">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-slate-900 text-white grid place-items-center font-bold">
            B
          </div>
          <div className="leading-tight">
            <div className="font-semibold">Book_A_Taxi</div>
            <div className="text-xs text-slate-500">Ride booking</div>
          </div>
        </NavLink>

        <nav className="flex items-center gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/book"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Book a Ride
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Contact
          </NavLink>
        </nav>
      </Container>
    </header>
  );
}