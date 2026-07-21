import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { FiAward, FiStar, FiZap, FiHeart, FiFeather, FiShield } from 'react-icons/fi';
const values = [{
  icon: FiShield,
  title: "Integrity",
  desc: "Honesty and transparency in every transaction."
}, {
  icon: FiAward,
  title: "Quality",
  desc: "Uncompromising standards for every product."
}, {
  icon: FiZap,
  title: "Innovation",
  desc: "Constantly evolving to exceed expectations."
}, {
  icon: FiHeart,
  title: "Customer Satisfaction",
  desc: "Your delight is our ultimate goal."
}, {
  icon: FiFeather,
  title: "Creativity",
  desc: "Curating unique and inspiring collections."
}, {
  icon: FiStar,
  title: "Reliability",
  desc: "Dependable service you can trust implicitly."
}];
export default function CoreValues() {
  
return <section className="py-24 bg-section">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif italic text-ink mb-4">Core Values</h2>
          <p className="text-subtle max-w-2xl mx-auto">The Principles</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((val, idx) => <motion.div key={val.title} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: idx * 0.1,
          duration: 0.5
        }} className="bg-surface p-8 rounded-card border border-line hover:border-primary/30 hover:shadow-card-hover transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <val.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold text-ink mb-3">{val.title}</h3>
              <p className="text-subtle">{val.desc}</p>
            </motion.div>)}
        </div>
      </Container>
    </section>;
}