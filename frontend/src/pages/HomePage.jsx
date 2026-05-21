import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      {/* Page-level aura background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-white to-teal-100" />
        <div className="absolute top-[-12rem] left-[-10rem] w-[50rem] h-[50rem] bg-emerald-400/40 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: "6s" }} />
        <div className="absolute bottom-[-14rem] right-[-12rem] w-[55rem] h-[55rem] bg-teal-400/35 rounded-full blur-[160px] animate-pulse" style={{ animationDuration: "8s" }} />
        <div className="absolute top-[40%] left-[45%] w-[35rem] h-[35rem] bg-cyan-300/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: "7s" }} />
        <div className="absolute top-[20%] right-[10%] w-[22rem] h-[22rem] bg-emerald-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[30%] left-[5%] w-[28rem] h-[28rem] bg-teal-500/18 rounded-full blur-[110px]" />
      </div>

      {/* HERO */}
      <section className="relative pt-32 pb-28 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-emerald-200/60 text-emerald-700 text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Personalized solar planning
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.08] tracking-tight text-balance">
            <span className="text-gray-900">Your home's solar potential,</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              calculated.
            </span>
          </h1>

          <p className="mt-7 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get a tailored solar analysis with real irradiance data, accurate cost
            estimates, payback timelines, and local installer recommendations.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate("/assessment")}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold
                         shadow-lg shadow-emerald-300/40 hover:shadow-xl hover:shadow-emerald-300/50 hover:scale-[1.02] transition-all"
            >
              Start Your Assessment
            </button>
            <button
              onClick={() => navigate("/about")}
              className="px-8 py-3.5 rounded-2xl bg-white/70 backdrop-blur-sm text-gray-700 text-sm font-semibold
                         border border-white/60 shadow-sm hover:bg-white/90 hover:border-emerald-200 hover:text-emerald-700 transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide text-center mb-3">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-14">
            Solar analysis in three steps
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard
              step="01"
              title="Enter your home details"
              desc="ZIP code, monthly energy usage, home size, and ownership status."
              gradient="from-emerald-400/15 via-emerald-300/10 to-teal-400/15"
            />
            <StepCard
              step="02"
              title="We run the numbers"
              desc="Real NREL irradiance data powers system sizing, cost modeling, and carbon impact."
              gradient="from-teal-400/15 via-teal-300/10 to-cyan-400/15"
            />
            <StepCard
              step="03"
              title="Review your results"
              desc="See your recommended system, payback timeline, savings, and local solar providers."
              gradient="from-cyan-400/15 via-cyan-300/10 to-emerald-400/15"
            />
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-14">
            Why homeowners use EcoSphere
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ValueCard
              icon={<SunIcon />}
              title="Accurate modeling"
              desc="System sizing backed by NREL PVWatts satellite data for your exact location."
              color="emerald"
            />
            <ValueCard
              icon={<DollarIcon />}
              title="Clear financials"
              desc="Total cost, federal ITC savings, and year-by-year payback with no hidden assumptions."
              color="teal"
            />
            <ValueCard
              icon={<MapIcon />}
              title="Local providers"
              desc="Curated solar installers serving your area, ready to quote your recommended system."
              color="cyan"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-br from-emerald-700 via-teal-600 to-cyan-700">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-5rem] left-[15%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-5rem] right-[15%] w-[400px] h-[400px] bg-emerald-300/15 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-teal-300/10 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to see what solar can do for your home?
          </h2>
          <p className="text-emerald-100 text-lg mb-8">
            It takes less than two minutes. No account with a solar company required.
          </p>
          <button
            onClick={() => navigate("/assessment")}
            className="px-8 py-3.5 rounded-2xl bg-white text-emerald-700 text-sm font-semibold
                       shadow-lg hover:bg-emerald-50 hover:scale-[1.02] transition-all"
          >
            Start Free Assessment
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 bg-white/50 backdrop-blur-sm border-t border-emerald-100/30">
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} EcoSphere. Built for cleaner energy decisions.
        </p>
      </footer>
    </div>
  );
}

function StepCard({ step, title, desc, gradient }) {
  return (
    <div className={`relative p-7 rounded-2xl bg-gradient-to-br ${gradient} backdrop-blur-md
                     border border-white/50 hover:border-emerald-200/50 hover:shadow-xl hover:shadow-emerald-200/20
                     transition-all duration-300 group`}>
      <div className="absolute inset-0 rounded-2xl bg-white/40 -z-10" />
      <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase">
        Step {step}
      </span>
      <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2 group-hover:text-emerald-800 transition-colors">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function ValueCard({ icon, title, desc, color }) {
  const iconBg = { emerald: "from-emerald-200/60 to-emerald-100/40", teal: "from-teal-200/60 to-teal-100/40", cyan: "from-cyan-200/60 to-cyan-100/40" };
  const iconText = { emerald: "text-emerald-700", teal: "text-teal-700", cyan: "text-cyan-700" };

  return (
    <div className="p-7 rounded-2xl bg-white/50 backdrop-blur-md border border-white/50
                    shadow-sm hover:shadow-xl hover:shadow-emerald-200/15 hover:-translate-y-1 hover:bg-white/70 transition-all duration-300">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconBg[color]} flex items-center justify-center ${iconText[color]} mb-5 shadow-sm`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function SunIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}
