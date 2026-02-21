import { Link, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  const { pathname } = useLocation();
  const link = (to, label) => (
    <li>
      <Link
        to={to}
        className={`relative px-1 py-0.5 transition font-medium
          after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full
          after:origin-left after:scale-x-0 after:bg-green-500 after:transition-transform
          hover:after:scale-x-100
          ${pathname === to ? "text-green-600 after:scale-x-100" : "text-green-900"}`}
      >
        {label}
      </Link>
    </li>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center
                    px-8 py-4 bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/40">
      <Link to="/" className="text-2xl font-bold text-green-700 tracking-tight">
        Eco<span className="text-emerald-500">Sphere</span>
      </Link>

      <ul className="flex items-center gap-8 text-sm">
        {link("/", "Home")}
        {link("/assessment", "Assessment")}
        {link("/about", "About")}
        <li><UserButton /></li>
      </ul>
    </nav>
  );
}
