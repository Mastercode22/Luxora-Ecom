import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { FiClock } from "react-icons/fi";

const ease = [0.22, 1, 0.36, 1];
const HOURS = 18;
const PARTICLES = Array.from({ length: 22 });

function useCountdown(hours) {
  const target = useMemo(() => Date.now() + hours * 3_600_000, [hours]);
  const [remaining, setRemaining] = useState(() => Math.max(target - Date.now(), 0));

  useEffect(() => {
    const id = setInterval(() => setRemaining(Math.max(target - Date.now(), 0)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const s = Math.floor(remaining / 1000);
  return {
    hrs:  String(Math.floor(s / 3600)).padStart(2, "0"),
    mins: String(Math.floor((s % 3600) / 60)).padStart(2, "0"),
    secs: String(s % 60).padStart(2, "0"),
    progress: 100 - (remaining / (hours * 3_600_000)) * 100,
  };
}

function TimeUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center justify-center relative"
      style={{
        width: "clamp(72px, 9vw, 96px)",
        height: "clamp(72px, 9vw, 96px)",
        borderRadius: 20,
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(12px)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
        overflow: "hidden",
      }}>
      {/* Top half shimmer */}
      <div className="absolute top-0 left-0 right-0 h-1/2"
        style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }} />

      <motion.span
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.24, ease }}
        style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 800, color: "#fff", lineHeight: 1, tabularNums: true, letterSpacing: "-0.02em", position: "relative", zIndex: 1 }}
      >
        {value}
      </motion.span>
      <span style={{ fontSize: 9.5, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginTop: 5, fontWeight: 600, position: "relative", zIndex: 1 }}>
        {label}
      </span>
    </div>
  );
}

export default function SpecialOffers() {
  const { hrs, mins, secs, progress } = useCountdown(HOURS);

  return (
    <section className="section-pad relative overflow-hidden bg-special-offers">
      {/* Radial glow layers */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 20% 35%, rgba(233,30,99,0.22) 0%, transparent 55%), radial-gradient(ellipse at 80% 65%, rgba(255,209,230,0.10) 0%, transparent 50%)" }} />

      {/* Ambient particles */}
      {PARTICLES.map((_, i) => (
        <motion.span key={i} className="absolute pointer-events-none rounded-full"
          style={{
            width: 2 + (i % 4), height: 2 + (i % 4),
            left: `${(i * 31 + 7) % 100}%`,
            top:  `${(i * 47 + 13) % 100}%`,
            background: i % 3 === 0 ? "rgba(233,30,99,0.75)" : "rgba(255,209,230,0.50)",
          }}
          animate={{ y: [0, -40, 0], opacity: [0.10, 0.90, 0.10], scale: [1, 1.5, 1] }}
          transition={{ duration: 4.5 + (i % 5), repeat: Infinity, delay: i * 0.22, ease: "easeInOut" }}
        />
      ))}

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.72, ease }}
          className="mx-auto flex flex-col items-center text-center relative overflow-hidden"
          style={{
            maxWidth: 740,
            borderRadius: 36,
            padding: "clamp(40px, 6vw, 72px) clamp(24px, 5vw, 64px)",
            background: "rgba(255,255,255,0.065)",
            backdropFilter: "blur(32px) saturate(1.6)",
            WebkitBackdropFilter: "blur(32px) saturate(1.6)",
            border: "1px solid rgba(255,255,255,0.11)",
            boxShadow: "0 32px 80px -16px rgba(0,0,0,0.44), inset 0 1px 0 rgba(255,255,255,0.10)",
            gap: "clamp(20px, 3vw, 32px)",
          }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
            style={{ width: 120, height: 2, background: "linear-gradient(90deg, transparent, var(--color-primary), transparent)" }} />

          <div className="flex items-center gap-2">
            <FiClock style={{ color: "#FFD1E6", fontSize: 13 }} />
            <span className="eyebrow-lg" style={{ color: "#FFD1E6" }}>Limited-Time Offer</span>
          </div>

          <h2 className="font-sans font-bold text-white"
            style={{ fontSize: "clamp(24px, 4vw, 46px)", lineHeight: 1.09, letterSpacing: "-0.025em" }}>
            25% off the Valentine Collection
          </h2>

          <p className="font-light" style={{ fontSize: "clamp(13px, 1.5vw, 15px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.84, maxWidth: 400 }}>
            Our most-requested arrangements, priced for a limited window.
            Once the timer ends, the collection returns to full price.
          </p>

          {/* Countdown */}
          <div className="flex items-center" style={{ gap: "clamp(10px, 2vw, 20px)" }}>
            <TimeUnit value={hrs}  label="Hours"   />
            <span style={{ fontSize: 26, color: "rgba(255,255,255,0.28)", fontWeight: 300, marginBottom: 18 }}>:</span>
            <TimeUnit value={mins} label="Minutes"  />
            <span style={{ fontSize: 26, color: "rgba(255,255,255,0.28)", fontWeight: 300, marginBottom: 18 }}>:</span>
            <TimeUnit value={secs} label="Seconds"  />
          </div>

          {/* Progress bar */}
          <div style={{ width: "100%", maxWidth: 380 }}>
            <div className="flex justify-between mb-2" style={{ fontSize: 10.5, color: "rgba(255,255,255,0.38)", letterSpacing: "0.05em" }}>
              <span>Offer progress</span>
              <span>{Math.round(progress)}% claimed</span>
            </div>
            <div style={{ height: 3, borderRadius: 99, background: "rgba(255,255,255,0.10)", overflow: "hidden" }}>
              <motion.div
                className="h-full rounded-pill"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, var(--color-primary), #FF6090, #FFD1E6)",
                }}
                transition={{ duration: 1.2 }}
              />
            </div>
          </div>

          <Button variant="light">Shop The Offer</Button>
        </motion.div>
      </Container>
    </section>
  );
}
