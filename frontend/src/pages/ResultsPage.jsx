import { useLocation, useNavigate } from "react-router-dom";
import Charts from "../components/results/Charts";
import ProviderList from "../components/results/ProviderList";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data || !data.best_option) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">No data found</h1>
        <p className="text-gray-500 mb-6">Please complete the energy assessment first.</p>
        <button onClick={() => navigate("/")}
          className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all">
          Go Home
        </button>
      </div>
    );
  }

  const system = data.rankings?.[data.best_option] || data.rankings?.solar;

  if (!system) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">No results available</h1>
        <p className="text-gray-500 mb-6">Please complete the energy assessment first.</p>
        <button onClick={() => navigate("/assessment")}
          className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all">
          Restart Assessment
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6 overflow-hidden">
      {/* Background aura */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-teal-200/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-cyan-100/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-emerald-200/50 text-emerald-700 text-xs font-semibold uppercase tracking-wide mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Your Results
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Solar Energy Analysis
          </h1>
          <p className="text-gray-500 mt-2">
            Based on your home in ZIP code {data.zip || "—"}
          </p>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-fadeInUp">
          <MetricCard label="System Size" value={`${system.solar_kw} kW`} />
          <MetricCard label="Annual Output" value={`${Math.round(system.annual_output_kwh).toLocaleString()} kWh`} />
          <MetricCard label="Payback Period" value={`${system.payback_years} yrs`} accent />
          <MetricCard label="CO₂ Saved/Year" value={`${system.co2_savings_tons_per_year} tons`} />
        </div>

        {/* Financial summary */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg shadow-emerald-100/10 p-8 mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Financial Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FinanceRow label="Total System Cost" value={`$${system.system_cost.toLocaleString()}`} />
            <FinanceRow label="Battery Cost" value={`$${system.battery_cost.toLocaleString()}`} />
            <FinanceRow label="Federal ITC Savings" value={`-$${system.itc_savings.toLocaleString()}`} positive />
            <FinanceRow label="Annual Savings" value={`$${system.annual_savings?.toLocaleString() || "—"}/yr`} positive />
            <FinanceRow label="GHI (Irradiance)" value={`${system.ghi} kWh/m²/day`} />
            <FinanceRow label="DNI (Direct)" value={`${system.dni} kWh/m²/day`} />
          </div>
        </div>

        {/* Charts */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg shadow-emerald-100/10 p-8 mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Performance Charts</h2>
          <Charts data={system} />
        </div>

        {/* Providers */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg shadow-emerald-100/10 p-8 mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Solar Providers in Your Area</h2>
          <p className="text-sm text-gray-500 mb-6">Companies that serve your region and can quote your recommended system.</p>
          <ProviderList zip={data.zip} />
        </div>

        {/* Restart */}
        <div className="text-center pt-4">
          <button onClick={() => navigate("/assessment")}
            className="px-6 py-2.5 text-sm font-medium text-gray-500 bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-xl
                       hover:bg-white hover:border-emerald-200 hover:text-emerald-700 transition-all">
            Run Another Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, accent }) {
  return (
    <div className={`p-5 rounded-2xl backdrop-blur-sm border transition-all hover:shadow-md
      ${accent
        ? "bg-gradient-to-br from-emerald-50/80 to-teal-50/80 border-emerald-200/50 hover:shadow-emerald-100/30"
        : "bg-white/60 border-white/50 hover:shadow-emerald-100/20"}`}>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-2xl font-bold ${accent ? "bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent" : "text-gray-900"}`}>
        {value}
      </p>
    </div>
  );
}

function FinanceRow({ label, value, positive }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">{label}</span>
      <span className={`text-lg font-bold ${positive ? "text-emerald-600" : "text-gray-900"}`}>{value}</span>
    </div>
  );
}
