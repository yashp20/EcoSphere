// frontend/src/api/client.js
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useMemo, useState } from "react";

export function useApi() {
  const { getToken } = useAuth();
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function load() {
      const t = await getToken();
      console.log("🔐 Clerk token:", t);
      setToken(t);
    }
    load();
  }, [getToken]);

  // ❗ useMemo returns a REAL axios instance (not a Promise)
  const client = useMemo(() => {
    if (!token) return null;

    return axios.create({
      baseURL: "http://localhost:8000",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [token]);

  return client;
}

export default useApi;
