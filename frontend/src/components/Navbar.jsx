import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/assessment", label: "Assessment" },
    { to: "/history", label: "History" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-200">
            <span className="text-white text-sm font-bold">E</span>
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent tracking-tight">
            EcoSphere
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
                  ${pathname === to
                    ? "bg-emerald-100/80 text-emerald-700 shadow-sm"
                    : "text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/60"
                  }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="ml-4">
            <UserButton />
          </li>
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl hover:bg-emerald-50 transition"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white/80 backdrop-blur-xl border-t border-emerald-100/50 px-6 pb-4 pt-2">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`block py-3 text-sm font-medium border-b border-emerald-50 transition
                ${pathname === to ? "text-emerald-700" : "text-gray-600"}`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-3">
            <UserButton />
          </div>
        </div>
      )}
    </nav>
  );
}
