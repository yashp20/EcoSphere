import { motion } from "framer-motion";
import {
  SunIcon,
  BoltIcon,
  FireIcon,
  CloudIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

// Labels
const LABELS = {
  rooftop_solar: "Rooftop Solar",
  solar_battery: "Solar + Battery Storage",
  heat_pump: "High-Efficiency Heat Pump",
  wind: "Residential Wind Turbine",
  community_solar: "Community Solar Subscription",
};

// Icons
const ICONS = {
  rooftop_solar: SunIcon,
  solar_battery: BoltIcon,
  heat_pump: FireIcon,
  wind: CloudIcon,
  community_solar: Cog6ToothIcon,
};

// Short descriptions
const DESCRIPTIONS = {
  rooftop_solar:
    "The most cost-effective and reliable clean-energy option for your region. Excellent sunlight, strong incentives, and fast payback.",
  solar_battery:
    "Ideal if you want backup power during outages. Stores solar energy for night use and peak-hour savings.",
  heat_pump:
    "Reduces heating & cooling costs by up to 40%. Great for all-electric homes and improving indoor comfort.",
  wind:
    "Works best in high-wind rural or coastal areas. Generates power day & night.",
  community_solar:
    "No installation needed. Subscribe to a local solar farm and get monthly bill credits.",
};

export default function BestOptionCard({ option, data }) {
  const Icon = ICONS[option];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-10 mb-16
                 border border-green-100 relative overflow-hidden"
    >
      {/* Background subtle gradient aura */}
      <div className="absolute inset-0 blur-3xl opacity-20 bg-gradient-to-br from-green-300 to-emerald-400 -z-10" />

      <div className="flex flex-col md:flex-row items-start md:items-center gap-8">

        {/* Icon */}
        <div className="bg-green-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-md">
          <Icon className="w-12 h-12" />
        </div>

        {/* Text */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-900">
            Best Option: {LABELS[option]}
          </h2>

          <p className="text-green-800/80 mt-3 text-lg leading-relaxed max-w-2xl">
            {DESCRIPTIONS[option]}
          </p>

          {/* Stats badges */}
          <div className="flex flex-wrap gap-4 mt-6">
            <span className="px-4 py-2 bg-green-600 text-white text-sm rounded-xl shadow">
              ⭐ Estimated Savings: ${data?.annual_savings?.toLocaleString() ?? "N/A"}/yr
            </span>

            <span className="px-4 py-2 bg-emerald-100 text-green-800 text-sm rounded-xl shadow border border-green-300">
              ⏳ Payback: {data.payback_years} years
            </span>

            <span className="px-4 py-2 bg-green-100 text-green-700 text-sm rounded-xl shadow border border-green-300">
              ⚡ Output: {data.annual_output_kwh?.toLocaleString() || "N/A"} kWh/yr
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10">
        <button
          className="px-6 py-3 rounded-xl bg-green-700 text-white font-semibold 
                     shadow hover:bg-green-800 transition"
        >
          Learn More About {LABELS[option]}
        </button>
      </div>
    </motion.div>
  );
}
