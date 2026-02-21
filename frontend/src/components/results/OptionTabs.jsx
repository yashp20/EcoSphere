import { useState } from "react";
import MetricCards from "../../pages/MetricCards";
// ❌ REMOVE Charts import
// import Charts from "./Charts";

export default function OptionTabs({ rankings }) {
  const keys = Object.keys(rankings);
  const [selected, setSelected] = useState(keys[0]);

  const labels = {
    rooftop_solar: "Rooftop Solar",
    solar_battery: "Solar + Battery",
    heat_pump: "Heat Pump",
    wind: "Home Wind Turbine",
    community_solar: "Community Solar",
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-green-900 mb-4">
        Compare Energy Options
      </h2>

      {/* TAB BUTTONS */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {keys.map((k) => (
          <button
            key={k}
            onClick={() => setSelected(k)}
            className={`px-5 py-2 rounded-xl border transition 
              ${
                selected === k
                  ? "bg-green-600 text-white border-green-700"
                  : "bg-white/70 border-green-300 text-green-800"
              }`}
          >
            {labels[k] || k}
          </button>
        ))}
      </div>

      {/* SELECTED OPTION CONTENT */}
      <MetricCards option={rankings[selected]} />   {/* ✅ was: data= */}
      {/* ❌ Charts removed from OptionTabs */}
      {/* This prevents duplicate graphs */}
    </div>
  );
}
