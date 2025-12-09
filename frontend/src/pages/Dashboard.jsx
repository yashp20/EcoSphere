import { useApi } from "../api/client";
import { useEffect } from "react";

export default function Dashboard() {
  const api = useApi();

  useEffect(() => {
    if (!api) return;   // Wait for token

    async function loadUser() {
      const res = await api.get("/api/user");
      console.log("User from backend:", res.data);
    }

    loadUser();
  }, [api]);

  return (
    <div className="text-white">
      Dashboard loading…
    </div>
  );
}
