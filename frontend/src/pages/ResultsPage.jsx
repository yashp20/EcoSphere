import { useLocation, useNavigate } from "react-router-dom";
import Charts from "../components/results/Charts";
import ProviderList from "../components/results/ProviderList";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if (!data || !data.best_option) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-green-900">
        <h1 className="text-3xl font-bold mb-4">No data found</h1>
        <p className="mb-6">Please restart the energy assessment.</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700"
        >
          Go Home
        </button>
      </div>
    );
  }

  // 🚨 Force solar only
  const system = data.rankings["solar"];

  return (
    <div className="relative min-h-screen overflow-hidden pt-28 px-4">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 left-20 w-80 h-80 bg-green-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-emerald-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-[28rem] h-[28rem] bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* PAGE TITLE */}
        <h1 className="text-4xl font-extrabold text-center text-green-900 mb-10 animate-fadeIn">
          Your Solar Energy Analysis
        </h1>

        {/* SUMMARY BOX */}
        <div className="bg-white/60 backdrop-blur-xl shadow-xl rounded-3xl p-10 border border-white/40 mb-12">
          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Rooftop Solar Recommendation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
            <Info
              label="Recommended Solar Size"
              value={`${system.solar_kw} kW`}
            />
            <Info
              label="Annual Output"
              value={`${Math.round(
                system.annual_output_kwh
              ).toLocaleString()} kWh`}
            />

            <Info
              label="Total System Cost"
              value={`$${system.system_cost.toLocaleString()}`}
            />
            <Info
              label="Battery Cost"
              value={`$${system.battery_cost.toLocaleString()}`}
            />

            <Info
              label="ITC Savings"
              value={`$${system.itc_savings.toLocaleString()}`}
            />
            <Info
              label="Payback Period"
              value={`${system.payback_years} years`}
            />

            <Info label="GHI (Irradiance)" value={`${system.ghi} kWh/m²/day`} />
            <Info
              label="DNI (Direct Irradiance)"
              value={`${system.dni} kWh/m²/day`}
            />

            <Info
              label="Carbon Intensity"
              value={`${system.carbon_intensity} gCO₂/kWh`}
            />
          </div>
        </div>

        {/* 📊 SOLAR-ONLY CHARTS */}
        <div className="mt-16 bg-white/60 backdrop-blur-xl p-10 rounded-3xl border border-white/40 shadow-xl">
          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Solar Performance Charts
          </h2>
          <Charts data={system} />
        </div>

        {/* LOCAL SOLAR PROVIDERS */}
        <div className="mt-16 bg-white/70 backdrop-blur-xl p-10 rounded-3xl border border-white/40 shadow-xl">
          <h2 className="text-3xl font-extrabold text-green-900 mb-6 text-center">
            Local Solar Providers in Your Area
          </h2>

          <ProviderList zip={location.state.zip} />
        </div>

        {/* 🔁 RESTART BUTTON */}
        <div className="text-center mt-16 mb-20">
          <button
            onClick={() => navigate("/assessment")}
            className="px-7 py-3 bg-green-700 text-white rounded-xl shadow-md 
                       hover:bg-green-800 transition"
          >
            Re-Enter Information
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex flex-col p-4 bg-white/70 rounded-xl shadow">
      <span className="text-sm text-green-700 font-semibold">{label}</span>
      <span className="text-xl font-bold text-green-900">{value}</span>
    </div>
  );
}
