import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { FiZap, FiArrowRight } from "react-icons/fi";
const ease = [0.22, 1, 0.36, 1];
const DEAL_END_HOURS = 47;
const PARTICLES = Array.from({
  length: 22
});
function useCountdown(hours) {
  const target = useMemo(() => Date.now() + hours * 3_600_000, [hours]);
  const [remaining, setRemaining] = useState(() => Math.max(target - Date.now(), 0));
  useEffect(() => {
    const id = setInterval(() => setRemaining(Math.max(target - Date.now(), 0)), 1000);
    return () => clearInterval(id);
  }, [target]);
  const s = Math.floor(remaining / 1000);
  return {
    days: String(Math.floor(s / 86400)).padStart(2, "0"),
    hrs: String(Math.floor(s % 86400 / 3600)).padStart(2, "0"),
    mins: String(Math.floor(s % 3600 / 60)).padStart(2, "0"),
    secs: String(s % 60).padStart(2, "0"),
    progress: 100 - remaining / (hours * 3_600_000) * 100
  };
}
function TimeUnit({
  value,
  label
}) {
  return <div className="flex flex-col items-center justify-center relative" style={{
    width: "clamp(68px, 9vw, 96px)",
    height: "clamp(68px, 9vw, 96px)",
    borderRadius: 20,
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.14)",
    backdropFilter: "blur(12px)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
    overflow: "hidden"
  }}>
      <div className="absolute top-0 left-0 right-0 h-1/2" style={{
      background: "rgba(255,255,255,0.04)",
      borderBottom: "1px solid rgba(255,255,255,0.06)"
    }} />
      <motion.span key={value} initial={{
      y: -10,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      duration: 0.24,
      ease
    }} style={{
      fontSize: "clamp(22px, 3.2vw, 32px)",
      fontWeight: 800,
      color: "#fff",
      lineHeight: 1,
      letterSpacing: "-0.02em",
      position: "relative",
      zIndex: 1
    }}>
        {value}
      </motion.span>
      <span style={{
      fontSize: 9,
      letterSpacing: "0.10em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.42)",
      marginTop: 5,
      fontWeight: 600,
      position: "relative",
      zIndex: 1
    }}>
        {label}
      </span>
    </div>;
}
const DEALS = [{
  category: "Electronics",
  discount: "Up to 30% off",
  image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=600&auto=format&fit=crop"
}, {
  category: "Fashion",
  discount: "Up to 40% off",
  image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop"
}, {
  category: "Beauty",
  discount: "Up to 25% off",
  image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop"
}];
export default function Banner() {
    const {
    days,
    hrs,
    mins,
    secs,
    progress
  } = useCountdown(DEAL_END_HOURS);
  return <section id="deals" className="section-pad relative overflow-hidden bg-deals-banner">
      {/* Ambient glow layers */}
      <div className="absolute inset-0 pointer-events-none" style={{
      background: "radial-gradient(ellipse at 20% 35%, rgba(124,58,237,0.28) 0%, transparent 55%), radial-gradient(ellipse at 80% 65%, rgba(201,164,74,0.14) 0%, transparent 50%)"
    }} />

      {/* Particles */}
      {PARTICLES.map((_, i) => <motion.span key={i} className="absolute pointer-events-none rounded-full" style={{
      width: 2 + i % 4,
      height: 2 + i % 4,
      left: `${(i * 31 + 7) % 100}%`,
      top: `${(i * 47 + 13) % 100}%`,
      background: i % 3 === 0 ? "rgba(139,92,246,0.75)" : i % 3 === 1 ? "rgba(201,164,74,0.60)" : "rgba(255,255,255,0.30)"
    }} animate={{
      y: [0, -40, 0],
      opacity: [0.10, 0.90, 0.10],
      scale: [1, 1.5, 1]
    }} transition={{
      duration: 4.5 + i % 5,
      repeat: Infinity,
      delay: i * 0.22,
      ease: "easeInOut"
    }} />)}

      <Container className="relative flex flex-col items-center gap-14">
        {/* Header */}
        <motion.div initial={{
        opacity: 0,
        y: 28
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true,
        margin: "-60px"
      }} transition={{
        duration: 0.72,
        ease
      }} className="mx-auto flex flex-col items-center text-center relative overflow-hidden" style={{
        maxWidth: 760,
        borderRadius: 36,
        padding: "clamp(40px, 6vw, 72px) clamp(24px, 5vw, 64px)",
        background: "rgba(255,255,255,0.055)",
        backdropFilter: "blur(32px) saturate(1.6)",
        WebkitBackdropFilter: "blur(32px) saturate(1.6)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 32px 80px -16px rgba(0,0,0,0.52), inset 0 1px 0 rgba(255,255,255,0.09)",
        gap: "clamp(20px, 3vw, 32px)"
      }}>
          {/* Gold hairline crown */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full" style={{
          width: 140,
          height: 2,
          background: "linear-gradient(90deg, transparent, #C9A44A, transparent)"
        }} />

          <div className="flex items-center gap-2">
            <FiZap style={{
            color: "#E8C97A",
            fontSize: 14
          }} />
            <span style={{
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: "#E8C97A"
          }}>Flash Sale Li</span>
          </div>

          <h2 className="font-sans font-bold text-white" style={{
          fontSize: "clamp(26px, 4.5vw, 52px)",
          lineHeight: 1.08,
          letterSpacing: "-0.025em"
        }}>"Big Deals"{" "}
            <em style={{
            fontStyle: "italic",
            background: "linear-gradient(90deg, #A78BFA, #C9A44A)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>Limited Time</em>
          </h2>

          <p style={{
          fontSize: "clamp(13px, 1.5vw, 15px)",
          color: "rgba(255,255,255,0.50)",
          lineHeight: 1.84,
          maxWidth: 400
        }}>Massive Markdow</p>

          {/* Countdown */}
          <div className="flex items-center" style={{
          gap: "clamp(8px, 2vw, 18px)"
        }}>
            <TimeUnit value={days} label="Days" />
            <span style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.22)",
            fontWeight: 300,
            marginBottom: 18
          }}>:</span>
            <TimeUnit value={hrs} label="Hours" />
            <span style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.22)",
            fontWeight: 300,
            marginBottom: 18
          }}>:</span>
            <TimeUnit value={mins} label="Minutes" />
            <span style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.22)",
            fontWeight: 300,
            marginBottom: 18
          }}>:</span>
            <TimeUnit value={secs} label="Seconds" />
          </div>

          {/* Progress bar */}
          <div style={{
          width: "100%",
          maxWidth: 380
        }}>
            <div className="flex justify-between mb-2" style={{
            fontSize: 10.5,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.05em"
          }}>
              <span>Offer Progress</span>
              <span>{Math.round(progress)}"Claimed"</span>
            </div>
            <div style={{
            height: 3,
            borderRadius: 99,
            background: "rgba(255,255,255,0.10)",
            overflow: "hidden"
          }}>
              <motion.div className="h-full rounded-pill" style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #7C3AED, #A78BFA, #C9A44A)"
            }} transition={{
              duration: 1.2
            }} />
            </div>
          </div>

          <Button variant="light">Shop All Deals</Button>
        </motion.div>

        {/* Deal cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full">
          {DEALS.map((deal, i) => {
          return <motion.a key={deal.category} href="#shop" initial={{
            opacity: 0,
            y: 24
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.55,
            delay: i * 0.10,
            ease
          }} className="group relative overflow-hidden cursor-pointer" style={{
            borderRadius: 20,
            height: 200,
            boxShadow: "0 8px 32px rgba(0,0,0,0.40)",
            textDecoration: "none"
          }}>
              <img src={deal.image} alt={deal.category} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" loading="lazy" />
              <div className="absolute inset-0" style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.76) 0%, rgba(0,0,0,0.22) 55%, transparent 100%)"
            }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
              background: "linear-gradient(to top, rgba(124,58,237,0.50) 0%, transparent 55%)"
            }} />
              <div className="absolute bottom-5 left-5 flex flex-col gap-1">
                <span style={{
                display: "inline-block",
                padding: "3px 10px",
                borderRadius: 99,
                background: "rgba(201,164,74,0.90)",
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#000",
                marginBottom: 4,
                width: "fit-content"
              }}>
                  {deal.discount}
                </span>
                <p style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#fff"
              }}>{deal.category}</p>
                <div className="flex items-center gap-1 text-primary group-hover:gap-2 transition-all duration-300" style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "rgba(167,139,250,1)"
              }}>Shop Now<FiArrowRight size={10} />
                </div>
              </div>
            </motion.a>;
        })}
        </div>
      </Container>
    </section>;
}