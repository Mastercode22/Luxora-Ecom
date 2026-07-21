import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { FiMessageSquare, FiShoppingBag, FiBriefcase } from 'react-icons/fi';
const supportCategories = [{
  icon: FiMessageSquare,
  title: "Client Care",
  desc: "For assistance with orders, products, and general inquiries.",
  cta: "Chat with us"
}, {
  icon: FiShoppingBag,
  title: "Bespoke Services",
  desc: "Inquire about custom sourcing and personalized corporate gifting.",
  cta: "Request consultation"
}, {
  icon: FiBriefcase,
  title: "Partnerships",
  desc: "For press inquiries, brand collaborations, and wholesale.",
  cta: "Contact team"
}];
export default function SupportCards() {
  
return <section className="py-24 bg-surface">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif italic text-ink mb-4">Specialized Sup</h2>
          <p className="text-subtle max-w-2xl mx-auto">Connect Directl</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {supportCategories.map((card, idx) => <motion.div key={card.title} initial={{
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
        }} className="bg-section p-8 rounded-card border border-line hover:border-primary/30 hover:shadow-card-hover transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full text-primary mb-6">
                <card.icon size={20} />
              </div>
              <h3 className="text-xl font-semibold text-ink mb-3">{card.title}</h3>
              <p className="text-subtle mb-8">{card.desc}</p>
              <button className="btn-secondary w-full text-sm">
                {card.cta}
              </button>
            </motion.div>)}
        </div>
      </Container>
    </section>;
}