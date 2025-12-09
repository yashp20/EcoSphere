export default function AuraBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-10 left-0 w-96 h-96 bg-green-300/40 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-emerald-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-[28rem] h-[28rem] bg-teal-300/20 rounded-full blur-3xl animate-pulse" />
    </div>
  );
}

