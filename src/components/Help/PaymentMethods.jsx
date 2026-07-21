import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
const methods = ["Visa", "Mastercard", "American Express", "Apple Pay", "Google Pay", "PayPal"];
export default function PaymentMethods() {
  
return <section className="py-24 bg-surface border-t border-line">
      <Container>
        <div className="text-center">
          <h2 className="text-2xl font-serif italic text-ink mb-8">Secure Payment</h2>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {methods.map((m, idx) => <motion.div key={m} initial={{
            opacity: 0,
            y: 10
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: idx * 0.1
          }} className="px-6 py-3 bg-section rounded-pill border border-line text-subtle font-medium text-sm tracking-wide">
                {m}
              </motion.div>)}
          </div>
          <p className="mt-8 text-xs text-subtle/70 uppercase tracking-widest">All Transaction</p>
        </div>
      </Container>
    </section>;
}