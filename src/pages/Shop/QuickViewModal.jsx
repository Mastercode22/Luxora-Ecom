import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiHeart, FiShoppingCart, FiStar, FiChevronRight, FiCheck } from "react-icons/fi";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { Link } from "react-router-dom";

export default function QuickViewModal({ product, onClose }) {
  const [activeImage, setActiveImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  
  const { addItem } = useCart();
  const { isWishlisted: checkWishlist, toggle: toggleWishlistContext } = useWishlist();
  
  const isWishlisted = checkWishlist(product.id);

  const handleOptionSelect = (optionName, choice) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: choice }));
  };

  const handleAddToCart = () => {
    addItem({ ...product, selectedOptions }, quantity);
    onClose();
  };

  const toggleWishlist = () => {
    toggleWishlistContext(product);
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 pt-[120px] sm:pt-[120px]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-ink/80 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-5xl bg-surface border border-line/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-ink/10 hover:bg-ink/20 text-ink rounded-full backdrop-blur-md transition-colors"
        >
          <FiX size={24} />
        </button>

        <div className="flex flex-col md:flex-row overflow-y-auto">
          {/* Gallery Side */}
          <div className="w-full md:w-1/2 p-6 md:p-8 bg-secondary/20 flex flex-col gap-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary border border-line/30 relative">
              <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
              {product.badge && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-ink/90 backdrop-blur-md text-surface text-xs font-bold tracking-wider uppercase rounded-full">
                  {product.badge}
                </div>
              )}
            </div>
            {product.gallery && (
              <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                {[product.image, product.hoverImage, ...product.gallery].filter(Boolean).map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${activeImage === img ? 'border-primary shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Side */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
            <div className="mb-6">
              <p className="text-primary font-bold uppercase tracking-wider text-sm mb-2">{product.brand}</p>
              <h2 className="text-3xl md:text-4xl font-serif italic text-ink mb-3">{product.name}</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <FiStar className="text-amber-400 fill-current" size={16} />
                  <span className="font-bold text-ink">{product.rating}</span>
                  <span className="text-ink/50 text-sm">({product.reviews} reviews)</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-line" />
                <span className="text-green-500 font-medium text-sm flex items-center gap-1"><FiCheck /> {product.stock}</span>
              </div>
              <div className="flex items-end gap-3 mb-6">
                <span className="text-4xl font-bold text-ink">${product.price}</span>
                {product.oldPrice && <span className="text-lg text-ink/40 line-through mb-1">${product.oldPrice}</span>}
              </div>
              <p className="text-ink/70 leading-relaxed">{product.description}</p>
            </div>

            {/* Options */}
            {product.options && product.options.map(option => (
              <div key={option.name} className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-ink">{option.name}</span>
                  <span className="text-ink/50 text-sm">{selectedOptions[option.name] || 'Select'}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {option.choices.map(choice => {
                    const isSelected = selectedOptions[option.name] === choice;
                    return (
                      <button
                        key={choice}
                        onClick={() => handleOptionSelect(option.name, choice)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${isSelected ? 'bg-ink text-surface shadow-md' : 'bg-secondary/50 text-ink/70 hover:bg-secondary border border-transparent hover:border-line/50'}`}
                      >
                        {choice}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="mt-auto pt-8 border-t border-line/30 flex items-center gap-4">
              <div className="flex items-center bg-secondary/50 border border-line/60 rounded-xl">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-ink/70 hover:text-ink transition-colors">-</button>
                <span className="w-8 text-center font-bold text-ink">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 text-ink/70 hover:text-ink transition-colors">+</button>
              </div>
              
              <button onClick={handleAddToCart} className="flex-1 py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 flex items-center justify-center gap-2">
                <FiShoppingCart size={18} /> Add to Cart
              </button>

              <button onClick={toggleWishlist} className={`p-3.5 rounded-xl transition-all border ${isWishlisted ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-surface border-line/60 text-ink hover:border-primary/50'}`}>
                <FiHeart size={20} className={isWishlisted ? 'fill-current' : ''} />
              </button>
            </div>

            <div className="mt-4 text-center">
              <Link to={`/product/${product.slug}`} onClick={onClose} className="inline-flex items-center gap-1 text-sm font-medium text-ink/60 hover:text-primary transition-colors">
                View Full Details <FiChevronRight />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
