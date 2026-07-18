import { useEffect, useState } from "react";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";
import ProductCard from "./ProductCard";
import { ProductCardSkeleton } from "../ui/Skeleton";
import { products } from "../../data/products";
import { motion } from "framer-motion";

export default function FeaturedProducts() {
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const displayed = showAll ? products : products.slice(0, 6);

  return (
    <section id="shop" className="section-pad bg-section">
      <Container className="flex flex-col gap-12 md:gap-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionTitle
            eyebrow="Featured Collection"
            title="This season's most-loved gifts"
            description="A rotating edit of our finest arrangements, hampers and keepsakes."
            align="left"
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0 self-start sm:self-auto"
          >
            <Button variant="outline" onClick={() => setShowAll((v) => !v)}>
              {showAll ? "Show Less" : "View All Products"}
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : displayed.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </Container>
    </section>
  );
}
