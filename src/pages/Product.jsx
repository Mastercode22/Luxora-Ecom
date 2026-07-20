import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { gsap } from "gsap";
import {
  FiChevronRight, FiStar, FiHeart, FiShare2,
  FiMinus, FiPlus, FiTruck, FiShield, FiClock, FiGift, FiCheck
} from "react-icons/fi";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Container from "../components/ui/Container";
import CloudinaryImage from "../components/ui/CloudinaryImage";
import ProductCard from "../components/home/ProductCard";

const ease = [0.22, 1, 0.36, 1];

export default function Product() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selections, setSelections] = useState({});
  const [activeTab, setActiveTab] = useState("description");
  const [justAdded, setJustAdded] = useState(false);
  
  const imageRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);

  const { addItem, openCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  // Scroll to top and reset state
  useEffect(() => {
    const found = products.find((p) => p.slug === slug || p.id === slug);
    if (found) {
      setProduct(found);
      setActiveImage(0);
      setQuantity(1);
      
      const initialSelections = {};
      found.options?.forEach((opt) => {
        initialSelections[opt.name] = opt.choices[0];
      });
      setSelections(initialSelections);
      setActiveTab("description");
    }
  }, [slug]);

  // GSAP Floating Blobs
  useEffect(() => {
    if (blob1Ref.current && blob2Ref.current) {
      gsap.to(blob1Ref.current, {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        rotation: "random(-10, 10)",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      gsap.to(blob2Ref.current, {
        y: "random(-30, 30)",
        x: "random(-30, 30)",
        rotation: "random(-15, 15)",
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center bg-section">
        <h1 className="text-3xl font-serif text-ink mb-4">Product Not Found</h1>
        <Link to="/#shop" className="btn-primary">Return to Shop</Link>
      </div>
    );
  }

  const liked = isWishlisted(product.id);
  const discount = product.oldPrice && product.oldPrice > product.price
    ? Math.round(100 - (product.price / product.oldPrice) * 100) : null;

  const handleAddToCart = () => {
    for(let i=0; i<quantity; i++) {
      addItem(product);
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    openCart();
  };

  const TABS = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "shipping", label: "Shipping" },
    { id: "returns", label: "Returns" },
  ];

  // GSAP Mouse Parallax
  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    gsap.to(imageRef.current, {
      x: x * -25,
      y: y * -25,
      scale: 1.05,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      x: 0, y: 0, scale: 1, duration: 1, ease: "power2.out"
    });
  };

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-section">
      <Container>
        {/* Breathing room below navbar */}
        <div className="pt-[140px] pb-6">
          <nav className="flex items-center gap-2" style={{ fontSize: 11.5, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700 }}>
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <FiChevronRight size={10} />
            <Link to="/#shop" className="hover:text-primary transition-colors">{product.category}</Link>
            <FiChevronRight size={10} />
            <span className="text-ink truncate max-w-[150px] sm:max-w-none">{product.name}</span>
          </nav>
        </div>

        {/* ── Top Layout (55/45 Split) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 xl:gap-28 mb-32">
          
          {/* Left Column: Gallery (Dominates) */}
          <div className="relative flex flex-col-reverse md:flex-row gap-5 lg:sticky lg:top-[120px] h-fit">
            
            {/* GSAP Decorative Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 rounded-[32px]">
               <div ref={blob1Ref} className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
               <div ref={blob2Ref} className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary rounded-full mix-blend-screen filter blur-[120px] opacity-10"></div>
            </div>

            {/* Vertical Thumbnails (Desktop) */}
            <div className="hidden md:flex flex-col gap-4 w-[100px] shrink-0">
              {product.gallery?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className="relative aspect-[4/5] rounded-[20px] overflow-hidden bg-surface transition-all duration-400 group"
                  style={{
                    boxShadow: activeImage === i ? "0 0 0 2px var(--color-primary)" : "0 0 0 1px var(--color-border)",
                    opacity: activeImage === i ? 1 : 0.65
                  }}
                >
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                    <CloudinaryImage src={img} aspect="h-full" />
                  </div>
                </button>
              ))}
            </div>

            {/* Horizontal Thumbnails (Mobile) */}
            <div className="md:hidden mt-2 w-full">
              <Swiper slidesPerView="auto" spaceBetween={12} freeMode modules={[FreeMode]}>
                {product.gallery?.map((img, i) => (
                  <SwiperSlide key={i} style={{ width: 85 }}>
                     <button
                      onClick={() => setActiveImage(i)}
                      className="relative aspect-[4/5] w-full rounded-[18px] overflow-hidden bg-surface transition-all duration-400"
                      style={{
                        boxShadow: activeImage === i ? "0 0 0 2px var(--color-primary)" : "0 0 0 1px var(--color-border)",
                        opacity: activeImage === i ? 1 : 0.65
                      }}
                    >
                      <CloudinaryImage src={img} aspect="h-full" />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Main Image */}
            <div 
              className="flex-1 bg-surface rounded-[32px] overflow-hidden relative group cursor-crosshair"
              style={{ aspectRatio: "4/5", boxShadow: "0 24px 64px -16px rgba(0,0,0,0.5), inset 0 0 0 1px var(--color-border)" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease }}
                  className="absolute inset-0 flex items-center justify-center p-4"
                >
                  <div ref={activeImage === 0 ? imageRef : null} className="w-full h-full will-change-transform">
                    <CloudinaryImage src={product.gallery?.[activeImage] || product.image} aspect="h-full" className="object-cover rounded-[24px]" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col pt-2 lg:pt-8 pb-32 lg:pb-0">
            {/* Brand + Category */}
            <div className="flex items-center gap-3 mb-4">
              <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-primary)" }}>
                {product.brand || product.category}
              </span>
              {product.brand && (
                <>
                  <span style={{ color: "var(--color-border)", fontSize: 14 }}>·</span>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
                    {product.category}
                  </span>
                </>
              )}
            </div>
            
            {/* Title */}
            <h1 className="text-ink font-bold leading-[1.1] tracking-tight mb-6" style={{ fontSize: "clamp(36px, 4.5vw, 52px)" }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-[3px]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar key={i} size={15} className={`text-primary ${i < Math.round(product.rating) ? "fill-current" : "opacity-20"}`} />
                ))}
              </div>
              <span style={{ fontSize: 15, color: "var(--color-text-muted)", fontWeight: 500 }}>{product.rating} ({product.reviews} Reviews)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-line mx-2" />
              <span className="stock-chip" style={{ fontSize: 12, padding: "6px 12px" }}>{product.stock}</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-10">
              <span style={{ fontSize: 40, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.04em", lineHeight: 1 }}>
                ${product.price}
              </span>
              {product.oldPrice && (
                <span style={{ fontSize: 20, color: "var(--color-text-muted)", textDecoration: "line-through", fontWeight: 500 }}>
                  ${product.oldPrice}
                </span>
              )}
              {discount && (
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-primary)", background: "rgba(255,203,116,0.1)", borderRadius: 99, padding: "6px 14px", marginLeft: "auto" }}>
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Description */}
            <p style={{ fontSize: 18, color: "var(--color-text-muted)", lineHeight: 1.8, fontWeight: 300, marginBottom: 40 }}>
              {product.description}
            </p>

            {/* Options */}
            {product.options?.map((opt) => (
              <div key={opt.name} className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text-primary)", letterSpacing: "0.05em", textTransform: "uppercase" }}>{opt.name}</span>
                  <span style={{ fontSize: 14, color: "var(--color-primary)", fontWeight: 500 }}>{selections[opt.name]}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {opt.choices.map((choice) => {
                    const isSelected = selections[opt.name] === choice;
                    return (
                      <button
                        key={choice}
                        onClick={() => setSelections(s => ({ ...s, [opt.name]: choice }))}
                        className="relative px-6 py-4 rounded-[16px] transition-all duration-400 group overflow-hidden"
                        style={{
                          fontSize: 14, fontWeight: 600,
                          color: isSelected ? "var(--color-primary)" : "var(--color-text-muted)",
                          background: isSelected ? "rgba(255,203,116,0.05)" : "var(--color-surface)",
                          boxShadow: isSelected ? "none" : "inset 0 0 0 1px var(--color-border)"
                        }}
                      >
                        {choice}
                        {isSelected && (
                          <motion.div
                            layoutId={`pill-${opt.name}`}
                            className="absolute inset-0 rounded-[16px] border-[2px] border-primary pointer-events-none"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        {!isSelected && (
                          <div className="absolute inset-0 rounded-[16px] border-[2px] border-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Actions Row */}
            <div className="flex flex-wrap items-center gap-4 mt-6 mb-12">
              {/* Quantity */}
              <div className="flex items-center justify-between bg-surface rounded-[20px] px-3 border border-white/10" style={{ height: 64, width: 140 }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center text-ink/60 hover:text-primary transition-colors hover:scale-110 active:scale-95">
                  <FiMinus size={16} />
                </button>
                <span className="font-semibold text-ink w-8 text-center" style={{ fontSize: 18 }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center text-ink/60 hover:text-primary transition-colors hover:scale-110 active:scale-95">
                  <FiPlus size={16} />
                </button>
              </div>

              {/* Add to Bag (Desktop) */}
              <button 
                onClick={handleAddToCart}
                className={`hidden md:flex flex-1 relative overflow-hidden items-center justify-center gap-3 h-[64px] rounded-[20px] transition-all duration-500 uppercase font-bold tracking-[0.15em] text-[13px] group ${
                  justAdded ? "bg-success text-white shadow-[0_12px_32px_rgba(0,200,83,0.35)]" : "bg-primary text-section hover:-translate-y-1 shadow-[0_12px_32px_rgba(255,203,116,0.25)]"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmerSlide" />
                 <AnimatePresence mode="wait" initial={false}>
                  {justAdded
                    ? <motion.span key="c" className="flex items-center gap-2" initial={{ scale: 0 }} animate={{ scale: 1 }}><FiCheck size={18} /> Added</motion.span>
                    : <motion.span key="b" className="flex items-center gap-2" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>Add to Bag</motion.span>
                  }
                </AnimatePresence>
              </button>

              {/* Wishlist */}
              <motion.button 
                onClick={() => toggle(product)}
                whileTap={{ scale: 0.9 }}
                className={`w-[64px] h-[64px] flex items-center justify-center rounded-[20px] transition-all duration-400 shadow-sm ${
                  liked ? "bg-primary text-section shadow-[0_8px_24px_rgba(255,203,116,0.3)]" : "bg-surface border border-white/10 text-ink/50 hover:border-primary hover:text-primary"
                }`}
              >
                <motion.div animate={liked ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.3 }}>
                  <FiHeart size={22} className={liked ? "fill-current" : ""} />
                </motion.div>
              </motion.button>
            </div>

            {/* Buy Now Full Width */}
            <button 
              onClick={handleBuyNow}
              className="hidden md:block w-full h-[64px] rounded-[20px] bg-white text-section font-bold uppercase tracking-[0.15em] text-[13px] transition-all duration-400 hover:-translate-y-1 mb-12 shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
            >
              Buy it now
            </button>

            {/* Glassmorphism Delivery Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {[
                { icon: FiClock, title: "Same Day Delivery", sub: "Order before 2 PM" },
                { icon: FiTruck, title: "Climate Controlled", sub: "Arrives pristine" },
                { icon: FiGift, title: "Free Wrapping", sub: "Signature packaging" },
                { icon: FiShield, title: "Secure Payment", sub: "256-bit encryption" },
              ].map((card, i) => (
                <div key={i} className="group relative flex items-start gap-4 p-5 rounded-[24px] overflow-hidden transition-transform duration-400 hover:-translate-y-1 cursor-default"
                  style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: "1px solid var(--color-border)" }}>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="mt-1 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <card.icon size={18} />
                  </div>
                  <div className="flex flex-col gap-1 relative z-10">
                    <span style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text-primary)" }}>{card.title}</span>
                    <span style={{ fontSize: 13, color: "var(--color-text-muted)", lineHeight: 1.4 }}>{card.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Share & SKU */}
            <div className="flex items-center justify-between pt-8 border-t border-line">
              <span style={{ fontSize: 14, color: "var(--color-text-muted)" }}>SKU: <span className="font-mono text-ink">{product.sku}</span></span>
              <button className="flex items-center gap-2 text-ink/60 hover:text-primary transition-colors" style={{ fontSize: 14, fontWeight: 600 }}>
                <FiShare2 size={16} /> Share
              </button>
            </div>

          </div>
        </div>
      </Container>

      {/* ── Tabs Section ── */}
      <div className="bg-surface border-y border-line pt-20 pb-24">
        <Container className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 border-b border-line mb-12">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-5 transition-colors duration-400 font-bold uppercase tracking-[0.15em] text-[13px] ${
                  activeTab === tab.id ? "text-primary" : "text-ink/40 hover:text-ink/80"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full" />
                )}
              </button>
            ))}
          </div>
          
          <div className="px-6 md:px-12 min-h-[160px] text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease }}
                className="text-ink/70 leading-[1.9] font-light whitespace-pre-wrap text-[16px] md:text-[18px]"
              >
                {activeTab === "description" ? product.description : product.tabs?.[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </div>

      {/* ── Related Products ── */}
      <div className="pt-24 pb-32">
        <Container>
          <div className="flex flex-col items-center text-center mb-16">
             <span className="font-bold uppercase tracking-[0.2em] text-[11px] text-primary mb-4">Discover More</span>
            <h2 className="font-serif italic text-[36px] md:text-[48px] text-ink leading-none">You May Also Like</h2>
          </div>
          <div className="hidden md:grid grid-cols-4 gap-8">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
          <div className="md:hidden -mx-5 px-5">
            <Swiper slidesPerView={1.3} spaceBetween={20} freeMode modules={[FreeMode]}>
              {relatedProducts.map((p, i) => (
                <SwiperSlide key={p.id}>
                  <ProductCard product={p} index={i} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Container>
      </div>

      {/* ── Mobile Sticky Add to Cart ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-section/95 backdrop-blur-xl border-t border-line p-4 z-40"
           style={{ boxShadow: "0 -8px 32px rgba(0,0,0,0.5)" }}>
         <div className="flex items-center gap-4">
           <div className="flex flex-col">
             <span style={{ fontSize: 11, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>Total</span>
             <span style={{ fontSize: 20, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.04em", lineHeight: 1 }}>${product.price * quantity}</span>
           </div>
           <button 
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 h-[52px] rounded-[16px] transition-all duration-300 uppercase font-bold tracking-widest text-[12px] ${
                justAdded ? "bg-success text-white" : "bg-primary text-section"
              }`}
              style={{ boxShadow: justAdded ? "0 8px 24px rgba(0,200,83,0.3)" : "0 8px 24px rgba(255,203,116,0.3)" }}
            >
               <AnimatePresence mode="wait" initial={false}>
                {justAdded
                  ? <motion.span key="c" className="flex items-center gap-2" initial={{ scale: 0 }} animate={{ scale: 1 }}><FiCheck size={16} /> Added</motion.span>
                  : <motion.span key="b" className="flex items-center gap-2" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>Add to Bag</motion.span>
                }
              </AnimatePresence>
            </button>
         </div>
      </div>
    </div>
  );
}
