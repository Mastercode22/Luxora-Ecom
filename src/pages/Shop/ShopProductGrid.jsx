import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import ShopProductCard from "./ShopProductCard";
export default function ShopProductGrid({
  products,
  viewMode,
  onQuickView
}) {
  
if (products.length === 0) {
    return <div className="py-24 text-center">
        <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6 text-ink/30">
          <FiSearch size={40} />
        </div>
        <h3 className="text-3xl text-ink font-serif italic mb-3">No Products Fou</h3>
        <p className="text-ink/60 max-w-md mx-auto text-lg">We Couldnt Fin</p>
      </div>;
  }
  const getGridClass = () => {
    switch (viewMode) {
      case "compact":
        return "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4";
      case "list":
        return "flex flex-col gap-4";
      case "grid":
      default:
        return "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";
    }
  };
  return <div className={getGridClass()}>
      <AnimatePresence mode="popLayout">
        {products.map((product, idx) => <motion.div layout initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.9
      }} transition={{
        duration: 0.3,
        delay: idx % 12 * 0.05
      }} key={`${product.id}-${viewMode}`}>
            <ShopProductCard product={product} viewMode={viewMode} onQuickView={onQuickView} />
          </motion.div>)}
      </AnimatePresence>
    </div>;
}