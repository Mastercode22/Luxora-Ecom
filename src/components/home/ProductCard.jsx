import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiHeart, FiEye, FiShoppingBag, FiStar, FiX, FiCheck, FiArrowRight,
} from "react-icons/fi";
import CloudinaryImage from "../ui/CloudinaryImage";
import Badge from "../ui/Badge";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const ease = [0.22, 1, 0.36, 1];

export default function ProductCard({ product, index = 0 }) {
  const [quickOpen,  setQuickOpen]  = useState(false);
  const [justAdded,  setJustAdded]  = useState(false);
  const [hovered,    setHovered]    = useState(false);
  const navigate = useNavigate();

  const { addItem }           = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const liked                  = isWishlisted(product.id);

  const discount = product.oldPrice && product.oldPrice > product.price
    ? Math.round(100 - (product.price / product.oldPrice) * 100) : null;

  const handleAdd = (e) => {
    e?.stopPropagation();
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-48px" }}
        transition={{ duration: 0.62, delay: (index % 4) * 0.085, ease }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => navigate(`/products/${product.slug || product.id}`)}
        className="group relative bg-surface flex flex-col overflow-hidden cursor-pointer"
        style={{
          borderRadius: 24,
          transition: "transform 500ms cubic-bezier(0.22,1,0.36,1), box-shadow 500ms cubic-bezier(0.22,1,0.36,1)",
          transform: hovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 0 0 1px rgba(255,255,255,.10), 0 6px 14px rgba(0,0,0,.30), 0 28px 64px -20px rgba(0,0,0,.50)"
            : "0 0 0 1px rgba(255,255,255,.05), 0 1px 3px rgba(0,0,0,.20), 0 8px 22px -12px rgba(0,0,0,.30)",
        }}
      >
        {/* ── Image area ──────────────────────────────── */}
        <div
          className="relative overflow-hidden bg-section/30"
          style={{ aspectRatio: "1 / 1" }}
        >
          {/* Badges — top-left */}
          {(product.badge || discount) && (
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
              {product.badge && <Badge tone="dark" className="px-3 py-1.5 text-[11px] tracking-wide">{product.badge}</Badge>}
              {discount       && <Badge tone="primary" className="px-3 py-1.5 text-[11px] tracking-wide">−{discount}%</Badge>}
            </div>
          )}

          {/* Wishlist — top-right */}
          <motion.button
            onClick={(e) => { e.stopPropagation(); toggle(product); }}
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={liked}
            whileTap={{ scale: 0.88 }}
            className={`absolute top-3 right-3 z-10 flex items-center justify-center transition-all duration-350 ${
              liked
                ? "text-primary"
                : "text-white/90 hover:text-white"
            }`}
            style={{
              width: 40, height: 40, borderRadius: "50%",
              backdropFilter: "blur(8px)",
              background: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <FiHeart size={15} className={liked ? "fill-current" : ""} />
          </motion.button>

          {/* Images — default & hover */}
          <div className="absolute inset-0">
            {/* Default */}
            <div className="absolute inset-0 transition-opacity duration-500"
              style={{ opacity: hovered ? 0 : 1 }}>
              <CloudinaryImage src={product.image} alt={product.name} aspect="h-full" />
            </div>
            {/* Hover / alt */}
            <div className="absolute inset-0 transition-all duration-700"
              style={{ opacity: hovered ? 1 : 0 }}>
              <CloudinaryImage
                src={product.hoverImage || product.image}
                alt=""
                aspect="h-full"
                className="scale-100 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Bottom action bar — slides up on hover */}
          <div
            className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3.5 transition-all duration-400"
            style={{
              transform: hovered ? "translateY(0)" : "translateY(105%)",
              opacity: hovered ? 1 : 0,
              transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setQuickOpen(true); }}
              className="flex-1 flex items-center justify-center gap-1.5 bg-section/95 backdrop-blur-sm hover:bg-primary hover:text-section transition-all duration-300 font-bold uppercase text-ink"
              style={{ borderRadius: 14, height: 42, fontSize: 10.5, letterSpacing: "0.1em", boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }}
            >
              <FiEye size={12} />
              Quick View
            </button>
            <motion.button
              onClick={handleAdd}
              aria-label={`Add ${product.name} to bag`}
              whileTap={{ scale: 0.90 }}
              className={`flex items-center justify-center shrink-0 transition-all duration-300 ${
                justAdded ? "bg-success" : "bg-primary hover:bg-primary-dark"
              } text-section`}
              style={{
                width: 42, height: 42, borderRadius: "50%",
                boxShadow: justAdded
                  ? "0 6px 18px rgba(0,200,83,0.38)"
                  : "0 6px 18px rgba(255,203,116,0.35)",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {justAdded
                  ? <motion.span key="c" initial={{ scale: 0, rotate: -12 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}><FiCheck size={15} className="text-white" /></motion.span>
                  : <motion.span key="b" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><FiShoppingBag size={14} /></motion.span>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* ── Content area ────────────────────────────── */}
        <div className="flex flex-col gap-1.5 flex-1" style={{ padding: "14px 16px 16px" }}>
          {/* Category */}
          <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-primary)" }}>
            {product.category}
          </span>

          {/* Name */}
          <h3 className="font-semibold text-ink line-clamp-2 leading-snug"
            style={{ 
              fontSize: "clamp(14px, 1.6vw, 15.5px)", 
              letterSpacing: "-0.005em", 
              lineHeight: 1.36,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "calc(1.36em * 2)"
            }}>
            {product.name}
          </h3>

          {/* Rating row */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="flex items-center gap-[2px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar key={i} size={9.5}
                  className={`text-primary ${i < Math.round(product.rating) ? "fill-current" : "opacity-22"}`} />
              ))}
            </div>
            <span style={{ fontSize: 11.5, color: "var(--color-text-muted)" }}>({product.reviews})</span>
            <span className="ml-auto stock-chip">{product.stock}</span>
          </div>

          {/* Price + cart */}
          <div className="flex flex-col gap-3 mt-3 pt-3" style={{ borderTop: "1px solid var(--color-border)" }}>
            <div className="flex items-baseline gap-2">
              <span style={{ fontSize: 18, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.025em" }}>
                ${product.price}
              </span>
              {product.oldPrice && (
                <span style={{ fontSize: 12.5, color: "var(--color-text-secondary)", textDecoration: "line-through" }}>
                  ${product.oldPrice}
                </span>
              )}
            </div>

            {/* Full-width Add to Cart button */}
            <motion.button
              onClick={handleAdd}
              whileTap={{ scale: 0.98 }}
              aria-label={`Add ${product.name} to bag`}
              className={`w-full py-2.5 flex items-center justify-center gap-2 font-bold uppercase transition-all duration-300 ${
                justAdded ? "bg-success text-white" : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
              }`}
              style={{
                borderRadius: 12,
                fontSize: 11.5,
                letterSpacing: "0.08em",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {justAdded
                  ? <motion.span key="c" initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} className="flex items-center gap-1.5"><FiCheck size={14} /> Added</motion.span>
                  : <motion.span key="b" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5"><FiShoppingBag size={13} /> Add to Cart</motion.span>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.article>

      {/* ══ Quick View portal ══════════════════════════ */}
      {createPortal(
        <AnimatePresence>
          {quickOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.24 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-[4px] z-[9998]"
                onClick={() => setQuickOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 24 }}
                animate={{ opacity: 1, scale: 1,    y: 0  }}
                exit={{   opacity: 0, scale: 0.93,  y: 16 }}
                transition={{ duration: 0.34, ease }}
                role="dialog" aria-modal="true" aria-label={`${product.name} quick view`}
                className="bg-surface grid grid-cols-1 md:grid-cols-2"
                style={{
                  position: "fixed",
                  top: "50%", left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 9999,
                  width: "min(92vw, 700px)",
                  maxHeight: "88vh",
                  overflowY: "auto",
                  borderRadius: 32,
                  boxShadow: "0 48px 120px -24px rgba(0,0,0,0.80), 0 8px 32px rgba(0,0,0,0.50), inset 0 0 0 1px var(--color-border)",
                }}
              >
                {/* Close */}
                <button onClick={() => setQuickOpen(false)} aria-label="Close"
                  className="absolute top-4 right-4 z-20 flex items-center justify-center bg-section/80 backdrop-blur hover:bg-primary hover:text-section transition-all duration-300 text-ink"
                  style={{ width: 36, height: 36, borderRadius: "50%", boxShadow: "0 2px 8px rgba(0,0,0,0.50)", border: "1px solid var(--color-border)" }}>
                  <FiX size={15} />
                </button>

                {/* Image */}
                <div className="bg-section overflow-hidden" style={{ minHeight: 340, borderRadius: "32px 0 0 32px" }}>
                  <CloudinaryImage src={product.image} alt={product.name} aspect="h-full" />
                </div>

                {/* Details */}
                <div className="flex flex-col gap-4 overflow-y-auto" style={{ padding: "36px 32px" }}>
                  <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-primary)" }}>
                    {product.category}
                  </span>

                  <h3 className="font-bold text-ink" style={{ fontSize: "clamp(20px, 3vw, 26px)", lineHeight: 1.16, letterSpacing: "-0.02em" }}>
                    {product.name}
                  </h3>

                  {/* Stars */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-[2px]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar key={i} size={12} className={`text-primary ${i < Math.round(product.rating) ? "fill-current" : "opacity-20"}`} />
                      ))}
                    </div>
                    <span style={{ fontSize: 12.5, color: "var(--color-text-muted)" }}>{product.rating} · {product.reviews} reviews</span>
                    <span className="ml-auto stock-chip" style={{ fontSize: 10.5 }}>{product.stock}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 pt-1">
                    <span style={{ fontSize: 28, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.03em" }}>
                      ${product.price}
                    </span>
                    {product.oldPrice && (
                      <span style={{ fontSize: 15, color: "var(--color-text-muted)", textDecoration: "line-through" }}>${product.oldPrice}</span>
                    )}
                    {discount && (
                      <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-primary)", background: "rgba(255,203,116,0.09)", borderRadius: 99, padding: "4px 10px" }}>
                        Save {discount}%
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: 13.5, color: "var(--color-text-muted)", fontWeight: 300, lineHeight: 1.84 }}
                    className="border-t border-line/20 pt-4">
                    A hand-finished piece from our {product.category?.toLowerCase()} edit, styled
                    and packed the day it ships. Every detail — from ribbon to wrapping — is handled with care.
                  </p>

                  <div className="flex items-center gap-3 mt-1">
                    <button
                      onClick={() => { handleAdd(); setQuickOpen(false); }}
                      className="btn-primary flex-1 !text-section"
                    >
                      Add To Bag
                    </button>
                    <motion.button
                      onClick={() => toggle(product)}
                      whileTap={{ scale: 0.88 }}
                      className={`flex items-center justify-center border transition-all duration-300 ${
                        liked ? "bg-primary border-primary text-section" : "border-line/30 text-ink hover:border-primary hover:text-primary"
                      }`}
                      style={{ width: 50, height: 50, borderRadius: "50%", flexShrink: 0 }}
                      aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <FiHeart size={16} className={liked ? "fill-current" : ""} />
                    </motion.button>
                  </div>

                  {/* Trust badges */}
                  <div className="flex flex-col gap-2.5 pt-4 border-t border-line/20">
                    {[
                      { e: "🚚", t: "Free delivery on orders over GHS 500" },
                      { e: "🌹", t: "Finished by hand the morning it ships" },
                      { e: "↩️", t: "14-day hassle-free returns" },
                    ].map(({ e, t }) => (
                      <div key={t} className="flex items-center gap-2.5" style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
                        <span style={{ fontSize: 14 }}>{e}</span> {t}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
