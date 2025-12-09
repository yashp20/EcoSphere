import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ResultsPage from "./pages/ResultsPage";
import AssessmentPage from "./pages/AssessmentPage"; // ✅ NEW
import AboutPage from "./pages/AboutPage";


export default function App() {
  return (
    <BrowserRouter>
      {/* IF NOT SIGNED IN */}
      <SignedOut>
        <Routes>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
        </Routes>
      </SignedOut>

      {/* IF SIGNED IN */}
      <SignedIn>
        <div className="relative min-h-screen overflow-hidden">
          
          {/* Background */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-30 animate-pulse" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-emerald-400 rounded-full blur-3xl opacity-30 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse" />
          </div>

          <Navbar />

          <Routes>
            {/* 🏡 Home Page */}
            <Route path="/" element={<HomePage />} />

            {/* 🧮 NEW Assessment Page */}
            <Route path="/assessment" element={<AssessmentPage />} /> {/* ✅ NEW */}
            <Route path="/about" element={<AboutPage />} />


            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/results" element={<ResultsPage />} />

            {/* fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </SignedIn>
    </BrowserRouter>
  );
}
