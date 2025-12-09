import WizardCard from "../components/WizardCard";

export default function AssessmentPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-80 h-80 bg-green-300 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-[30rem] h-[30rem] bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* 🔥 Title Above The Form */}
      <div className="fixed top-[18%] left-1/2 -translate-x-1/2 text-center z-20">
        <h1 className="text-4xl font-extrabold text-green-900 drop-shadow">
          Fill Out the Assessment Form
        </h1>
        <p className="text-green-700 mt-2 text-lg">
          Answer a few quick questions to receive your personalized energy recommendations.
        </p>
      </div>

      {/* 🔥 PERFECTLY CENTERED WIZARD */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4 z-20">
        <WizardCard />
      </div>
    </div>
  );
}
