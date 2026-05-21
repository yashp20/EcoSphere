import { useState, useEffect } from "react";
import axios from "axios";

export default function ProviderList({ zip }) {
  const [providers, setProviders] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProviders() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/providers`, {
          params: { zip },
        });
        setProviders(res.data.providers || []);
      } catch (err) {
        console.error("Provider lookup failed:", err);
      } finally {
        setLoading(false);
      }
    }
    if (zip) loadProviders();
  }, [zip]);

  if (loading) return (
    <div className="flex justify-center py-10">
      <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!providers || providers.length === 0) {
    return (
      <p className="text-center text-green-700">
        No providers found for this ZIP code.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {providers.map((p, idx) => (
        <div
          key={idx}
          className="bg-white/80 p-6 rounded-2xl shadow-lg border border-emerald-100 cursor-pointer transition hover:shadow-xl hover:border-emerald-200"
          onClick={() => setExpanded(expanded === idx ? null : idx)}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-green-900">
              {p.name || "Unnamed Provider"}
            </h3>
            <span className="text-green-600 text-2xl">
              {expanded === idx ? "−" : "+"}
            </span>
          </div>

          {/* SUBTITLE */}
          <p className="text-green-700 text-sm mt-1">
            {p.address || "Address unavailable"}
          </p>

          {/* EXPANDED CONTENT */}
          {expanded === idx && (
            <div className="mt-4 text-green-800 space-y-2">

              {p.phone && (
                <p>
                  <strong>Phone:</strong> {p.phone}
                </p>
              )}

              {p.website && (
                <p>
                  <strong>Website:</strong>{" "}
                  <a href={p.website} target="_blank" className="text-green-700 underline">
                    {p.website}
                  </a>
                </p>
              )}

              <p>
                <strong>Distance:</strong> {p.distance_miles} miles away
              </p>

              {/* Opening Hours */}
              {p.opening_hours?.length > 0 && (
                <div>
                  <strong>Hours:</strong>
                  <ul className="ml-4 list-disc">
                    {p.opening_hours.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
