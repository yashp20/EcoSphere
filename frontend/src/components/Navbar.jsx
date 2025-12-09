import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-white/70 backdrop-blur-xl shadow">
      <div className="text-2xl font-bold text-green-700">
        EcoSphere
      </div>

      <ul className="flex items-center gap-8 text-green-900 font-medium">

        {/* ✅ Make Home clickable */}
        <li>
          <Link 
            to="/" 
            className="hover:text-green-600 transition"
          >
            Home
          </Link>
        </li>

        {/* About */}
        <li>
          <Link 
            to="/about" 
            className="hover:text-green-600 transition"
          >
            About
          </Link>
        </li>

        {/* Contact */}
        <li>
          <Link 
            to="/contact" 
            className="hover:text-green-600 transition"
          >
            Contact
          </Link>
        </li>

        {/* Profile */}
        <li>
          <UserButton />
        </li>

      </ul>
    </nav>
  );
}
