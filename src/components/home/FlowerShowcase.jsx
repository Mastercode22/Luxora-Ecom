import { motion } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import CloudinaryImage from "../ui/CloudinaryImage";
const ease = [0.22, 1, 0.36, 1];
const PETALS = Array.from({
  length: 14
});
const QUALITIES = [{
  icon: "🌱",
  label: "Farm-direct sourcing",
  sub: "From growers we know by name"
}, {
  icon: "🕐",
  label: "Finished day of delivery",
  sub: "Never held in cold storage"
}, {
  icon: "✅",
  label: "7-day freshness guarantee",
  sub: "Or we'll replace it, free"
}, {
  icon: "💧",
  label: "Hydration-sealed bundles",
  sub: "Preserved for travel"
}];
export default function FlowerShowcase() {
  
return <section id="about" className="section-pad overflow-hidden bg-flower-showcase">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{
        gap: "clamp(40px, 6vw, 96px)"
      }}>
          {/* ── Image column ── */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.93,
          y: 20
        }} whileInView={{
          opacity: 1,
          scale: 1,
          y: 0
        }} viewport={{
          once: true,
          margin: "-80px"
        }} transition={{
          duration: 0.92,
          ease
        }} className="relative" style={{
          height: "clamp(340px, 48vw, 580px)"
        }}>
            {/* Ambient glow */}
            <div className="absolute -inset-10 blur-3xl pointer-events-none" style={{
            background: "radial-gradient(circle, rgba(233,30,99,0.13) 0%, transparent 68%)"
          }} />

            <div className="relative h-full overflow-hidden" style={{
            borderRadius: 36,
            boxShadow: "0 44px 96px -22px rgba(0,0,0,0.18), 0 14px 36px rgba(0,0,0,0.08)"
          }}>
              <CloudinaryImage src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?q=80&w=1200&auto=format&fit=crop" alt="Luxury Rose Bou" aspect="h-full" priority />
              <div className="absolute inset-0" style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 50%)"
            }} />

              {/* Falling petals */}
              {PETALS.map((_, i) => <motion.span key={i} className="absolute pointer-events-none" style={{
              width: 6 + i % 5,
              height: 6 + i % 5,
              borderRadius: "50% 30% 60% 40%",
              left: `${(i * 23 + 6) % 96}%`,
              top: "-4%",
              background: i % 2 === 0 ? "rgba(255,255,255,0.82)" : "rgba(255,209,230,0.90)"
            }} animate={{
              y: ["0%", "650%"],
              x: [0, i % 2 ? 22 : -22, 0],
              opacity: [0, 0.88, 0],
              rotate: [0, i % 2 ? 200 : -200]
            }} transition={{
              duration: 7 + i % 4,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut"
            }} />)}
            </div>

            {/* Floating "Freshness" card */}
            <motion.div initial={{
            opacity: 0,
            y: 18
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.65,
            duration: 0.7,
            ease
          }} className="card-glass absolute" style={{
            bottom: -18,
            right: -10,
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: 12
          }}>
              <div style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(233,30,99,0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              flexShrink: 0
            }}>{"auto__365"}</div>
              <div>
                <p style={{
                fontSize: 11,
                fontWeight: 700,
                color: "var(--color-text-primary)"
              }}>Freshness Certi</p>
                <p style={{
                fontSize: 10.5,
                color: "var(--color-text-muted)",
                marginTop: 2
              }}>Sourced This Mo</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Text column ── */}
          <motion.div initial={{
          opacity: 0,
          x: 28
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true,
          margin: "-80px"
        }} transition={{
          duration: 0.80,
          delay: 0.14,
          ease
        }} className="flex flex-col" style={{
          gap: 28
        }}>
            <div className="flex flex-col" style={{
            gap: 14
          }}>
              <span className="eyebrow">The Flower Atel</span>
              <h2 className="font-sans font-bold text-ink" style={{
              fontSize: "clamp(26px, 3.6vw, 44px)",
              lineHeight: 1.09,
              letterSpacing: "-0.025em"
            }}>"Blooms Sourced"{" "}
                <em className="font-serif font-normal text-primary not-italic" style={{
                fontStyle: "italic"
              }}>Arranged By Han</em>{" "}"Before Noon"</h2>
              <p className="text-muted font-light" style={{
              fontSize: "clamp(13.5px, 1.6vw, 15.5px)",
              lineHeight: 1.86
            }}>We Work Directl</p>
            </div>

            {/* Quality feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{
            gap: 12
          }}>
              {QUALITIES.map((q, i) => <motion.div key={q.label} initial={{
              opacity: 0,
              y: 14
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.28 + i * 0.07,
              duration: 0.52,
              ease
            }} className="flex items-start gap-3 bg-surface/72 hover:bg-surface transition-colors duration-300" style={{
              padding: "14px 16px",
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.85)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
            }}>
                  <span style={{
                fontSize: 20,
                marginTop: 1,
                flexShrink: 0
              }}>{q.icon}</span>
                  <div>
                    <p style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--color-text-primary)"
                }}>{q.label}</p>
                    <p style={{
                  fontSize: 11.5,
                  color: "var(--color-text-muted)",
                  marginTop: 2
                }}>{q.sub}</p>
                  </div>
                </motion.div>)}
            </div>

            <Button variant="primary">Shop Flowers</Button>
          </motion.div>
        </div>
      </Container>
    </section>;
}