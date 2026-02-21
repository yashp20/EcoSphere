import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* --------------------- COUNTER COMPONENT --------------------- */
function Counter({ value, label }) {
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
    <div className="text-center bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-green-200 shadow-lg">
      <p className="text-4xl font-extrabold text-green-900">{count.toLocaleString()}</p>
      <p className="mt-1 text-green-700 text-lg font-medium">{label}</p>
    </div>
  );
}

/* --------------------- PARALLAX SPHERES --------------------- */
function ParallaxSphere({ size, top, left, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 0.4, scale: 1 }}
      transition={{ duration: 1.5 }}
      style={{ width: size, height: size, top, left, background: color }}
      className="absolute rounded-full blur-3xl mix-blend-screen"
    />
  );
}

/* --------------------- ABOUT PAGE --------------------- */
export default function AboutPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <div ref={ref} className="relative min-h-screen">

      {/* ---------------- PARALLAX FLOATING SPHERES ---------------- */}
      <motion.div style={{ y: y1 }}>
        <ParallaxSphere
          size={250}
          top="15%"
          left="12%"
          color="rgba(56, 239, 125, 0.25)"
        />
      </motion.div>

      <motion.div style={{ y: y2 }}>
        <ParallaxSphere
          size={200}
          top="38%"
          left="70%"
          color="rgba(0, 200, 255, 0.22)"
        />
      </motion.div>

      {/* ---------------- HERO TITLE ---------------- */}
      <section className="pt-32 pb-10 px-6 text-center max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold text-green-900 leading-tight"
        >
          Powering a Smarter, Cleaner Tomorrow.
        </motion.h1>
      </section>

      {/* ---------------- DESCRIPTION BOX ---------------- */}
      <section className="px-6 pb-16 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="
            max-w-4xl 
            bg-white/70 
            backdrop-blur-xl 
            shadow-xl 
            rounded-3xl 
            border border-green-200 
            p-10 
            text-center
          "
        >
          <p className="text-xl md:text-2xl font-medium text-green-900 leading-relaxed">
            EcoSphere is a next-generation clean-energy intelligence platform that 
            simplifies renewable decision-making for homeowners. Using advanced simulation tools, 
            environmental datasets, and AI-powered modeling, we evaluate your home’s structure, 
            energy usage, and geographic context to recommend the most cost-efficient solar, 
            battery, and efficiency upgrades.
            <br /><br />
            Our mission: democratize access to clean energy for all.
          </p>
        </motion.div>
      </section>

      {/* ---------------- IMPACT COUNTERS ---------------- */}
      <section className="py-20">
        <h2 className="text-4xl font-bold text-center text-green-900 mb-12">
          Our Impact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
          <Counter value={182400} label="kWh of Solar Modeled" />
          <Counter value={52800} label="kg CO₂ Saved" />
          <Counter value={942} label="Homes Analyzed" />
        </div>
      </section>

      {/* ---------------- FEATURES ---------------- */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-green-900 mb-10">
          Why EcoSphere?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "AI-Powered Energy Modeling",
              desc: "We analyze your home using real simulation data and high-accuracy predictions.",
            },
            {
              title: "Personalized Clean-Energy Plans",
              desc: "Solar, battery, and efficiency recommendations tailored to your exact home.",
            },
            {
              title: "Instant Cost & Payback Insights",
              desc: "Understand incentives, savings, and break-even timelines instantly.",
            },
          ].map((card, i) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={i}
              className="
                p-8 
                bg-white/70 
                backdrop-blur-lg 
                rounded-3xl 
                shadow-lg 
                border border-green-100 
                text-center
              "
            >
              <h3 className="text-2xl font-semibold text-green-900 mb-3">
                {card.title}
              </h3>
              <p className="text-green-700 text-lg leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------- JOURNEY TIMELINE ---------------- */}
      <section className="py-20 px-6 bg-white/60 backdrop-blur-lg">
        <h2 className="text-4xl font-bold text-center text-green-900 mb-12">
          Our Journey
        </h2>

        <div className="max-w-3xl mx-auto space-y-8">
          {[
            { year: "2024", text: "EcoSphere concept is born." },
            { year: "2025", text: "AI engine & modeling framework developed." },
            { year: "2026", text: "Launching community solar insights." },
            { year: "2027", text: "Full home-energy optimization suite." },
          ].map((item, i) => (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              key={i}
              className="
                flex flex-col items-center text-center 
                bg-white 
                rounded-3xl 
                shadow-md 
                p-6 
                border border-green-100
              "
            >
              <div className="text-4xl font-bold text-green-700 mb-2">
                {item.year}
              </div>
              <div className="text-green-800 text-lg">{item.text}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="py-24 text-center">
        <h2 className="text-4xl font-extrabold text-green-900 mb-4">
          Ready to unlock your clean-energy potential?
        </h2>

        <p className="text-lg text-green-700 mb-8 max-w-2xl mx-auto">
          Start your personalized assessment to see how much you can save —  
          tailored precisely to your home.
        </p>

        <a
          href="/assessment"
          className="px-10 py-4 bg-green-600 text-white text-xl rounded-2xl 
                     shadow-lg hover:bg-green-700 hover:scale-105 transition-all"
        >
          Begin Your Assessment
        </a>
      </section>
    </div>
  );
}
