import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import { categories } from "../../data/categories";

const ease = [0.22, 1, 0.36, 1];

export default function CategoryShowcase() {
  return (
    <section id="categories" className="section-pad bg-category-section">
      <Container className="flex flex-col gap-12 md:gap-16">
        <SectionTitle
          eyebrow="Browse Categories"
          title="Shop By Category"
          description="From cutting-edge electronics to timeless fashion — explore our full universe of premium products."
        />

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-5">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CategoryCard({ category, index }) {
  return (
    <motion.a
      href={`#shop`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease }}
      className="group relative flex flex-col overflow-hidden cursor-pointer"
      style={{
        borderRadius: 24,
        aspectRatio: "3 / 4",
        boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
        textDecoration: "none",
      }}
    >
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.12) 100%)",
        }}
      />
      {/* Purple glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(to top, rgba(124,58,237,0.45) 0%, transparent 55%)",
        }}
      />

      {/* Glass top badge */}
      <div className="relative p-4 flex justify-end">
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "4px 10px",
            borderRadius: 99,
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.18)",
            fontSize: 9.5,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.80)",
          }}
        >
          {category.count}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2.5">
        <h3
          style={{
            fontSize: "clamp(15px, 1.8vw, 18px)",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
          }}
        >
          {category.name}
        </h3>

        {/* Explore button — slides up on hover */}
        <div
          className="overflow-hidden transition-all duration-400"
          style={{
            maxHeight: "0px",
            opacity: 0,
          }}
          ref={(el) => {
            if (!el) return;
            const parent = el.closest(".group");
            if (!parent) return;
            parent.addEventListener("mouseenter", () => {
              el.style.maxHeight = "40px";
              el.style.opacity = "1";
            });
            parent.addEventListener("mouseleave", () => {
              el.style.maxHeight = "0px";
              el.style.opacity = "0";
            });
          }}
        >
          <button
            className="flex items-center gap-1.5 transition-colors duration-250"
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(167,139,250,1)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Explore <FiArrowRight size={11} />
          </button>
        </div>
      </div>

      {/* Purple accent border glow on hover */}
      <div
        className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 0 1.5px rgba(139,92,246,0.50)",
        }}
      />
    </motion.a>
  );
}
