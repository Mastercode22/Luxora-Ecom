import { motion } from "framer-motion";
import { FiTruck, FiShield, FiRefreshCw, FiHeadphones } from "react-icons/fi";
import Container from "../ui/Container";

const ease = [0.22, 1, 0.36, 1];

const FEATURES = [
  { Icon: FiTruck,       emoji: "🚚", title: "Free Delivery",    description: "Complimentary shipping on every order over GHS 500, nationwide.", stat: "Same-day available" },
  { Icon: FiShield,      emoji: "🔒", title: "Secure Payments",  description: "Every transaction is encrypted and PCI-compliant, end to end.",   stat: "256-bit SSL"       },
  { Icon: FiRefreshCw,   emoji: "↩️", title: "Easy Returns",     description: "Not quite right? Free returns within 14 days, no questions asked.", stat: "14-day window"    },
  { Icon: FiHeadphones,  emoji: "💬", title: "Premium Support",  description: "A dedicated concierge team, available seven days a week.",          stat: "7 days a week"    },
];

export default function Features() {
  return (
    <section className="section-pad bg-section">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "clamp(16px, 2vw, 24px)" }}>
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function FeatureCard({ Icon, emoji, title, description, stat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.62, delay: index * 0.09, ease }}
      className="group bg-surface flex flex-col"
      style={{
        borderRadius: 24,
        padding: "28px 26px 26px",
        transition: "transform 480ms cubic-bezier(0.22,1,0.36,1), box-shadow 480ms cubic-bezier(0.22,1,0.36,1)",
        boxShadow: "0 0 0 1px rgba(20,16,18,.038), 0 1px 3px rgba(20,16,18,.026), 0 8px 22px -12px rgba(20,16,18,.07)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-7px)";
        e.currentTarget.style.boxShadow = "0 0 0 1px rgba(233,30,99,.07), 0 4px 10px rgba(20,16,18,.04), 0 24px 56px -16px rgba(20,16,18,.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 0 0 1px rgba(20,16,18,.038), 0 1px 3px rgba(20,16,18,.026), 0 8px 22px -12px rgba(20,16,18,.07)";
      }}
    >
      {/* Icon circle */}
      <div
        className="flex items-center justify-center mb-6"
        style={{
          width: 54, height: 54, borderRadius: "50%",
          background: "var(--color-surface)",
          transition: "background 400ms ease, transform 400ms cubic-bezier(0.34,1.56,0.64,1)",
        }}
        ref={(el) => {
          if (!el) return;
          el.closest(".group")?.addEventListener("mouseenter", () => {
            el.style.background = "var(--color-primary)";
            el.style.transform = "scale(1.12) rotate(6deg)";
            el.querySelector("svg") && (el.querySelector("svg").style.color = "#fff");
          });
          el.closest(".group")?.addEventListener("mouseleave", () => {
            el.style.background = "var(--color-surface)";
            el.style.transform = "scale(1) rotate(0deg)";
            el.querySelector("svg") && (el.querySelector("svg").style.color = "var(--color-primary)");
          });
        }}
      >
        <Icon size={22} style={{ color: "var(--color-primary)", transition: "color 300ms ease" }} />
      </div>

      <h3 className="font-semibold text-ink mb-2" style={{ fontSize: 16, letterSpacing: "-0.005em" }}>
        {title}
      </h3>
      <p className="text-muted font-light flex-1" style={{ fontSize: 13, lineHeight: 1.82 }}>
        {description}
      </p>

      {/* Stat chip */}
      <div className="mt-6">
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 12px", borderRadius: 99,
          background: "rgba(233,30,99,0.08)",
          fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-primary)",
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--color-primary)" }} />
          {stat}
        </span>
      </div>
    </motion.div>
  );
}
