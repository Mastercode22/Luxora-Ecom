import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';

export default function HelpHero() {
  return (
    <section className="relative pt-40 pb-20 bg-section overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full pointer-events-none animate-floaty"></div>
      
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-serif italic text-ink mb-6"
        >
          How can we help?
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative mt-8"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className="text-subtle text-xl" />
          </div>
          <input
            type="text"
            placeholder="Search for answers..."
            className="w-full bg-surface text-ink border border-line rounded-pill py-4 pl-12 pr-6 shadow-float focus:outline-none focus:border-primary/50 transition-colors text-lg"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-sm text-subtle flex flex-wrap items-center justify-center gap-2"
        >
          <span>Popular:</span>
          {["Track Order", "Returns", "Shipping Info"].map(tag => (
            <button key={tag} className="px-3 py-1 bg-surface/50 border border-line rounded-pill hover:text-primary transition-colors">
              {tag}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
