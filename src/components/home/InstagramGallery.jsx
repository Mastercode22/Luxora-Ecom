import { motion } from "framer-motion";
import { FiInstagram } from "react-icons/fi";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import CloudinaryImage from "../ui/CloudinaryImage";

const ease = [0.22, 1, 0.36, 1];

const POSTS = [
  "https://images.unsplash.com/photo-1487070183336-b863922373d4?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1548907040-4baa419e3b1c?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1602874801007-bd36c0c48f2f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop",
];

export default function InstagramGallery() {
  return (
    <section className="section-pad bg-section">
      <Container className="flex flex-col" style={{ gap: "clamp(36px, 4.5vw, 52px)" }}>
        <SectionTitle
          eyebrow="@luxoragifts"
          title="Follow the studio"
          description="Behind-the-scenes styling, new arrivals and gifting inspiration."
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
              aria-label={`Instagram post ${i + 1}`}
              initial={{ opacity: 0, scale: 0.90 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.50, delay: i * 0.06, ease }}
              className="group relative block aspect-square overflow-hidden"
              style={{
                borderRadius: "clamp(12px, 1.5vw, 18px)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <CloudinaryImage src={src} alt="" aspect="h-full" />

              {/* Hover overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2
                bg-ink/0 group-hover:bg-ink/48 transition-all duration-350"
                style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}>
                <FiInstagram
                  size={20}
                  className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
                  style={{ transitionDelay: "50ms" }}
                />
                <span className="text-white font-bold uppercase opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ fontSize: 9.5, letterSpacing: "0.12em", transitionDelay: "80ms" }}>
                  View Post
                </span>
              </div>

              {/* Bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-350"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.28) 0%, transparent 100%)", transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }} />
            </motion.a>
          ))}
        </div>

        {/* Follow CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.25, ease }}
          className="flex justify-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-line hover:border-primary hover:text-primary transition-all duration-300 hover:-translate-y-0.5"
            style={{ borderRadius: 99, padding: "11px 24px", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-secondary)" }}
          >
            <FiInstagram size={13} />
            Follow @luxoragifts
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
