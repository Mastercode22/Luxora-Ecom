import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FiTruck, FiStar, FiGift } from "react-icons/fi";

const messages = [
  { icon: "🚚", text: "Free shipping on orders over $75 — worldwide delivery available" },
  { icon: "⭐", text: "Rated 4.9/5 by over 50,000 satisfied customers globally" },
  { icon: "⚡", text: "Flash sale — up to 40% off electronics, fashion & beauty" },
  { icon: "📦", text: "New arrivals added every week from top global brands" },
];

export default function AnnouncementBar() {
  return (
    <div
      className="relative z-50 bg-ink text-white text-[11px] md:text-[12px] tracking-[0.1em] uppercase font-medium"
      style={{ background: "linear-gradient(90deg, var(--color-text-primary) 0%, #2A1A1A 50%, var(--color-text-primary) 100%)" }}
    >
      <div className="mx-auto max-w-content px-6 md:px-10">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          slidesPerView={1}
          className="h-10"
        >
          {messages.map((msg, i) => (
            <SwiperSlide key={i} className="flex items-center justify-center">
              <p className="text-center flex items-center justify-center gap-2 text-white/80">
                <span className="text-[14px]">{msg.icon}</span>
                <span>{msg.text}</span>
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
