import { motion } from "framer-motion";
import { FiTruck, FiShield, FiRefreshCw, FiStar } from "react-icons/fi";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const ease = [0.22, 1, 0.36, 1];

const FEATURES = [
  {
    Icon: FiTruck,
    emoji: "🚚",
    title: "Lightning Delivery",
    description: "Same-day delivery available in select cities. Standard orders dispatched within 24 hours.",
    stat: "Same-day available",
  },
  {
    Icon: FiShield,
    emoji: "🔒",
    title: "Secure Payments",
    description: "Bank-grade 256-bit SSL encryption on every transaction. Shop with total confidence.",
    stat: "256-bit SSL",
  },
  {
    Icon: FiStar,
    emoji: "✅",
    title: "Premium Quality",
    description: "Every product is verified for authenticity and meets our strict premium quality standards.",
    stat: "Verified Authentic",
  },
  {
    Icon: FiRefreshCw,
    emoji: "↩️",
    title: "Easy Returns",
    description: "Not satisfied? Hassle-free returns within 30 days. No questions asked.",
    stat: "30-day window",
  },
];

export default function Features() {
  return (
    <section className="bg-section" style={{ paddingBlock: "clamp(36px, 5vw, 64px)" }}>
      <Container className="flex flex-col gap-8 md:gap-10">
        <SectionTitle
          eyebrow="Why Luxora"
          title="The Smarter Way to Shop"
          description="We've built a premium shopping experience around what matters most to you."
        />
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: "clamp(16px, 2vw, 24px)" }}
        >
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function FeatureCard({ Icon, title, description, stat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.62, delay: index * 0.09, ease }}
      className="group bg-surface flex flex-col"
      style={{
        borderRadius: 24,
        padding: "18px 18px 16px",
        transition: "transform 480ms cubic-bezier(0.22,1,0.36,1), box-shadow 480ms cubic-bezier(0.22,1,0.36,1)",
        boxShadow: "0 0 0 1px rgba(20,16,18,.038), 0 1px 3px rgba(20,16,18,.026), 0 8px 22px -12px rgba(20,16,18,.07)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-7px)";
        e.currentTarget.style.boxShadow =
          "0 0 0 1px rgba(124,58,237,.10), 0 4px 10px rgba(20,16,18,.04), 0 24px 56px -16px rgba(124,58,237,.14)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 0 0 1px rgba(20,16,18,.038), 0 1px 3px rgba(20,16,18,.026), 0 8px 22px -12px rgba(20,16,18,.07)";
      }}
    >
      {/* Icon circle */}
      <div
        className="flex items-center justify-center mb-4"
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "rgba(124,58,237,0.08)",
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
            el.style.background = "rgba(124,58,237,0.08)";
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
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 12px",
            borderRadius: 99,
            background: "rgba(124,58,237,0.07)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-primary)",
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--color-primary)" }} />
          {stat}
        </span>
      </div>
    </motion.div>
  );
}
