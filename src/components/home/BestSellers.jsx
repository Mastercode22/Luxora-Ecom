import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ProductCard from "./ProductCard";
import { ProductCardSkeleton } from "../ui/Skeleton";
import { bestSellers } from "../../data/products";

export default function BestSellers() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="section-pad bg-surface">
      <Container className="flex flex-col gap-12 md:gap-14">
        <SectionTitle
          eyebrow="Most Popular"
          title="Trending Products"
          description="Our highest-rated, most-purchased products — loved by thousands of shoppers worldwide."
        />

        {/* Mobile: swipeable */}
        <div className="lg:hidden">
          <Swiper
            modules={[FreeMode]}
            freeMode
            spaceBetween={16}
            slidesPerView={1.2}
            breakpoints={{
              480: { slidesPerView: 1.8, spaceBetween: 20 },
              640: { slidesPerView: 2.4, spaceBetween: 24 },
            }}
            className="!overflow-visible"
          >
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <SwiperSlide key={i}><ProductCardSkeleton /></SwiperSlide>
                ))
              : bestSellers.map((p, i) => (
                  <SwiperSlide key={p.id}><ProductCard product={p} index={i} /></SwiperSlide>
                ))}
          </Swiper>
        </div>

        {/* Desktop: grid */}
        <div className="hidden lg:grid grid-cols-3 xl:grid-cols-6 gap-6 xl:gap-7">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : bestSellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </Container>
    </section>
  );
}
