import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { FiArrowRight } from "react-icons/fi";
import Container from "../ui/Container";

/* ─── Flower / element data ─────────────────────────────────────────────── */
const BLOOMS = [
  { src: "https://images.unsplash.com/photo-1490750967868-88df5691cc13?w=300&q=90&auto=format&fit=crop", alt: "Red rose",       scale: 1.25 },
  { src: "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=300&q=90&auto=format&fit=crop", alt: "Pink peony",      scale: 1.40 },
  { src: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&q=90&auto=format&fit=crop", alt: "Chocolate",       scale: 0.70 },
  { src: "https://images.unsplash.com/photo-1510832842230-87253f48d74b?w=300&q=90&auto=format&fit=crop", alt: "Ranunculus",    scale: 1.10 },
  { src: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=300&q=90&auto=format&fit=crop", alt: "Deep rose",     scale: 1.30 },
  { src: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=300&q=90&auto=format&fit=crop", alt: "White peony",   scale: 1.10 },
  { src: "https://images.unsplash.com/photo-1490750967868-88df5691cc13?w=300&q=90&auto=format&fit=crop", alt: "Rose bud",      scale: 0.90 },
  { src: "https://images.unsplash.com/photo-1457530378978-8bac673b8062?w=300&q=90&auto=format&fit=crop", alt: "Tulip",         scale: 1.05 },
  { src: "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=300&q=90&auto=format&fit=crop", alt: "Cream peony",    scale: 1.20 },
  { src: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&q=90&auto=format&fit=crop", alt: "Truffle",         scale: 0.75 },
  { src: "https://images.unsplash.com/photo-1510832842230-87253f48d74b?w=300&q=90&auto=format&fit=crop", alt: "Pale bloom",    scale: 1.00 },
  { src: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=300&q=90&auto=format&fit=crop", alt: "Garden rose",   scale: 1.15 },
];

const TRUST = [
  { icon: "🌱", label: "Farm Direct" },
  { icon: "⚡", label: "Same-day" },
  { icon: "⭐", label: "4.9" },
];

const ease = [0.22, 1, 0.36, 1];
const N     = BLOOMS.length;
const SPEED = 0.0045; // radians / frame  ≈ 1 revolution every ~24 s

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function Hero() {
  const stageRef = useRef(null);
  const angleRef = useRef(0);
  const rafRef   = useRef(null);
  const blob1    = useRef(null);
  const blob2    = useRef(null);
  const blob3    = useRef(null);

  /* ── Flower orbit via rAF (direct DOM — no re-renders) ─────────────── */
  useEffect(() => {
    const stage   = stageRef.current;
    if (!stage) return;

    // Even angular offsets so all N flowers are evenly spaced on the ring
    const offsets = BLOOMS.map((_, i) => (i / N) * Math.PI * 2);

    function tick() {
      angleRef.current += SPEED;

      const W  = stage.offsetWidth;
      const H  = stage.offsetHeight;
      const isMobile = W < 768;

      // Responsive ellipse parameters — center shifted lower on mobile
      const cx = isMobile ? W * 0.50 : W * 0.54;
      const cy = isMobile ? H * 0.68 : H * 0.52;
      const rx = isMobile ? W * 0.44 : W * 0.40;
      const ry = isMobile ? H * 0.16 : H * 0.32;

      const els = stage.querySelectorAll(".bloom");
      els.forEach((el, i) => {
        const a     = offsets[i] + angleRef.current;
        const x     = cx + rx * Math.cos(a);
        const y     = cy + ry * Math.sin(a);

        // depth: sin(a) ∈ [-1, +1];  -1 = far back, +1 = far front
        const depth = Math.sin(a);
        const t     = (depth + 1) / 2;           // normalise 0 → 1

        // Increased sizes for mobile (90px - 200px) and kept original for desktop
        const baseSize = (isMobile ? (90 + 110 * t) : (96 + 144 * t)) * (BLOOMS[i].scale || 1);
        const blur     = (1 - t) * (isMobile ? 4 : 7);
        const bright   = 0.35 + 0.65 * t;
        const opac     = isMobile ? (0.08 + 0.34 * t) : (0.10 + 0.50 * t);

        // Custom non-linear scale: zooms up in the mid-ground, then scales down/zooms out as it reaches the front (t -> 1)
        const scaleVal = isMobile
          ? (0.55 + 0.45 * Math.sin(t * Math.PI * 0.82))
          : (0.4 + 0.85 * Math.sin(t * Math.PI * 0.82));

        // z-index trick: front flowers (depth > 0.25) sit ABOVE the text
        // back flowers sit BELOW the text → creates the loop-around effect
        const z = depth > 0.25
          ? 20 + Math.round(t * 12)   // 20 – 32  (above text layer z-15)
          : Math.round(t * 8);        //  0 – 8   (below text layer z-15)

        const shadow = depth > 0.1
          ? `0 ${(10 * t).toFixed(0)}px ${(30 * t).toFixed(0)}px rgba(0,0,0,0.40),` +
            `0 0 0 ${(2.5 * t).toFixed(1)}px rgba(255,255,255,0.16)`
          : "none";

        const border = t > 0.5
          ? `${(2.2 * t).toFixed(1)}px solid rgba(255,255,255,0.20)`
          : "none";

        Object.assign(el.style, {
          left:        `${x.toFixed(1)}px`,
          top:         `${y.toFixed(1)}px`,
          width:       `${baseSize.toFixed(0)}px`,
          height:      `${baseSize.toFixed(0)}px`,
          filter:      `blur(${blur.toFixed(1)}px) brightness(${bright.toFixed(2)})`,
          opacity:     opac.toFixed(2),
          zIndex:      z,
          boxShadow:   shadow,
          border,
          transform:   `translate(-50%, -50%) scale(${scaleVal.toFixed(3)})`,
        });
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ── GSAP blob ambient drift ─────────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(blob1.current, { scale: 1.12, x: 30, y: -20, duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(blob2.current, { scale: 1.10, x: -24, y: 28, duration: 13, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });
      gsap.to(blob3.current, { scale: 1.08, x: 16, y: -14, duration:  9, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 4 });
    });
    return () => ctx.revert();
  }, []);

  /* ─────────────────────────────────────────────────────────────────────── */
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{
        minHeight: "clamp(520px, 72vh, 660px)",
        background:
          "linear-gradient(135deg, #0d0221 0%, #1a0533 28%, #120340 55%, #0a0118 100%)",
        paddingTop: "clamp(72px, 8vw, 86px)",
      }}
    >
      {/* ── Plexus / network background ─────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute w-[200%] h-[200%] animate-spin-slow-custom"
          style={{
            backgroundImage: "url('/network-bg.png')",
            backgroundSize:  "cover",
            backgroundPosition: "center",
            opacity: 0.28,
          }}
        />
      </div>

      {/* ── Ambient colour blobs ─────────────────────────────────────────── */}
      <div ref={blob1} aria-hidden="true" className="absolute rounded-full pointer-events-none"
        style={{ width: 640, height: 640, top: -200, right: -180,
          background: "radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)" }} />
      <div ref={blob2} aria-hidden="true" className="absolute rounded-full pointer-events-none"
        style={{ width: 560, height: 560, bottom: -160, left: -140,
          background: "radial-gradient(circle, rgba(233,30,99,0.14) 0%, transparent 70%)" }} />
      <div ref={blob3} aria-hidden="true" className="absolute rounded-full pointer-events-none"
        style={{ width: 380, height: 380, top: "40%", left: "40%",
          background: "radial-gradient(circle, rgba(109,40,217,0.16) 0%, transparent 70%)" }} />

      {/* ── Orbit ring (decorative ellipse guide) ───────────────────────── */}
      <div aria-hidden="true" className="absolute pointer-events-none"
        style={{
          left:   "54%",   top:    "52%",
          width:  "80%",   height: "64%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border:     "1px solid rgba(139,92,246,0.22)",
          boxShadow:  "0 0 80px rgba(139,92,246,0.12), inset 0 0 80px rgba(139,92,246,0.06)",
        }}
      />
      {/* Inner glow ring */}
      <div aria-hidden="true" className="absolute pointer-events-none"
        style={{
          left:   "54%",   top:    "52%",
          width:  "74%",   height: "58%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border:    "1px solid rgba(233,30,99,0.10)",
        }}
      />

      {/* ── Flower orbit stage — covers full section ─────────────────────── */}
      <div
        ref={stageRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      >
        {BLOOMS.map((b, i) => (
          <div
            key={i}
            className="bloom absolute"
            style={{
              borderRadius: "50%",
              overflow:     "hidden",
              willChange:   "transform, filter, opacity",
              transform:    "translate(-50%, -50%)",
            }}
          >
            <img
              src={b.src}
              alt={b.alt}
              className="w-full h-full object-cover block"
              draggable={false}
              loading="eager"
            />
          </div>
        ))}
      </div>

      {/* ── LEFT: text content ── z-15 so back flowers hide behind it ────── */}
      <Container
        className="relative flex items-start md:items-center pt-8 md:pt-0"
        style={{
          zIndex: 15,
          minHeight: "calc(72vh - clamp(72px, 8vw, 86px))",
          paddingBottom: "clamp(30px, 4vw, 44px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease }}
          className="flex flex-col"
          style={{ gap: "clamp(18px, 2.8vw, 26px)", maxWidth: 500 }}
        >
          {/* Trust pills */}
          <div className="flex flex-wrap gap-2">
            {TRUST.map((t) => (
              <span
                key={t.label}
                className="inline-flex items-center gap-1.5 rounded-full font-semibold"
                style={{
                  fontSize:        10.5,
                  letterSpacing:   "0.07em",
                  textTransform:   "uppercase",
                  padding:         "5px 14px",
                  background:      "rgba(255,255,255,0.07)",
                  backdropFilter:  "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border:          "1px solid rgba(255,255,255,0.14)",
                  color:           "rgba(255,255,255,0.80)",
                }}
              >
                <span style={{ fontSize: 13 }}>{t.icon}</span>
                {t.label}
              </span>
            ))}
          </div>

          {/* Headline */}
          <h1
            className="font-sans font-bold text-white"
            style={{
              fontSize:      "clamp(34px, 5.2vw, 66px)",
              lineHeight:    1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Every arrangement,{" "}
            <em
              className="not-italic font-serif"
              style={{ fontStyle: "italic", color: "rgba(255,255,255,0.95)" }}
            >
              finished by hand
            </em>{" "}
            in our Accra studio.
          </h1>


          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              className="inline-flex items-center gap-2 font-bold text-white rounded-full transition-all duration-300 hover:brightness-110 active:scale-95"
              style={{
                background:  "#E91E63",
                fontSize:    12.5,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding:     "13px 28px",
                boxShadow:   "0 8px 28px rgba(233,30,99,0.45)",
              }}
            >
              SHOP FLOWERS <FiArrowRight size={13} />
            </button>
          </div>
        </motion.div>
      </Container>

    </section>
  );
}
