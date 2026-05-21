import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden flex flex-col items-center justify-center px-6">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10rem] left-[-8rem] w-[36rem] h-[36rem] bg-emerald-300/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-8rem] right-[-6rem] w-[30rem] h-[30rem] bg-teal-300/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[25rem] h-[25rem] bg-cyan-200/10 rounded-full blur-[100px]" />
      </div>

      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2.5 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-200/50">
            <span className="text-white font-bold">E</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent tracking-tight">
            EcoSphere
          </span>
        </div>
        <p className="text-sm text-gray-500">Sign in to access your solar dashboard</p>
      </div>
      <SignIn path="/sign-in" routing="path" />
    </div>
  );
}
