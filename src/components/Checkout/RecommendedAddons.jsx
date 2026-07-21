import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiCheck, FiHeart, FiStar, FiEye, FiX } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { products } from '../../data/products';

export default function RecommendedAddons() {
  const { addItem, items: cartItems } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [addedIds, setAddedIds] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Filter out products already in cart
  const cartIds = new Set(cartItems.map((i) => i.id));
  const recommended = products.filter((p) => !cartIds.has(p.id)).slice(0, 3);

  if (recommended.length === 0) return null;

  const handleAdd = (product) => {
    addItem(product);
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 1500);
  };

  return (
    <div className="mt-2 p-3 sm:p-3.5 rounded-2xl bg-surface/50 border border-line/60 backdrop-blur-xl shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-widest block mb-0.5">
            Curated Add-ons
          </span>
          <h3 className="text-base sm:text-lg font-serif italic text-ink font-bold">
            You May Also Like
          </h3>
        </div>
        <span className="text-[10px] text-ink/60 bg-secondary px-2.5 py-0.5 rounded-full border border-line/40 font-semibold">
          1-Click Instant Add
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
        {recommended.map((prod) => {
          const isAdded = addedIds.includes(prod.id);
          const isWish = isWishlisted ? isWishlisted(prod.id) : false;

          return (
            <motion.div
              key={prod.id}
              whileHover={{ y: -3 }}
              className="p-2.5 sm:p-3 rounded-2xl bg-surface border border-line/50 shadow-sm hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative mb-2 rounded-xl overflow-hidden bg-secondary/40 aspect-square">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Quick Action Overlay Icons */}
                <div className="absolute top-1.5 right-1.5 flex flex-col gap-1 z-10">
                  <button
                    onClick={() => toggle(prod)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isWish
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-black/50 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/70'
                    }`}
                    aria-label="Wishlist"
                  >
                    <FiHeart size={11} fill={isWish ? 'currentColor' : 'none'} />
                  </button>

                  <button
                    onClick={() => setQuickViewProduct(prod)}
                    className="w-6 h-6 rounded-full bg-black/50 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/70 flex items-center justify-center transition-all"
                    aria-label="Quick View"
                  >
                    <FiEye size={11} />
                  </button>
                </div>

                {prod.badge && (
                  <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 text-[8px] font-bold tracking-wider text-white bg-primary/90 rounded uppercase">
                    {prod.badge}
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between text-[10px] mb-0.5">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    <FiStar fill="currentColor" size={9} />
                    <span className="font-bold">{prod.rating}</span>
                  </div>
                  <span className="text-[9px] text-green-500 font-bold uppercase tracking-wider">
                    ● In Stock
                  </span>
                </div>

                <h4 className="text-[11px] sm:text-xs font-bold text-ink truncate leading-tight">
                  {prod.name}
                </h4>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-line/30">
                  <div>
                    <span className="text-xs font-bold text-ink">${prod.price}</span>
                    {prod.oldPrice && (
                      <span className="text-[9px] text-ink/40 line-through ml-1">
                        ${prod.oldPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAdd(prod)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-bold transition-all duration-300 ${
                      isAdded
                        ? 'bg-green-500 text-white shadow-md'
                        : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                    }`}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {isAdded ? (
                        <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-0.5">
                          <FiCheck size={11} /> Added
                        </motion.span>
                      ) : (
                        <motion.span key="plus" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-0.5">
                          <FiPlus size={11} /> Add
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-surface border border-line/70 rounded-3xl p-6 max-w-md w-full relative shadow-2xl space-y-4"
            >
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 text-ink/60 hover:text-ink p-1 rounded-full bg-secondary"
              >
                <FiX size={18} />
              </button>

              <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">
                  {quickViewProduct.brand || 'Luxora Collection'}
                </span>
                <h3 className="text-lg font-serif italic text-ink font-bold">
                  {quickViewProduct.name}
                </h3>
                <p className="text-xs text-ink/70 mt-1 line-clamp-3">
                  {quickViewProduct.description}
                </p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-line/40">
                  <span className="text-xl font-bold text-ink">${quickViewProduct.price}</span>
                  <button
                    onClick={() => {
                      handleAdd(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="btn-primary px-5 py-2 text-xs font-bold flex items-center gap-1.5"
                  >
                    <FiPlus /> Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
