import { motion } from "framer-motion";
import { FiHeart, FiMaximize2, FiShoppingCart, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
export default function ShopProductCard({
  product,
  viewMode,
  onQuickView
}) {
  
const {
    isWishlisted: checkWishlist,
    toggle: toggleWishlistContext
  } = useWishlist();
  const {
    addItem
  } = useCart();
  const isWishlisted = checkWishlist(product.id);
  const toggleWishlist = e => {
    e.preventDefault();
    toggleWishlistContext(product);
  };
  const handleAddToCart = e => {
    e.preventDefault();
    addItem(product);
  };
  const handleQuickView = e => {
    e.preventDefault();
    onQuickView(product);
  };

  // Determine card layout based on viewMode
  if (viewMode === 'list') {
    return <Link to={`/product/${product.slug}`} className="group flex flex-col sm:flex-row gap-6 p-4 bg-surface/40 hover:bg-surface/80 backdrop-blur-md border border-line/60 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:border-primary/30">
        <div className="relative w-full sm:w-64 h-48 rounded-2xl overflow-hidden shrink-0 bg-secondary/30">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
          <img src={product.hoverImage} alt={product.name} className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {product.badge && <div className="absolute top-3 left-3 px-3 py-1 bg-ink/90 backdrop-blur-md text-surface text-xs font-bold tracking-wider uppercase rounded-full">
              {product.badge}
            </div>}
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-wider mb-1">{product.brand}</p>
              <h3 className="text-xl font-bold text-ink group-hover:text-primary transition-colors">{product.name}</h3>
            </div>
            <button onClick={toggleWishlist} className={`p-3 rounded-full transition-all duration-300 shadow-sm ${isWishlisted ? 'bg-primary text-white shadow-primary/30' : 'bg-surface border border-line/50 text-ink hover:border-primary hover:text-primary'}`}>
              <FiHeart size={18} className={isWishlisted ? 'fill-current' : ''} />
            </button>
          </div>
          <div className="flex items-center gap-1.5 mb-4">
            <FiStar className="text-amber-400 fill-current" size={14} />
            <span className="text-sm font-bold text-ink">{product.rating}</span>
            <span className="text-xs text-ink/50">({product.reviews})</span>
          </div>
          <p className="text-ink/60 text-sm line-clamp-2 mb-6 max-w-xl">{product.description}</p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-ink">${product.price}</span>
              {product.oldPrice && <span className="text-sm text-ink/40 line-through mb-1">${product.oldPrice}</span>}
            </div>
            <div className="flex gap-2">
              <button onClick={handleQuickView} className="px-5 py-2.5 rounded-xl bg-secondary/50 text-ink font-medium text-sm hover:bg-secondary transition-colors">Quick View</button>
              <button onClick={handleAddToCart} className="px-6 py-2.5 rounded-xl bg-ink text-surface font-medium text-sm hover:bg-primary transition-colors">Add To Cart</button>
            </div>
          </div>
        </div>
      </Link>;
  }
  return <Link to={`/product/${product.slug}`} className="group block relative bg-surface border border-line/60 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
      {/* Image Container */}
      <div className={`relative w-full overflow-hidden bg-secondary/20 ${viewMode === 'compact' ? 'h-48' : 'h-72 lg:h-80'}`}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0" />
        <img src={product.hoverImage} alt={product.name} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 scale-105 group-hover:scale-100" />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10 pointer-events-none">
          {product.badge ? <span className="px-3 py-1.5 bg-ink/90 backdrop-blur-md text-surface text-xs font-bold tracking-wider uppercase rounded-full shadow-lg">
              {product.badge}
            </span> : <div />}
          <button onClick={toggleWishlist} className={`pointer-events-auto p-2.5 rounded-full transition-all duration-300 shadow-xl ${isWishlisted ? 'bg-primary text-white shadow-primary/30' : 'bg-surface/80 backdrop-blur-md border border-line/50 text-ink hover:border-primary hover:text-primary'}`}>
            <FiHeart size={16} className={isWishlisted ? 'fill-current' : ''} />
          </button>
        </div>

        {/* Hover Quick Actions */}
        <div className="absolute inset-x-4 bottom-4 flex gap-2 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 z-20">
          <button onClick={handleAddToCart} className="flex-1 py-3 bg-surface/90 backdrop-blur-md border border-line text-ink text-sm font-bold rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-colors flex items-center justify-center gap-2 shadow-xl">
            <FiShoppingCart size={16} />Add</button>
          <button onClick={handleQuickView} className="w-12 shrink-0 flex items-center justify-center bg-surface/90 backdrop-blur-md border border-line text-ink rounded-xl hover:bg-ink hover:text-surface transition-colors shadow-xl">
            <FiMaximize2 size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={`p-5 ${viewMode === 'compact' ? 'p-4' : 'p-6'}`}>
        <div className="flex justify-between items-start mb-1">
          <p className="text-primary text-xs font-bold uppercase tracking-wider">{product.brand}</p>
          <div className="flex items-center gap-1 text-xs">
            <FiStar className="text-amber-400 fill-current" size={12} />
            <span className="font-bold text-ink">{product.rating}</span>
          </div>
        </div>
        <h3 className={`font-bold text-ink group-hover:text-primary transition-colors line-clamp-1 mb-2 ${viewMode === 'compact' ? 'text-base' : 'text-lg'}`}>
          {product.name}
        </h3>
        {viewMode !== 'compact' && <p className="text-ink/50 text-sm line-clamp-2 mb-4 h-10">
            {product.description}
          </p>}
        <div className="flex items-end gap-2 mt-2">
          <span className={`font-bold text-ink ${viewMode === 'compact' ? 'text-lg' : 'text-xl'}`}>${product.price}</span>
          {product.oldPrice && <span className="text-sm text-ink/40 line-through mb-[2px]">${product.oldPrice}</span>}
        </div>
      </div>
    </Link>;
}