import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ProductCard from "./ProductCard";
import { ProductCardSkeleton } from "../ui/Skeleton";
import { newArrivals } from "../../data/products";
const ease = [0.22, 1, 0.36, 1];
export default function SpecialOffers() {
  
const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);
  return <section className="section-pad bg-surface">
      <Container className="flex flex-col gap-12 md:gap-14">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionTitle eyebrow={"Just Dropped"} title={"New Arrivals"} description="The latest additions to our catalogue — fresh products from the world's leading brands." align="left" />
          <motion.a href="#shop" initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          ease
        }} className="shrink-0 self-start sm:self-auto inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5" style={{
          fontSize: 11.5,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--color-primary)",
          textDecoration: "none"
        }}>View All New<span style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "rgba(139,92,246,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11
          }}>
              →
            </span>
          </motion.a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {loading ? Array.from({
          length: 4
        }).map((_, i) => <ProductCardSkeleton key={i} />) : newArrivals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </Container>
    </section>;
}