import WizardCard from "../components/WizardCard";

export default function AssessmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Visual Panel */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-0">
            <div className="absolute -top-20 -left-10 w-[32rem] h-[32rem] bg-emerald-300/30 rounded-full blur-[140px]" />
            <div className="absolute bottom-[-6rem] left-10 w-[30rem] h-[30rem] bg-teal-300/25 rounded-full blur-[140px]" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-center px-16">
            <h1 className="text-5xl font-extrabold text-emerald-950 leading-tight">
              Personalized solar analysis,
              <span className="text-emerald-600"> in minutes.</span>
            </h1>
            <p className="mt-5 text-lg text-emerald-800/80 max-w-md">
              We’ll size your system, estimate savings, and show payback using real NREL data.
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex items-center justify-center px-6 py-16 lg:px-16">
          <div className="w-full max-w-xl">
            <WizardCard />
          </div>
        </div>
      </div>
    </div>
  );
}
