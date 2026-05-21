import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Counter({ value, label, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1300;
    const increment = end / (duration / 16);
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(counter);
  }, [value]);

  return (
    <div className="text-center p-8">
      <p className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="mt-2 text-sm text-gray-500 font-medium">{label}</p>
    </div>
  );
}

export default function AboutPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <div ref={ref} className="min-h-screen">

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <motion.div style={{ y: y1 }}>
            <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-emerald-200/25 rounded-full blur-[140px]" />
          </motion.div>
          <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-teal-200/15 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 right-10 w-[250px] h-[250px] bg-cyan-200/10 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold leading-tight text-balance"
          >
            <span className="text-gray-900">Making clean energy decisions </span>
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              simpler for every homeowner.
            </span>
          </motion.h1>
        </div>
      </section>

      {/* Description */}
      <section className="px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 shadow-lg shadow-emerald-100/10 p-10"
        >
          <p className="text-lg text-gray-600 leading-relaxed">
            EcoSphere helps homeowners understand their solar potential using real
            environmental data. We combine NREL satellite irradiance measurements with
            your home's energy profile to produce accurate system sizing, cost
            estimates, and payback projections — so you can make informed decisions
            about going solar.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-4">
            Our goal is straightforward: give people the information they need to
            evaluate clean energy options without the pressure of a sales pitch.
          </p>
        </motion.div>
      </section>

      {/* Impact counters */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 shadow-lg shadow-emerald-100/10">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-emerald-100/30">
            <Counter value={182400} label="kWh of solar modeled" />
            <Counter value={52800} label="kg CO₂ offset estimated" suffix="+" />
            <Counter value={942} label="Homes analyzed" suffix="+" />
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-emerald-100/15 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            What makes EcoSphere different
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Data-driven estimates",
                desc: "System sizing and output are calculated from NREL PVWatts satellite data — not generic averages.",
                gradient: "from-emerald-500/10 to-teal-500/10",
              },
              {
                title: "Personalized to your home",
                desc: "Your ZIP code, energy usage, home size, and ownership status all factor into the recommendation.",
                gradient: "from-teal-500/10 to-cyan-500/10",
              },
              {
                title: "Transparent financials",
                desc: "See the full cost picture: system price, federal ITC savings, annual savings, and break-even year.",
                gradient: "from-cyan-500/10 to-emerald-500/10",
              },
            ].map((card, i) => (
              <motion.div
                whileHover={{ y: -6 }}
                key={i}
                className={`p-8 bg-gradient-to-br ${card.gradient} backdrop-blur-sm rounded-3xl border border-white/60
                           shadow-sm hover:shadow-lg hover:shadow-emerald-100/20 transition-all duration-300`}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-200/40 to-transparent" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          Project timeline
        </h2>

        <div className="max-w-2xl mx-auto space-y-4">
          {[
            { year: "2024", text: "EcoSphere concept developed." },
            { year: "2025", text: "Solar modeling engine and NREL integration built." },
            { year: "2026", text: "Public launch with provider recommendations." },
          ].map((item, i) => (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              key={i}
              className="flex items-center gap-6 p-5 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/60 hover:bg-white/70 hover:shadow-md transition-all"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent w-16 flex-shrink-0">
                {item.year}
              </span>
              <span className="text-gray-600">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600" />
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-emerald-400/20 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-3xl font-bold text-white mb-4">
            See what solar looks like for your home
          </h2>
          <p className="text-emerald-100/80 mb-8">
            Complete a quick assessment and get your personalized solar analysis.
          </p>
          <a href="/assessment"
            className="inline-block px-8 py-3.5 bg-white text-emerald-700 text-sm font-semibold rounded-2xl
                       shadow-lg hover:bg-emerald-50 hover:scale-[1.02] transition-all">
            Start Assessment
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-white/40 backdrop-blur-sm border-t border-emerald-100/30">
        <p className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} EcoSphere. Built for cleaner energy decisions.
        </p>
      </footer>
    </div>
  );
}
