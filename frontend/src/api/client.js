// frontend/src/api/client.js
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { useMemo } from "react";

export function useApi() {
  const { getToken } = useAuth();

  // Create axios instance with a request interceptor that always fetches a fresh token
  const client = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });

    instance.interceptors.request.use(async (config) => {
      const token = await getToken();   // ✅ fresh token on every request
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    return instance;
  }, [getToken]);

  return client;
}

export default useApi;
