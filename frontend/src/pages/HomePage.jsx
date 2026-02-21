import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-6rem] left-[-4rem] w-[36rem] h-[36rem] bg-emerald-300/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-8rem] right-[-6rem] w-[40rem] h-[40rem] bg-teal-300/25 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/3 w-[30rem] h-[30rem] bg-lime-200/25 rounded-full blur-[120px]" />
      </div>

      {/* HERO SECTION */}
      <section className="pt-28 pb-20 text-center max-w-5xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-emerald-200 text-emerald-700 text-sm font-semibold shadow-sm">
          ✨ Modern clean‑energy planning
        </div>

        <h1 className="mt-6 text-5xl md:text-6xl font-extrabold text-emerald-950 leading-tight tracking-tight">
          Clean energy, <span className="text-emerald-600">beautifully simple.</span>
        </h1>

        <p className="text-lg md:text-xl text-emerald-800/80 mt-5 max-w-2xl mx-auto">
          Get a tailored solar plan with real irradiance data, costs, payback, and
          installer options — in minutes.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/assessment")}
            className="px-8 py-3.5 rounded-2xl bg-emerald-600 text-white text-lg font-semibold shadow-lg 
                       hover:bg-emerald-700 hover:scale-[1.02] transition"
          >
            Start Assessment
          </button>
          <button
            onClick={() => navigate("/about")}
            className="px-8 py-3.5 rounded-2xl bg-white/80 text-emerald-800 border border-emerald-200 
                       hover:bg-white transition"
          >
            How it works
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-950 mb-10">
          Why EcoSphere?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Real‑world solar modeling"
            desc="Accurate system sizing and output with NREL data."
            icon="☀️"
          />
          <FeatureCard
            title="Clear financials"
            desc="See total cost, incentives, and payback timeline."
            icon="💸"
          />
          <FeatureCard
            title="Local providers"
            desc="Find top solar installers near you with one click."
            icon="📍"
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 bg-white/60 backdrop-blur-md border-t border-white/40">
        <h2 className="text-4xl font-bold text-center text-emerald-950 mb-12">
          How It Works
        </h2>

        <div className="max-w-4xl mx-auto grid gap-6">
          <TimelineStep
            title="Enter your home info"
            desc="ZIP, usage, ownership, and home size."
          />
          <TimelineStep
            title="We run the analysis"
            desc="Model output, costs, incentives, and carbon impact."
          />
          <TimelineStep
            title="Review your results"
            desc="Compare options and connect with installers."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, desc, icon }) {
  return (
    <div className="group bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-md text-center
                    border border-white/50 hover:shadow-xl hover:-translate-y-1
                    transition-all duration-300">
      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-emerald-950 mb-2">{title}</h3>
      <p className="text-emerald-800/80 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function TimelineStep({ title, desc }) {
  return (
    <div className="text-center max-w-3xl mx-auto p-6 rounded-2xl bg-white/70 border border-emerald-100 shadow-sm">
      <h4 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-2">{title}</h4>
      <p className="text-emerald-700 text-lg">{desc}</p>
    </div>
  );
}




