import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

const stats = [
  { value: "10,000+", label: "Happy Customers" },
  { value: "5,000+", label: "Orders Delivered" },
  { value: "300+", label: "Premium Products" },
  { value: "98%", label: "Customer Satisfaction" }
];

export default function Statistics() {
  return (
    <section className="py-24 bg-surface relative border-t border-line">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-serif italic text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-subtle font-medium text-sm tracking-wide uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
