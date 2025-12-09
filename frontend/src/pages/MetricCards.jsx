export default function MetricCards({ option }) {

  // BLOCK UNAVAILABLE OPTIONS
  if (!option || option.available === false) {
    return (
      <div className="text-center py-10 text-green-800 font-semibold">
        ⚠ This option is not available yet.
        <p className="text-sm text-green-700 mt-2">{option?.reason}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card label="System Size" value={`${option.solar_kw} kW`} />
      <Card label="Annual Output" value={`${option.annual_output_kwh.toLocaleString()} kWh`} />
      <Card label="Total Cost" value={`$${option.system_cost.toLocaleString()}`} />

      <Card label="Payback Period" value={`${option.payback_years} years`} />
      <Card label="CO₂ Saved per Year" value={`${option.co2_savings_tons_per_year} tons`} />
      <Card label="Federal ITC Savings" value={`$${option.itc_savings.toLocaleString()}`} />
    </div>
  );
}

function Card({ label, value }) {
  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <div className="text-green-700 text-sm font-semibold">{label}</div>
      <div className="text-2xl font-bold text-green-900 mt-1">{value}</div>
    </div>
  );
}
