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

  if (error) return <div className="text-red-500 p-6">{error}</div>;
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-lg">
        <div className="h-4 bg-emerald-100 rounded w-1/2 mb-3 animate-pulse" />
        <div className="h-3 bg-emerald-100 rounded w-3/4 animate-pulse" />
      </div>
    </div>
  );
}
