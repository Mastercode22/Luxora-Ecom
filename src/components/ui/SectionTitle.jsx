import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

/**
 * Premium SectionTitle
 * align: "center" | "left"
 * light: boolean — inverts color for dark backgrounds
 * maxW:  optional max-width override for the text block
 */
export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  maxW = 600,
}) {
  const centered = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-56px" }}
      transition={{ duration: 0.72, ease }}
      style={{ maxWidth: maxW }}
      className={`flex flex-col ${centered ? "items-center text-center mx-auto" : "items-start text-left"}`}
    >
      {eyebrow && (
        <div
          className={`flex items-center mb-4 ${centered ? "justify-center" : ""}`}
          style={{ gap: 12 }}
        >
          {/* Side rule */}
          <span style={{ display: "block", width: 22, height: 1.5, borderRadius: 99, background: light ? "rgba(255,209,230,0.55)" : "rgba(233,30,99,0.40)", flexShrink: 0 }} />

          <span
            className="eyebrow-lg"
            style={{ color: light ? "#FFD1E6" : undefined }}
          >
            {eyebrow}
          </span>

          <span style={{ display: "block", width: 22, height: 1.5, borderRadius: 99, background: light ? "rgba(255,209,230,0.55)" : "rgba(233,30,99,0.40)", flexShrink: 0 }} />
        </div>
      )}

      <h2
        className="font-sans font-semibold"
        style={{
          fontSize: "clamp(26px, 3.8vw, 42px)",
          lineHeight: 1.11,
          letterSpacing: "-0.022em",
          color: light ? "var(--color-bg)" : "var(--color-text-primary)",
          marginBottom: description ? 16 : 0,
        }}
      >
        {title}
      </h2>

      {description && (
        <p
          className="font-light"
          style={{
            fontSize: "clamp(14px, 1.7vw, 15.5px)",
            lineHeight: 1.84,
            color: light ? "rgba(255,255,255,0.60)" : "var(--color-text-muted)",
          }}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
