import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { FiGlobe, FiClock, FiZap } from 'react-icons/fi';
const shippingOptions = [{
  icon: FiClock,
  title: "Standard Delivery",
  time: "3-5 Business Days",
  price: "Free over $200"
}, {
  icon: FiZap,
  title: "Express Delivery",
  time: "1-2 Business Days",
  price: "$25.00"
}, {
  icon: FiGlobe,
  title: "International Delivery",
  time: "5-10 Business Days",
  price: "Calculated at checkout"
}];
export default function ShippingInfo() {
  
return <section className="py-24 bg-section">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <h2 className="text-3xl font-serif italic text-ink mb-6">Shipping Inform</h2>
            <p className="text-subtle text-lg leading-relaxed mb-8">Every Luxora Or</p>
            <div className="space-y-4">
              {shippingOptions.map((opt, idx) => <div key={opt.title} className="flex items-center justify-between p-4 bg-surface rounded-card border border-line">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <opt.icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-medium text-ink">{opt.title}</h4>
                      <p className="text-xs text-subtle uppercase tracking-wide">{opt.time}</p>
                    </div>
                  </div>
                  <div className="font-medium text-primary text-right">
                    {opt.price}
                  </div>
                </div>)}
            </div>
          </motion.div>
          
          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="aspect-square bg-surface rounded-card overflow-hidden shadow-float border border-line p-8 flex items-center justify-center text-center">
             <div className="max-w-xs">
                <FiGlobe size={64} className="mx-auto text-primary/20 mb-6" />
                <h3 className="text-2xl font-serif italic text-ink mb-4">Worldwide Reach</h3>
                <p className="text-subtle">We Deliver Luxu</p>
             </div>
          </motion.div>
        </div>
      </Container>
    </section>;
}