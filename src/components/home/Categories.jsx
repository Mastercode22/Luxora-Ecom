import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import CloudinaryImage from "../ui/CloudinaryImage";
import { categories } from "../../data/categories";

export default function Categories() {
  return (
    <section id="occasions" className="section-pad bg-surface">
      <Container className="flex flex-col gap-14">
        <SectionTitle
          eyebrow="Shop by Occasion"
          title="Find the perfect category"
          description="Every category is styled by our in-house florists and gift curators."
        />

        <Swiper
          modules={[FreeMode]}
          freeMode
          spaceBetween={20}
          slidesPerView={1.8}
          breakpoints={{
            480: { slidesPerView: 2.4, spaceBetween: 24 },
            768: { slidesPerView: 3.5, spaceBetween: 32 },
            1024: { slidesPerView: 4.5, spaceBetween: 40 },
          }}
          className="pb-8"
        >
          {categories.map((cat, i) => (
            <SwiperSlide key={cat.id}>
              <motion.a
                href="#"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col items-center gap-5 text-center w-full"
              >
                <div className="relative w-full">
                  {/* Decorative Border ring */}
                  <div className="absolute -inset-2 rounded-t-full rounded-b-[40px] border border-line/0 group-hover:border-primary/20 scale-[0.98] group-hover:scale-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                  
                  {/* Image Arch Container */}
                  <div
                    className="w-full aspect-[3/4] rounded-t-full rounded-b-[32px] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2"
                    style={{
                      boxShadow: "0 12px 32px -8px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <CloudinaryImage
                      src={cat.image}
                      alt={cat.name}
                      aspect="h-full"
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-1 items-center">
                  <span className="text-[14px] md:text-[15px] font-bold text-ink group-hover:text-primary transition-colors duration-500 tracking-wide">
                    {cat.name}
                  </span>
                  <span className="text-[11px] font-serif italic text-muted group-hover:text-primary/70 transition-colors duration-500">
                    Explore collection
                  </span>
                </div>
              </motion.a>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
