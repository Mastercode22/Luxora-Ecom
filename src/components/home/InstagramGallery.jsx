import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import CloudinaryImage from "../ui/CloudinaryImage";

const ease = [0.22, 1, 0.36, 1];

const POSTS = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
];

const LABELS = ["Fashion", "Tech", "Beauty", "Sport", "Bags", "Audio"];

export default function InstagramGallery() {
  return (
    <section className="section-pad bg-section">
      <Container className="flex flex-col" style={{ gap: "clamp(36px, 4.5vw, 52px)" }}>
        <SectionTitle
          eyebrow="Lifestyle & Style"
          title="Live The Premium Life"
          description="Real people. Real products. Discover how Luxora customers style their world."
        />

        {/* Grid */}
        <div
          className="grid grid-cols-3 lg:grid-cols-6"
          style={{ gap: "clamp(8px, 1.2vw, 14px)" }}
        >
          {POSTS.map((src, i) => (
            <motion.a
              key={i}
              href="#"
              aria-label={`${LABELS[i]} lifestyle post ${i + 1}`}
              initial={{ opacity: 0, scale: 0.90 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.50, delay: i * 0.06, ease }}
              className="group relative block aspect-square overflow-hidden"
              style={{
                borderRadius: "clamp(12px, 1.5vw, 18px)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <CloudinaryImage src={src} alt={LABELS[i]} aspect="h-full" />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2
                  bg-ink/0 group-hover:bg-ink/55 transition-all duration-350"
                style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
              >
                <FiExternalLink
                  size={18}
                  className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
                  style={{ transitionDelay: "50ms" }}
                />
                <span
                  className="text-white font-bold uppercase opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ fontSize: 9.5, letterSpacing: "0.12em", transitionDelay: "80ms" }}
                >
                  {LABELS[i]}
                </span>
              </div>

              {/* Purple bottom gradient */}
              <div
                className="absolute inset-x-0 bottom-0 h-2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-350"
                style={{
                  background: "linear-gradient(to top, rgba(124,58,237,0.35) 0%, transparent 100%)",
                  transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            </motion.a>
          ))}
        </div>

        {/* Follow CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.25, ease }}
          className="flex justify-center gap-4 flex-wrap"
        >
          {["Instagram", "TikTok", "Pinterest"].map((platform) => (
            <a
              key={platform}
              href="#"
              className="inline-flex items-center gap-2 border border-line hover:border-primary hover:text-primary transition-all duration-300 hover:-translate-y-0.5"
              style={{
                borderRadius: 99,
                padding: "11px 24px",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-text-secondary)",
              }}
            >
              @luxora · {platform}
            </a>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
