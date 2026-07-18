import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import Button from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.22, 1, 0.36, 1];

export default function FullWidthBanner() {
  const sectionRef = useRef(null);
  const bgRef      = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: "clamp(360px, 50vw, 580px)" }}
    >
      {/* Parallax image */}
      <div ref={bgRef} className="absolute will-change-transform"
        style={{ inset: 0, top: "-12%", bottom: "-12%" }}>
        <img
          src="https://images.unsplash.com/photo-1502741338009-cac2772e18bc?q=80&w=1800&auto=format&fit=crop"
          alt="Luxury dark roses"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Multi-layer gradient — angled for depth */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(26,26,26,0.78) 0%, rgba(26,26,26,0.52) 50%, rgba(26,26,26,0.25) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.36) 0%, transparent 48%)" }} />

      {/* Left accent bar */}
      <div className="absolute left-0 top-16 bottom-16 w-[3px]"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-primary), transparent)", borderRadius: 99 }} />

      <Container className="relative h-full flex flex-col justify-center" style={{ maxWidth: 740, gap: 20 }}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
          className="flex items-center gap-3"
        >
          <span style={{ width: 28, height: 1, background: "rgba(255,209,230,0.65)", borderRadius: 99 }} />
          <span className="eyebrow-lg" style={{ color: "#FFD1E6" }}>Made To Remember</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.72, delay: 0.09, ease }}
          className="font-sans font-bold text-white"
          style={{ fontSize: "clamp(28px, 4.8vw, 58px)", lineHeight: 1.07, letterSpacing: "-0.028em" }}
        >
          Some gifts are opened once.{" "}
          <em className="font-serif font-normal text-accent not-italic" style={{ fontStyle: "italic" }}>
            Ours are remembered
          </em>{" "}
          for years.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.19, ease }}
          style={{ fontSize: "clamp(13.5px, 1.6vw, 15.5px)", color: "rgba(255,255,255,0.58)", fontWeight: 300, lineHeight: 1.84, maxWidth: 420 }}
        >
          Every piece we create is designed to outlast the moment — a memory made tangible.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.60, delay: 0.28, ease }}
          className="flex flex-wrap items-center gap-4 pt-1"
        >
          <Button variant="light">Discover Luxora</Button>
          <a href="#shop" className="flex items-center gap-2 hover:text-white transition-colors duration-250"
            style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.62)" }}>
            Browse Collection
            <span style={{ color: "#FFD1E6" }}>→</span>
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
