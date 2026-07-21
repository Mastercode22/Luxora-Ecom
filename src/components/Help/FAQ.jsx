import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../ui/Container';
import { FiPlus, FiMinus } from 'react-icons/fi';
const faqs = [{
  q: "How do I place an order?",
  a: "To place an order, simply browse our collection, add desired items to your cart, and proceed to checkout. You can securely pay using your preferred payment method."
}, {
  q: "How can I cancel an order?",
  a: "Orders can be cancelled within 2 hours of placement. Please contact our support team immediately to request a cancellation."
}, {
  q: "How do refunds work?",
  a: "Refunds are processed back to your original payment method within 5-7 business days after we receive and inspect your returned item."
}, {
  q: "How long is delivery?",
  a: "Standard delivery typically takes 3-5 business days. Express options are available at checkout for next-day or 2-day delivery."
}, {
  q: "How do I track my order?",
  a: "Once your order ships, you will receive a tracking link via email. You can also view the status in the 'My Orders' section of your account."
}, {
  q: "Can I change my shipping address?",
  a: "Address changes must be requested before the order is dispatched. Contact support as soon as possible if an error was made."
}, {
  q: "Do you ship internationally?",
  a: "Yes, we ship to over 50 countries worldwide. International shipping rates and times will be calculated at checkout."
}, {
  q: "How do I contact support?",
  a: "You can reach us via email at support@luxoragift.com, call us at +1 (800) 123-4567, or use the live chat on our Contact page."
}];
export default function FAQ() {
  
const [openIdx, setOpenIdx] = useState(null);
  return <section className="py-24 bg-section">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif italic text-ink mb-4">Frequently Aske</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return <motion.div key={idx} initial={{
              opacity: 0,
              y: 10
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: idx * 0.05
            }} className="bg-surface border border-line rounded-card overflow-hidden transition-colors">
                  <button onClick={() => setOpenIdx(isOpen ? null : idx)} className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
                    <span className={`font-serif italic text-xl ${isOpen ? 'text-primary' : 'text-ink'}`}>
                      {faq.q}
                    </span>
                    <div className={`shrink-0 ml-4 p-2 rounded-full transition-colors ${isOpen ? 'bg-primary/10 text-primary' : 'bg-section text-subtle'}`}>
                      {isOpen ? <FiMinus size={18} /> : <FiPlus size={18} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && <motion.div initial={{
                  height: 0,
                  opacity: 0
                }} animate={{
                  height: "auto",
                  opacity: 1
                }} exit={{
                  height: 0,
                  opacity: 0
                }} transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}>
                        <div className="px-6 pb-6 text-subtle leading-relaxed border-t border-line/50 mt-2 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>}
                  </AnimatePresence>
                </motion.div>;
          })}
          </div>
        </div>
      </Container>
    </section>;
}