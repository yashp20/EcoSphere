import { Bar, Line, Doughnut } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const COLORS = {
  emerald: "#10b981",
  teal: "#14b8a6",
  cyan: "#06b6d4",
  emeraldLight: "#a7f3d0",
  gray: "#e5e7eb",
};

export default function Charts({ data }) {
  if (!data) return null;

  const {
    co2_savings_tons_per_year = 0,
    remaining_carbon_footprint = 0,
    payback_timeline = [],
    system_cost = 0,
    battery_cost = 0,
    itc_savings = 0,
  } = data;

  const carbonChart = {
    labels: ["CO₂ Saved", "Remaining"],
    datasets: [
      {
        data: [co2_savings_tons_per_year, remaining_carbon_footprint],
        backgroundColor: [COLORS.emerald, COLORS.gray],
        borderWidth: 0,
        borderRadius: 8,
      },
    ],
  };

  const carbonOptions = {
    indexAxis: "y",
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.x.toFixed(2)} tons CO₂/yr` } },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#9ca3af", font: { size: 12 } } },
      y: { grid: { display: false }, ticks: { color: "#374151", font: { size: 13, weight: "500" } } },
    },
  };

  const safeTimeline = payback_timeline.length ? payback_timeline : [{ year: 0, net_savings: 0 }];

  const paybackChart = {
    labels: safeTimeline.map((e) => e.year),
    datasets: [
      {
        label: "Net Savings ($)",
        data: safeTimeline.map((e) => e.net_savings),
        borderColor: COLORS.emerald,
        backgroundColor: "rgba(16, 185, 129, 0.08)",
        borderWidth: 2.5,
        tension: 0.35,
        pointRadius: 0,
        pointHoverRadius: 5,
        fill: true,
      },
    ],
  };

  const paybackOptions = {
    plugins: { legend: { display: false } },
    scales: {
      x: {
        title: { display: true, text: "Year", color: "#9ca3af", font: { size: 12 } },
        grid: { display: false },
        ticks: { color: "#9ca3af", font: { size: 11 } },
      },
      y: {
        title: { display: true, text: "Net Savings ($)", color: "#9ca3af", font: { size: 12 } },
        grid: { color: "rgba(0,0,0,0.04)" },
        ticks: { color: "#9ca3af", font: { size: 11 }, callback: (v) => `$${v.toLocaleString()}` },
      },
    },
  };

  const costLabels = ["System Cost"];
  const costData = [system_cost];
  const costColors = [COLORS.emerald];
  if (battery_cost > 0) {
    costLabels.push("Battery");
    costData.push(battery_cost);
    costColors.push(COLORS.teal);
  }
  costLabels.push("Federal ITC");
  costData.push(itc_savings);
  costColors.push(COLORS.cyan);

  const doughnutChart = {
    labels: costLabels,
    datasets: [{ data: costData, backgroundColor: costColors, borderWidth: 0, spacing: 3 }],
  };

  const doughnutOptions = {
    cutout: "68%",
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#374151", font: { size: 13, weight: "500" }, padding: 16, usePointStyle: true, pointStyleWidth: 10 },
      },
      tooltip: { callbacks: { label: (ctx) => `${ctx.label}: $${ctx.parsed.toLocaleString()}` } },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/60">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Annual Carbon Impact (tons CO₂)</h3>
        <Bar data={carbonChart} options={carbonOptions} />
      </div>

      <div className="p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/60">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">20-Year Payback Timeline</h3>
        <Line data={paybackChart} options={paybackOptions} />
      </div>

      <div className="p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/60 md:col-span-2 flex flex-col items-center">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Cost Breakdown</h3>
        <div className="w-72 h-72">
          <Doughnut data={doughnutChart} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
}
