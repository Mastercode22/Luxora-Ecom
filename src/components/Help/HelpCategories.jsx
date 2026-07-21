import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { FiPackage, FiTruck, FiCreditCard, FiRefreshCw, FiDollarSign, FiShield, FiUser, FiHeart, FiShoppingCart, FiGift, FiInfo, FiLock } from 'react-icons/fi';
const categories = [{
  icon: FiPackage,
  name: "Orders"
}, {
  icon: FiTruck,
  name: "Shipping"
}, {
  icon: FiCreditCard,
  name: "Payments"
}, {
  icon: FiRefreshCw,
  name: "Returns"
}, {
  icon: FiDollarSign,
  name: "Refunds"
}, {
  icon: FiShield,
  name: "Warranty"
}, {
  icon: FiUser,
  name: "Account"
}, {
  icon: FiHeart,
  name: "Wishlist"
}, {
  icon: FiShoppingCart,
  name: "Cart"
}, {
  icon: FiGift,
  name: "Gift Cards"
}, {
  icon: FiInfo,
  name: "Product Information"
}, {
  icon: FiLock,
  name: "Security"
}];
export default function HelpCategories() {
  
return <section className="py-24 bg-surface">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif italic text-ink mb-4">Browse By Categ</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, idx) => <motion.div key={cat.name} initial={{
          opacity: 0,
          y: 15
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: idx % 4 * 0.1,
          duration: 0.4
        }} className="bg-section p-6 rounded-card border border-line hover:border-primary/30 hover:shadow-card-hover transition-all duration-300 cursor-pointer group text-center flex flex-col items-center justify-center gap-4">
              <div className="text-subtle group-hover:text-primary transition-colors">
                <cat.icon size={28} />
              </div>
              <span className="font-medium text-ink group-hover:text-primary transition-colors text-sm uppercase tracking-wide">
                {cat.name}
              </span>
            </motion.div>)}
        </div>
      </Container>
    </section>;
}