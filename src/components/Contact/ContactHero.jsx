import React from 'react';
import { motion } from 'framer-motion';

export default function ContactHero() {
  return (
    <section className="relative pt-40 pb-20 bg-section overflow-hidden flex flex-col items-center justify-center border-b border-line">
      <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/20 blur-[150px] rounded-full pointer-events-none animate-floaty"></div>
      
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-serif italic text-ink mb-6"
        >
          Let's Start a Conversation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-subtle font-light leading-relaxed"
        >
          Our dedicated concierges are here to assist you with any inquiries regarding our collections, bespoke services, or existing orders.
        </motion.p>
      </div>
    </section>
  );
}
