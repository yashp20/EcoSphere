import WizardCard from "../components/WizardCard";

export default function AssessmentPage() {
  return (
    <div className="relative min-h-screen overflow-auto pt-32 pb-20 px-4 flex flex-col items-center gap-8">
      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-80 h-80 bg-green-300 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-[30rem] h-[30rem] bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-green-900 drop-shadow">
          Fill Out the Assessment Form
        </h1>
        <p className="text-green-700 mt-2 text-lg">
          Answer a few quick questions to get your personalized energy recommendations.
        </p>
      </div>

      <div className="w-full max-w-2xl">
        <WizardCard />
      </div>
    </div>
  );
}
