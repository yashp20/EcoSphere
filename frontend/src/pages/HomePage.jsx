import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-green-300 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-[50rem] h-[50rem] bg-blue-300 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/3 w-[35rem] h-[35rem] bg-emerald-400 rounded-full blur-2xl opacity-30"></div>
      </div>

      {/* HERO SECTION */}
      <section className="pt-32 pb-28 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-6xl font-extrabold text-green-900 leading-tight animate-fadeIn">
          Clean Energy <span className="text-emerald-600">Made Simple.</span>
        </h1>

        <p className="text-xl text-green-800 mt-6 max-w-2xl mx-auto">
          Get personalized solar, battery, and renewable recommendations based on your
          real home and energy usage.
        </p>

        <button
          onClick={() => navigate("/assessment")}
          className="mt-10 px-12 py-4 bg-green-600 text-white text-xl rounded-2xl shadow-lg 
                     hover:bg-green-700 hover:scale-105 transition-all"
        >
          Start Energy Assessment
        </button>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-green-900 mb-12">
          Why EcoSphere?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard
            title="Instant Solar Insights"
            desc="We calculate system size, cost, tax credits, and payback instantly."
            icon="☀️"
          />
          <FeatureCard
            title="Smart Carbon Savings"
            desc="Track how much CO₂ your home could eliminate every year."
            icon="🌍"
          />
          <FeatureCard
            title="Compare All Options"
            desc="Solar, battery, wind, and heat pump — see what fits your home best."
            icon="⚡"
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 bg-white/50 backdrop-blur-md border-t border-white/40">
        <h2 className="text-5xl font-bold text-center text-green-900 mb-16">
          How It Works
        </h2>

        <div className="max-w-4xl mx-auto space-y-10">
          <TimelineStep
            title="Enter your home info"
            desc="ZIP Code - Usage -Home Size & Optional Battery"
          />
          <TimelineStep
            title="We compute your solar potential"
            desc="Using Irradiance Data and Energy Modeling"
          />
          <TimelineStep
            title="View your clean energy results"
            desc="Payback - System Cost - Carbon Savings & More"
          />
        </div>
      </section>

    </div>
  );
}

function FeatureCard({ title, desc, icon }) {
  return (
    <div className="group bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-md text-center
                    border border-white/40 hover:scale-105 hover:shadow-xl hover:border-green-300
                    transition-all duration-300 cursor-default">
      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-green-900 mb-2">{title}</h3>
      <p className="text-green-700 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function TimelineStep({ title, desc }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <h4 className="text-4xl font-bold text-green-800 mb-2">{title}</h4>
      <p className="text-green-600 text-2xl">{desc}</p>
    </div>
  );
}




