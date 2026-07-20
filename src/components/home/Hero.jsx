import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { FiArrowRight, FiShoppingBag, FiStar } from "react-icons/fi";
import Container from "../ui/Container";

/* ─── Product images for the orbit ──────────────────────────────────────── */
const ORBIT_PRODUCTS = [
  {
    src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop",
    alt: "Headphones",
    name: "Sony XM5",
    price: "$279",
    scale: 1.25,
  },
  {
    src: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=300&auto=format&fit=crop",
    alt: "Smartwatch",
    name: "Apple Watch",
    price: "$799",
    scale: 1.40,
  },
  {
    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300&auto=format&fit=crop",
    alt: "Sneakers",
    name: "Nike Cortez",
    price: "$219",
    scale: 0.70,
  },
  {
    src: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=300&auto=format&fit=crop",
    alt: "Perfume",
    name: "Bleu de Chanel",
    price: "$185",
    scale: 1.10,
  },
  {
    src: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=300&auto=format&fit=crop",
    alt: "Handbag",
    name: "Studio Tote",
    price: "$395",
    scale: 1.30,
  },
  {
    src: "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?q=80&w=300&auto=format&fit=crop",
    alt: "Smartphone",
    name: "Galaxy S25",
    price: "$1,299",
    scale: 1.10,
  },
  {
    src: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=300&auto=format&fit=crop",
    alt: "Gaming Mouse",
    name: "G Pro X2",
    price: "$159",
    scale: 0.90,
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=300&auto=format&fit=crop",
    alt: "Smart Lamp",
    name: "Nanoleaf",
    price: "$199",
    scale: 1.05,
  },
  {
    src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300&auto=format&fit=crop",
    alt: "Skincare",
    name: "La Mer Set",
    price: "$320",
    scale: 1.20,
  },
  {
    src: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=300&auto=format&fit=crop",
    alt: "Jacket",
    name: "Bomber Jacket",
    price: "$289",
    scale: 0.75,
  },
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=300&auto=format&fit=crop",
    alt: "Sports",
    name: "Pro Bundle",
    price: "$248",
    scale: 1.00,
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    alt: "Lamp",
    name: "Arc Floor Lamp",
    price: "$599",
    scale: 1.15,
  },
];

const ease = [0.22, 1, 0.36, 1];
const N = ORBIT_PRODUCTS.length;
const SPEED = 0.004;

/* ─── Floating product mini-card for orbit ─── */
function OrbitCard({ name, price, showCard }) {
  if (!showCard) return null;
  return (
    <div
      style={{
        position: "absolute",
        bottom: "calc(100% + 6px)",
        left: "50%",
        transform: "translateX(-50%)",
        whiteSpace: "nowrap",
        background: "rgba(255,255,255,0.10)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: 10,
        padding: "5px 10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        pointerEvents: "none",
      }}
    >
      <span style={{ fontSize: 9.5, fontWeight: 700, color: "#fff", letterSpacing: "0.04em" }}>{name}</span>
      <span style={{ fontSize: 9, color: "rgba(167,139,250,1)", fontWeight: 600 }}>{price}</span>
    </div>
  );
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function Hero() {
  const stageRef = useRef(null);
  const angleRef = useRef(0);
  const rafRef   = useRef(null);
  const blob1    = useRef(null);
  const blob2    = useRef(null);
  const blob3    = useRef(null);

  /* ── Product orbit via rAF (direct DOM — no re-renders) ─────────────── */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const offsets = ORBIT_PRODUCTS.map((_, i) => (i / N) * Math.PI * 2);

    function tick() {
      angleRef.current += SPEED;

      const W  = stage.offsetWidth;
      const H  = stage.offsetHeight;
      const isMobile = W < 768;

      const cx = isMobile ? W * 0.50 : W * 0.54;
      const cy = isMobile ? H * 0.68 : H * 0.52;
      const rx = isMobile ? W * 0.44 : W * 0.40;
      const ry = isMobile ? H * 0.16 : H * 0.32;

      const els = stage.querySelectorAll(".bloom");
      els.forEach((el, i) => {
        const a     = offsets[i] + angleRef.current;
        const x     = cx + rx * Math.cos(a);
        const y     = cy + ry * Math.sin(a);

        const depth = Math.sin(a);
        const t     = (depth + 1) / 2;

        const baseSize = (isMobile ? (90 + 110 * t) : (96 + 144 * t)) * (ORBIT_PRODUCTS[i].scale || 1);
        const blur     = (1 - t) * (isMobile ? 4 : 7);
        const bright   = 0.35 + 0.65 * t;
        const opac     = isMobile ? (0.08 + 0.34 * t) : (0.10 + 0.50 * t);

        const scaleVal = isMobile
          ? (0.55 + 0.45 * Math.sin(t * Math.PI * 0.82))
          : (0.4 + 0.85 * Math.sin(t * Math.PI * 0.82));

        const z = depth > 0.25
          ? 20 + Math.round(t * 12)
          : Math.round(t * 8);

        const shadow = depth > 0.1
          ? `0 ${(10 * t).toFixed(0)}px ${(30 * t).toFixed(0)}px rgba(0,0,0,0.40),` +
            `0 0 0 ${(2.5 * t).toFixed(1)}px rgba(139,92,246,0.22)`
          : "none";

        const border = t > 0.5
          ? `${(2.2 * t).toFixed(1)}px solid rgba(139,92,246,0.28)`
          : "none";

        Object.assign(el.style, {
          left:      `${x.toFixed(1)}px`,
          top:       `${y.toFixed(1)}px`,
          width:     `${baseSize.toFixed(0)}px`,
          height:    `${baseSize.toFixed(0)}px`,
          filter:    `blur(${blur.toFixed(1)}px) brightness(${bright.toFixed(2)})`,
          opacity:   opac.toFixed(2),
          zIndex:    z,
          boxShadow: shadow,
          border,
          transform: `translate(-50%, -50%) scale(${scaleVal.toFixed(3)})`,
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

  return (
    <section
      id="top"
      className="relative overflow-hidden z-30"
      style={{
        minHeight: "clamp(520px, 78vh, 720px)",
        background:
          "linear-gradient(135deg, #0b0015 0%, #130028 28%, #0d0020 55%, #08000f 100%)",
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
            opacity: 0.22,
          }}
        />
      </div>

      {/* ── Ambient colour blobs ─────────────────────────────────────────── */}
      <div ref={blob1} aria-hidden="true" className="absolute rounded-full pointer-events-none"
        style={{ width: 640, height: 640, top: -200, right: -180,
          background: "radial-gradient(circle, rgba(139,92,246,0.26) 0%, transparent 70%)" }} />
      <div ref={blob2} aria-hidden="true" className="absolute rounded-full pointer-events-none"
        style={{ width: 560, height: 560, bottom: -160, left: -140,
          background: "radial-gradient(circle, rgba(109,40,217,0.16) 0%, transparent 70%)" }} />
      <div ref={blob3} aria-hidden="true" className="absolute rounded-full pointer-events-none"
        style={{ width: 380, height: 380, top: "40%", left: "40%",
          background: "radial-gradient(circle, rgba(201,164,74,0.10) 0%, transparent 70%)" }} />

      {/* ── Orbit ring (decorative ellipse guide) ───────────────────────── */}
      <div aria-hidden="true" className="absolute pointer-events-none"
        style={{
          left: "54%", top: "52%",
          width: "80%", height: "64%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: "1px solid rgba(139,92,246,0.20)",
          boxShadow: "0 0 80px rgba(139,92,246,0.10), inset 0 0 80px rgba(139,92,246,0.05)",
        }}
      />
      <div aria-hidden="true" className="absolute pointer-events-none"
        style={{
          left: "54%", top: "52%",
          width: "74%", height: "58%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: "1px solid rgba(201,164,74,0.08)",
        }}
      />

      {/* ── Product orbit stage ─────────────────────────────────────────── */}
      <div
        ref={stageRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      >
        {ORBIT_PRODUCTS.map((p, i) => (
          <div
            key={i}
            className="bloom absolute"
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              willChange: "transform, filter, opacity",
              transform: "translate(-50%, -50%)",
            }}
          >
            <img
              src={p.src}
              alt={p.alt}
              className="w-full h-full object-cover block"
              draggable={false}
              loading="eager"
            />
          </div>
        ))}
      </div>

      {/* ── LEFT: text content ── */}
      <Container
        className="relative flex items-start md:items-center pt-8 md:pt-0"
        style={{
          zIndex: 15,
          minHeight: "calc(78vh - clamp(72px, 8vw, 86px))",
          paddingBottom: "clamp(30px, 4vw, 44px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease }}
          className="flex flex-col"
          style={{ gap: "clamp(18px, 2.8vw, 28px)", maxWidth: 560 }}
        >


          {/* Headline */}
          <h1
            className="font-sans font-bold text-white"
            style={{
              fontSize: "clamp(34px, 5.2vw, 68px)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
            }}
          >
            Premium Products{" "}
            <em
              className="not-italic"
              style={{
                fontStyle: "italic",
                background: "linear-gradient(90deg, #A78BFA, #C9A44A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Designed
            </em>{" "}
            For Modern Living.
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontSize: "clamp(14px, 1.6vw, 17px)",
              color: "rgba(255,255,255,0.55)",
              fontWeight: 300,
              lineHeight: 1.82,
              maxWidth: 440,
            }}
          >
            Explore thousands of carefully selected products from trusted brands worldwide. Luxury shopping, reimagined.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 font-bold text-white rounded-full transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
                fontSize: 12.5,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "14px 30px",
                boxShadow: "0 8px 28px rgba(139,92,246,0.45), 0 0 0 1px rgba(139,92,246,0.3)",
              }}
            >
              <FiShoppingBag size={14} />
              Shop Now
            </motion.button>
          </div>

        </motion.div>
      </Container>
    </section>
  );
}
