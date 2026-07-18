import Hero from "../components/home/Hero";
import FeaturedProducts from "../components/home/FeaturedProducts";
import BestSellers from "../components/home/BestSellers";
import Banner from "../components/home/Banner";
import SpecialOffers from "../components/home/SpecialOffers";
import FlowerShowcase from "../components/home/FlowerShowcase";
import FullWidthBanner from "../components/home/FullWidthBanner";
import Features from "../components/home/Features";
import Testimonials from "../components/home/Testimonials";
import InstagramGallery from "../components/home/InstagramGallery";
import Newsletter from "../components/home/Newsletter";
import WaveDivider from "../components/ui/ZigZagDivider";


export default function Home() {
  return (
    <>
      <Hero />
      <WaveDivider
        upperColor="var(--color-surface)"
        lowerColor="var(--color-section)"
      />

      <FeaturedProducts />
      <WaveDivider
        upperColor="var(--color-section)"
        lowerColor="var(--color-surface)"
      />

      <BestSellers />
      <WaveDivider
        upperColor="var(--color-surface)"
        lowerColor="var(--color-bg)"
      />

      <Banner />
      <WaveDivider
        upperColor="var(--color-bg)"
        lowerColor="#141414"
      />

      <SpecialOffers />
      <WaveDivider
        upperColor="#141414"
        lowerColor="var(--color-surface)"
      />

      <FlowerShowcase />
      <WaveDivider
        upperColor="var(--color-surface)"
        lowerColor="#1a1a1a"
      />

      <FullWidthBanner />
      <WaveDivider
        upperColor="#1a1a1a"
        lowerColor="var(--color-section)"
      />

      <Features />
      <WaveDivider
        upperColor="var(--color-section)"
        lowerColor="var(--color-surface)"
      />

      <Testimonials />
      <WaveDivider
        upperColor="var(--color-surface)"
        lowerColor="var(--color-section)"
      />

      <InstagramGallery />
      <WaveDivider
        upperColor="var(--color-section)"
        lowerColor="var(--color-surface)"
      />

      <Newsletter />
    </>
  );
}
