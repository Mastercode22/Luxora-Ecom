import { useEffect, useState } from "react";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";
import ProductCard from "./ProductCard";
import { ProductCardSkeleton } from "../ui/Skeleton";
import { products } from "../../data/products";
import { motion } from "framer-motion";
const TABS = ["All", "Electronics", "Fashion", "Beauty", "Home", "Sports"];
export default function FeaturedProducts() {
  
const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);
  const filtered = activeTab === "All" ? products : products.filter(p => p.category === activeTab);
  const displayed = showAll ? filtered : filtered.slice(0, 6);
  return <section id="shop" className="section-pad bg-section">
      <Container className="flex flex-col gap-10 md:gap-14">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionTitle eyebrow={"Featured Products"} title={"Handpicked for You"} description="Discover our curated selection of trending products from the world's top brands." align="left" />
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }} className="shrink-0 self-start sm:self-auto">
            <Button variant="outline" onClick={() => setShowAll(v => !v)}>
              {showAll ? "Show Less" : "View All Products"}
            </Button>
          </motion.div>
        </div>

        {/* Category filter tabs */}
        <motion.div initial={{
        opacity: 0,
        y: 12
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }} className="flex flex-wrap gap-2">
          {TABS.map(tab => <button key={tab} onClick={() => {
          setActiveTab(tab);
          setShowAll(false);
        }} className="transition-all duration-300" style={{
          padding: "7px 18px",
          borderRadius: 99,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.04em",
          border: "1px solid",
          borderColor: activeTab === tab ? "var(--color-primary)" : "var(--color-border)",
          background: activeTab === tab ? "var(--color-primary)" : "transparent",
          color: activeTab === tab ? "#fff" : "var(--color-text-secondary)",
          cursor: "pointer"
        }}>
              {tab}
            </button>)}
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {loading ? Array.from({
          length: 6
        }).map((_, i) => <ProductCardSkeleton key={i} />) : displayed.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </Container>
    </section>;
}