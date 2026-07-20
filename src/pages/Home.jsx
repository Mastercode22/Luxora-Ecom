import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import FeaturedProducts from "../components/home/FeaturedProducts";
import CategoryShowcase from "../components/home/CategoryShowcase";
import BestSellers from "../components/home/BestSellers";
import Banner from "../components/home/Banner";
import SpecialOffers from "../components/home/SpecialOffers";
import FullWidthBanner from "../components/home/FullWidthBanner";
import Testimonials from "../components/home/Testimonials";
import InstagramGallery from "../components/home/InstagramGallery";
import Newsletter from "../components/home/Newsletter";
import WaveDivider from "../components/ui/ZigZagDivider";

export default function Home() {
  return (
    <>
      {/* 1. Hero — full-bleed product orbit */}
      <Hero />
      <WaveDivider
        upperColor="var(--color-surface)"
        lowerColor="var(--color-section)"
      />

      {/* 2. Featured Products with category filters */}
      <FeaturedProducts />
      <WaveDivider
        upperColor="var(--color-section)"
        lowerColor="var(--color-surface)"
      />

      {/* 3. Shop By Category */}
      <CategoryShowcase />
      <WaveDivider
        upperColor="var(--color-surface)"
        lowerColor="var(--color-bg)"
      />

      {/* 4. Trending / Best Sellers */}
      <BestSellers />
      <WaveDivider
        upperColor="var(--color-surface)"
        lowerColor="var(--color-bg)"
      />

      {/* 5. Deals Countdown Banner */}
      <Banner />
      <WaveDivider
        upperColor="var(--color-bg)"
        lowerColor="var(--color-surface)"
      />

      {/* 6. New Arrivals */}
      <SpecialOffers />
      <WaveDivider
        upperColor="var(--color-surface)"
        lowerColor="#1a1a1a"
      />

      {/* 7. Full-width parallax CTA */}
      <FullWidthBanner />
      <WaveDivider
        upperColor="#1a1a1a"
        lowerColor="var(--color-section)"
      />

      {/* 8. Testimonials */}
      <Testimonials />
      <WaveDivider
        upperColor="var(--color-surface)"
        lowerColor="var(--color-section)"
      />

      {/* 9. Lifestyle Gallery */}
      <InstagramGallery />
      <WaveDivider
        upperColor="var(--color-section)"
        lowerColor="var(--color-surface)"
      />

      {/* 10. Newsletter */}
      <Newsletter />
      <WaveDivider
        upperColor="var(--color-surface)"
        lowerColor="var(--color-section)"
      />

      {/* 11. Why Luxora — right before footer */}
      <Features />
    </>
  );
}
