import WizardCard from "../components/WizardCard";

export default function AssessmentPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
        {/* Left panel */}
        <div className="relative hidden lg:flex flex-col justify-center px-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-0 w-[350px] h-[350px] bg-teal-400/15 rounded-full blur-[100px]" />
            <div className="absolute top-2/3 left-1/3 w-[200px] h-[200px] bg-cyan-300/10 rounded-full blur-[80px]" />
          </div>

          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold text-white leading-tight">
              Personalized solar analysis,
              <br />
              <span className="text-emerald-200">in minutes.</span>
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-md leading-relaxed">
              We'll size your system, estimate savings, and project payback using
              real NREL satellite data for your location.
            </p>

            <div className="mt-10 space-y-4">
              <CheckItem text="Uses real NREL PVWatts irradiance data" />
              <CheckItem text="Accounts for federal ITC incentives" />
              <CheckItem text="Shows local solar providers near you" />
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="relative flex items-center justify-center px-6 py-12 lg:px-16 overflow-hidden">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-emerald-100/30 rounded-full blur-[100px]" />
            <div className="absolute bottom-10 left-10 w-[250px] h-[250px] bg-teal-100/25 rounded-full blur-[80px]" />
          </div>

          <div className="w-full max-w-lg">
            <div className="lg:hidden mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Solar Assessment</h1>
              <p className="text-gray-500 text-sm mt-1">Enter your home details to get a personalized recommendation.</p>
            </div>
            <WizardCard />
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckItem({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/20">
        <svg className="w-3.5 h-3.5 text-emerald-200" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
      <span className="text-white/80 text-sm">{text}</span>
    </div>
  );
}
