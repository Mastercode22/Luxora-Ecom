import { motion } from "framer-motion";

export default function ShopHero({ count }) {
  return (
    <div className="relative py-20 overflow-hidden bg-secondary/20 border-b border-line/30 mb-8">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif italic text-4xl md:text-6xl text-ink mb-6"
        >
          Discover Our Collection
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-ink/70 text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light"
        >
          Browse thousands of carefully selected premium products, crafted with precision and designed to elevate your everyday lifestyle.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface border border-line/50 text-ink/70 font-medium text-sm shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Showing {count} Products
        </motion.div>
      </div>
    </div>
  );
}
