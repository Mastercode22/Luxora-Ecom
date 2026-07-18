import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FiStar } from "react-icons/fi";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import CloudinaryImage from "../ui/CloudinaryImage";
import { testimonials } from "../../data/testimonials";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export default function Testimonials() {
  return (
    <section className="section-pad bg-surface relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -right-28 -top-8 pointer-events-none"
        style={{ width: 380, height: 380, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(252,228,236,0.9) 0%, transparent 68%)",
          opacity: 0.7, filter: "blur(1px)" }} />
      <div className="absolute -left-20 bottom-0 pointer-events-none"
        style={{ width: 280, height: 280, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(233,30,99,0.14) 0%, transparent 68%)",
          opacity: 0.6, filter: "blur(2px)" }} />

      <Container className="relative flex flex-col items-center" style={{ gap: "clamp(40px, 5vw, 60px)" }}>
        <SectionTitle
          eyebrow="Kind Words"
          title="Loved by thoughtful gift-givers"
          description="Real stories from customers who chose Luxora for life's most meaningful moments."
        />

        <div style={{ width: "100%", maxWidth: 760 }}>
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5200, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".testimonial-custom-dots" }}
            loop
            className="testimonial-swiper"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.60, ease }}
                  className="flex flex-col items-center text-center"
                  style={{ gap: 24, padding: "8px 24px 8px" }}
                >
                  {/* Open-quote mark */}
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: "rgba(233,30,99,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic", fontSize: 32, color: "var(--color-primary)",
                    lineHeight: 1, paddingBottom: 6,
                  }}>
                    "
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar key={i} size={13} className="fill-current text-primary" />
                    ))}
                  </div>

                  {/* Quote text */}
                  <blockquote
                    className="font-serif italic text-ink"
                    style={{ fontSize: "clamp(17px, 2.4vw, 24px)", lineHeight: 1.68, letterSpacing: "-0.005em" }}
                  >
                    "{t.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex flex-col items-center" style={{ gap: 10 }}>
                    <div className="overflow-hidden"
                      style={{ width: 52, height: 52, borderRadius: "50%", border: "2.5px solid #fff",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.12), 0 0 0 3px rgba(233,30,99,0.10)" }}>
                      <CloudinaryImage src={t.image} alt={t.name} aspect="aspect-square" />
                    </div>
                    <div>
                      <p style={{ fontSize: 14.5, fontWeight: 700, color: "var(--color-text-primary)" }}>{t.name}</p>
                      <p style={{ fontSize: 12.5, color: "var(--color-text-muted)", marginTop: 2 }}>{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom pagination */}
          <div className="testimonial-custom-dots flex justify-center items-center gap-1 mt-10" />
        </div>
      </Container>
    </section>
  );
}
