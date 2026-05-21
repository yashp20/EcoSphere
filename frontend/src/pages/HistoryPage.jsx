import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../api/client";

export default function HistoryPage() {
  const api = useApi();
  const navigate = useNavigate();

  const [tab, setTab] = useState("assessments");
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!api) return;
    async function load() {
      try {
        setLoading(true);
        const [h, f] = await Promise.all([
          api.get("/api/history"),
          api.get("/api/favorites"),
        ]);
        setHistory(h.data.history || []);
        setFavorites(f.data.favorites || []);
      } catch (err) {
        console.error(err);
        setError("Couldn't load your saved data. Make sure the database is configured.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [api]);

  function openAssessment(item) {
    navigate("/results", {
      state: { ...item.result_json, zip: item.zip },
    });
  }

  async function deleteAssessment(id) {
    try {
      await api.delete(`/api/history/${id}`);
      setHistory((prev) => prev.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  async function removeFavorite(id) {
    try {
      await api.delete(`/api/favorites/${id}`);
      setFavorites((prev) => prev.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  const fmtDate = (ts) =>
    new Date(ts).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "numeric", minute: "2-digit",
    });

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50" />
        <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-emerald-200/25 rounded-full blur-[130px]" />
        <div className="absolute bottom-20 right-1/4 w-[350px] h-[350px] bg-teal-200/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Your Activity</h1>
          <p className="text-gray-500 mt-1">Revisit past solar analyses and your saved providers.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <TabButton active={tab === "assessments"} onClick={() => setTab("assessments")}>
            Past Assessments ({history.length})
          </TabButton>
          <TabButton active={tab === "favorites"} onClick={() => setTab("favorites")}>
            Favorite Providers ({favorites.length})
          </TabButton>
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-7 h-7 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && !loading && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Assessments */}
        {!loading && !error && tab === "assessments" && (
          <div className="space-y-3">
            {history.length === 0 ? (
              <EmptyState
                text="No assessments yet."
                cta="Run your first assessment"
                onClick={() => navigate("/assessment")}
              />
            ) : (
              history.map((item) => {
                const sys = item.result_json?.rankings?.solar || {};
                return (
                  <div
                    key={item.id}
                    className="bg-white/75 backdrop-blur-xl rounded-2xl border border-white/60 shadow-sm p-5
                               flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm font-bold text-gray-900">ZIP {item.zip}</span>
                        <span className="text-xs text-gray-400">{fmtDate(item.created_at)}</span>
                      </div>
                      <div className="flex gap-4 mt-1 text-xs text-gray-500 flex-wrap">
                        <span>{sys.solar_kw} kW system</span>
                        <span>{item.monthly_kwh} kWh/mo</span>
                        <span>{sys.payback_years} yr payback</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => openAssessment(item)}
                        className="px-4 py-2 text-xs font-semibold text-white rounded-lg
                                   bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-md transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => deleteAssessment(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                        aria-label="Delete"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Favorites */}
        {!loading && !error && tab === "favorites" && (
          <div className="space-y-3">
            {favorites.length === 0 ? (
              <EmptyState
                text="No favorite providers yet."
                cta="Browse providers in your results"
                onClick={() => navigate("/assessment")}
              />
            ) : (
              favorites.map((f) => (
                <div
                  key={f.id}
                  className="bg-white/75 backdrop-blur-xl rounded-2xl border border-white/60 shadow-sm p-5
                             flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-gray-900 truncate">{f.name}</h3>
                      {f.rating && (
                        <span className="text-xs text-amber-600 font-medium">★ {f.rating}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">{f.address}</p>
                    <div className="flex gap-4 mt-1 text-xs text-gray-500 flex-wrap">
                      {f.phone && <span>{f.phone}</span>}
                      {f.website && (
                        <a
                          href={f.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:underline"
                        >
                          Website
                        </a>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFavorite(f.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition flex-shrink-0"
                    aria-label="Remove favorite"
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
        ${active
          ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm"
          : "bg-white/70 backdrop-blur-sm text-gray-600 border border-white/60 hover:text-emerald-700"
        }`}
    >
      {children}
    </button>
  );
}

function EmptyState({ text, cta, onClick }) {
  return (
    <div className="text-center py-16 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/60">
      <p className="text-gray-500 mb-4">{text}</p>
      <button
        onClick={onClick}
        className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl
                   bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-md transition"
      >
        {cta}
      </button>
    </div>
  );
}

function TrashIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  );
}
