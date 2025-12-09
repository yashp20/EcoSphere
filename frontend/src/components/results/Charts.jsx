import { Bar, Line, Pie } from "react-chartjs-2";

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

export default function Charts({ data }) {
  if (!data) return null;

  const {
    co2_savings_tons_per_year,
    remaining_carbon_footprint,
    payback_timeline,
    system_cost,
    battery_cost,
    itc_savings,
  } = data;

  // ---------------- CARBON BAR ----------------
  const carbonChart = {
    labels: ["Annual Carbon Impact"],
    datasets: [
      {
        label: "CO₂ Saved",
        data: [co2_savings_tons_per_year],
        backgroundColor: "#2E7D32",
      },
      {
        label: "Remaining Emissions",
        data: [remaining_carbon_footprint],
        backgroundColor: "#A5D6A7",
      },
    ],
  };

  // ---------------- PAYBACK LINE ----------------
  const paybackChart = {
    labels: payback_timeline.map((e) => `Year ${e.year}`),
    datasets: [
      {
        label: "Net Savings",
        data: payback_timeline.map((e) => e.net_savings),
        borderColor: "#1B5E20",
        backgroundColor: "#81C784",
        borderWidth: 3,
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  };

  // ---------------- COST PIE ----------------
  const pieChart = {
    labels: [
      "System Cost",
      ...(battery_cost > 0 ? ["Battery Cost"] : []),
      "Federal Incentive (ITC)",
    ],
    datasets: [
      {
        data: [
          system_cost,
          ...(battery_cost > 0 ? [battery_cost] : []),
          itc_savings * -1,
        ],
        backgroundColor: [
          "#2E7D32",
          ...(battery_cost > 0 ? ["#66BB6A"] : []),
          "#90CAF9",
        ],
        borderColor: [
          "#1B5E20",
          ...(battery_cost > 0 ? ["#388E3C"] : []),
          "#42A5F5",
        ],
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#14532d",
          font: {
            size: 15,
            weight: "600",
          },
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

      {/* CARBON */}
      <div className="bg-white p-6 rounded-3xl shadow border">
        <h3 className="text-xl font-extrabold text-green-900 mb-4">
          Annual Carbon Savings
        </h3>
        <Bar data={carbonChart} />
      </div>

      {/* PAYBACK */}
      <div className="bg-white p-6 rounded-3xl shadow border">
        <h3 className="text-xl font-extrabold text-green-900 mb-4">
          Payback Timeline
        </h3>
        <Line data={paybackChart} />
      </div>

      {/* COST PIE */}
      <div className="bg-white p-8 rounded-3xl shadow border md:col-span-2">
        <h3 className="text-2xl font-extrabold text-green-900 mb-8 text-center">
          Solar Cost Breakdown
        </h3>

        <div className="flex justify-center">
          <div className="w-[520px] h-[520px]">
            <Pie data={pieChart} options={pieOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
