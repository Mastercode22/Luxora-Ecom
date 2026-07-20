import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { FiStar, FiHeart } from "react-icons/fi";
import Container from "../ui/Container";
import CloudinaryImage from "../ui/CloudinaryImage";
import { testimonials } from "../../data/testimonials";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const ease = [0.22, 1, 0.36, 1];

export default function Testimonials() {
  const { theme } = useTheme();

  return (
    <AnimatePresence mode="wait">
      <motion.section 
        key={theme}
        initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="section-pad bg-background relative overflow-hidden"
      >
        {/* Global Background Handles the 3D Animation */}
        <Container className="relative z-10 flex flex-col items-center" style={{ gap: "clamp(40px, 5vw, 60px)" }}>
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
            >
              <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                <FiHeart size={14} />
                Kind Words
              </div>
              <h2 className="font-serif italic" style={{ color: "var(--color-text-primary)", fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.02em", marginBottom: 16 }}>
                Loved by thoughtful gift-givers
              </h2>
              <p className="mx-auto" style={{ color: "var(--color-text-muted)", maxWidth: 500, fontSize: "clamp(15px, 1.2vw, 17px)" }}>
                Real stories from customers who chose Luxora for life's most meaningful moments.
              </p>
            </motion.div>
          </div>

          <div className="w-full max-w-5xl mx-auto px-4 md:px-0">
            <Swiper
              modules={[Autoplay, Pagination, EffectCoverflow]}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2,
                slideShadows: false,
              }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true, el: ".testimonial-custom-dots" }}
              loop
              className="testimonial-swiper py-12"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.id} style={{ width: "100%", maxWidth: 500 }}>
                  <motion.div
                    className="bg-surface/40 backdrop-blur-2xl border border-line/60 rounded-[32px] p-8 md:p-10 flex flex-col items-center text-center relative overflow-hidden group"
                    style={{ gap: 24, boxShadow: theme === 'dark' ? "0 20px 40px -10px rgba(0,0,0,0.3)" : "0 20px 40px -10px rgba(0,0,0,0.05)" }}
                  >
                    {/* Subtle hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Open-quote mark */}
                    <div className="relative">
                      <div style={{
                        width: 56, height: 56, borderRadius: "50%",
                        background: "rgba(124,58,237,0.1)",
                        display: "flex", alignItems: "center", justifyItems: "center",
                        color: "var(--color-primary)",
                        boxShadow: "inset 0 0 0 1px rgba(124,58,237,0.2)"
                      }} className="justify-center">
                        <span className="font-serif italic text-4xl leading-none translate-y-1">"</span>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar key={i} size={15} className="fill-current text-primary" />
                      ))}
                    </div>

                    {/* Quote text */}
                    <blockquote
                      className="font-serif italic"
                      style={{ color: "var(--color-text-primary)", fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.6, letterSpacing: "0.01em" }}
                    >
                      "{t.quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex flex-col items-center mt-4" style={{ gap: 12 }}>
                      <div className="overflow-hidden relative"
                        style={{ width: 64, height: 64, borderRadius: "50%",
                          boxShadow: `0 0 0 2px var(--color-line), 0 8px 20px rgba(0,0,0,${theme === 'dark' ? '0.4' : '0.1'})` }}>
                        <CloudinaryImage src={t.image} alt={t.name} aspect="aspect-square" />
                      </div>
                      <div>
                        <p style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text-primary)", letterSpacing: "0.02em" }}>{t.name}</p>
                        <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom pagination */}
            <div className="testimonial-custom-dots flex justify-center items-center gap-2 mt-8" />
          </div>
        </Container>
      </motion.section>
    </AnimatePresence>
  );
}
