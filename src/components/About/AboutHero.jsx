import React from 'react';
import { motion } from 'framer-motion';

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-32 flex items-center justify-center min-h-[60vh] bg-section">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 dark:opacity-20 mix-blend-overlay"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none animate-floaty"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 blur-[120px] rounded-full pointer-events-none animate-floatySlow"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-serif italic text-ink mb-6">
            About LuxoraGift
          </h1>
          <p className="text-lg md:text-2xl text-subtle font-light max-w-3xl mx-auto leading-relaxed">
            Crafting unforgettable gifting experiences through thoughtfully curated luxury products.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
