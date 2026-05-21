import { useApi } from "../api/client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const api = useApi();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!api) return;
    async function loadUser() {
      try {
        const res = await api.get("/api/user");
        console.log("User from backend:", res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load user data.");
      }
    }
    loadUser();
  }, [api]);

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-1/3 w-[400px] h-[400px] bg-emerald-100/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-1/3 w-[300px] h-[300px] bg-teal-100/15 rounded-full blur-[100px]" />
      </div>
      <div className="w-full max-w-md p-8 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 shadow-lg shadow-emerald-100/10">
        <div className="h-4 bg-emerald-100/50 rounded w-1/2 mb-3 animate-pulse" />
        <div className="h-3 bg-emerald-100/40 rounded w-3/4 animate-pulse" />
        <p className="mt-6 text-sm text-gray-400">Dashboard coming soon.</p>
      </div>
    </div>
  );
}
