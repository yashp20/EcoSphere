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

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!providers || providers.length === 0) {
    return <p className="text-center text-gray-500 py-6">No solar providers found for this area.</p>;
  }

  return (
    <div className="space-y-3">
      {providers.map((p, idx) => (
        <div
          key={idx}
          className="rounded-2xl border border-white/60 bg-white/40 backdrop-blur-sm hover:bg-white/70 hover:shadow-md hover:shadow-emerald-100/20 transition-all cursor-pointer"
          onClick={() => setExpanded(expanded === idx ? null : idx)}
        >
          <div className="flex items-center justify-between p-5">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-semibold text-gray-900 truncate">{p.name || "Unnamed Provider"}</h3>
                {p.rating && (
                  <span className="flex items-center gap-1 text-xs text-amber-600 font-medium bg-amber-50/80 px-2 py-0.5 rounded-full border border-amber-100">
                    <svg className="w-3 h-3 fill-amber-500" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {p.rating}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-1 truncate">{p.address || "Address unavailable"}</p>
            </div>
            <svg className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ml-4 ${expanded === idx ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {expanded === idx && (
            <div className="px-5 pb-5 pt-0 border-t border-emerald-50/50 space-y-2">
              {p.phone && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Phone:</span> {p.phone}
                </p>
              )}
              {p.website && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Website:</span>{" "}
                  <a href={p.website} target="_blank" rel="noopener noreferrer"
                    className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">{p.website}</a>
                </p>
              )}
              {p.distance_miles != null && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Distance:</span> {p.distance_miles} miles
                </p>
              )}
              {p.opening_hours?.length > 0 && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Hours:</span>
                  <ul className="ml-4 mt-1 list-disc text-gray-500">
                    {p.opening_hours.map((line, i) => <li key={i}>{line}</li>)}
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
