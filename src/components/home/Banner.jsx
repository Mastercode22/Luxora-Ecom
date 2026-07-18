import { motion } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import CloudinaryImage from "../ui/CloudinaryImage";

const ease = [0.22, 1, 0.36, 1];

const promos = [
  {
    eyebrow: "Corporate Gifting",
    title: ["Client gifts that open doors,", "not just boxes."],
    description:
      "Bespoke hampers, branded packaging and white-glove delivery for teams who care about every detail.",
    cta: "Explore Corporate",
    details: ["Custom branding & packaging", "Bulk order discounts", "Dedicated account manager"],
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab0?q=80&w=1000&auto=format&fit=crop",
    reverse: false,
  },
  {
    eyebrow: "The Bridal Edit",
    title: ["For the day you'll replay", "a hundred times."],
    description:
      "From bridesmaid proposal boxes to reception centerpieces, styled to match your palette exactly.",
    cta: "Shop Wedding Gifts",
    details: ["Bespoke colour palettes", "Trial styling sessions", "Same-day delivery available"],
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1000&auto=format&fit=crop",
    reverse: true,
  },
];

export default function Banner() {
  return (
    <section className="section-pad bg-warm">
      {promos.map((promo, i) => (
        <Container key={i} id={i === 0 ? "corporate" : undefined}
          className={i > 0 ? "mt-24 md:mt-32 lg:mt-40" : ""}>
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 items-center ${promo.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
            style={{ gap: "clamp(40px, 6vw, 88px)" }}
          >
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.88, ease }}
              className="relative overflow-hidden"
              style={{
                borderRadius: 32,
                height: "clamp(300px, 38vw, 500px)",
                boxShadow: "0 32px 80px -16px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.07)",
              }}
            >
              <CloudinaryImage src={promo.image} alt="" aspect="h-full" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.38) 0%, transparent 55%)" }} />
              {/* Eyebrow pill on image */}
              <div className="absolute bottom-5 left-5">
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "6px 14px", borderRadius: 99,
                  background: "rgba(255,255,255,0.14)", backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.88)",
                }}>
                  ✦ {promo.eyebrow}
                </span>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: promo.reverse ? -28 : 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, delay: 0.12, ease }}
              className="flex flex-col"
              style={{ gap: 24, maxWidth: 500 }}
            >
              <span className="eyebrow">{promo.eyebrow}</span>

              <h3 className="font-sans font-bold text-ink"
                style={{ fontSize: "clamp(26px, 3.4vw, 42px)", lineHeight: 1.1, letterSpacing: "-0.024em" }}>
                {promo.title.map((line, li) => (
                  <span key={li} className="block">{line}</span>
                ))}
              </h3>

              <p className="text-muted font-light"
                style={{ fontSize: "clamp(13.5px, 1.6vw, 15.5px)", lineHeight: 1.84 }}>
                {promo.description}
              </p>

              {/* Feature list */}
              <ul className="flex flex-col gap-2.5">
                {promo.details.map((d) => (
                  <li key={d} className="flex items-center gap-3" style={{ fontSize: 13.5, color: "var(--color-text-secondary)" }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                      background: "rgba(233,30,99,0.10)", display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-primary)" }} />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>

              <div className="pt-1">
                <Button variant="primary">{promo.cta}</Button>
              </div>
            </motion.div>
          </div>
        </Container>
      ))}
    </section>
  );
}
