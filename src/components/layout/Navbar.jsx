import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown,
  FiTrash2,
  FiMinus,
  FiPlus,
  FiChevronRight,
  FiArrowRight,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import Container from "../ui/Container";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useTheme } from "../../context/ThemeContext";

const ease = [0.22, 1, 0.36, 1];

const navLinks = [
  { label: "Home", href: "/#top" },
  {
    label: "Shop",
    href: "/#shop",
    mega: [
      {
        title: "Flowers",
        items: [
          "Rose Bouquets",
          "Peony Arrangements",
          "Sunflowers",
          "Everyday Blooms",
        ],
      },
      {
        title: "Gifting",
        items: [
          "Luxury Hampers",
          "Chocolate & Sweets",
          "Jewelry & Keepsakes",
          "Candles & Spa",
        ],
      },
      {
        title: "Occasions",
        items: ["Birthday", "Wedding & Bridal", "Baby Shower", "Anniversary"],
      },
    ],
  },
  { label: "Occasions", href: "/#occasions" },
  { label: "Collections", href: "/#collections" },
  { label: "Corporate", href: "/#corporate" },
  { label: "About", href: "/#about" },
];

const MEGA_FEATURED = {
  image:
    "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?q=80&w=600&auto=format&fit=crop",
  label: "The Valentine Edit",
  sub: "Hand-tied arrangements, delivered same day.",
};

/* Rotating concierge line — quiet, editorial, never shouty */
const TOPBAR_MESSAGES = [
  "Complimentary hand-tied wrapping on every order",
  "Same-day delivery across Accra, before 2pm",
  "Speak with our floral concierge — chat now",
];

/* ─── Icon button base style ──────────────────────── */
const IB =
  "relative flex items-center justify-center w-10 h-10 rounded-full text-ink/65 transition-all duration-300 hover:bg-secondary hover:text-primary";

/* ─── Drawer/panel reusable shell ── */
const Panel = ({ open, onClose, title, children, footer }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="fixed inset-0 bg-ink/48 backdrop-blur-[3px] z-[9998]"
          onClick={onClose}
        />
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.42, ease }}
          className="fixed top-0 right-0 bottom-0 w-[90vw] max-w-sm bg-surface z-[9999] flex flex-col"
          style={{
            boxShadow:
              "-20px 0 60px rgba(0,0,0,0.10), -4px 0 16px rgba(0,0,0,0.06)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-7 py-5 border-b border-line shrink-0">
            <span className="font-serif italic text-[22px] text-ink leading-none">
              {title}
            </span>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full text-ink/50 hover:bg-secondary hover:text-primary transition-all duration-250"
              aria-label="Close"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="border-t border-line shrink-0">{footer}</div>
          )}
        </motion.aside>
      </>
    )}
  </AnimatePresence>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMega, setOpenMega] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState(null);
  const [msgIndex, setMsgIndex] = useState(0);
  const searchRef = useRef(null);
  const megaTimeout = useRef(null);

  const {
    items: cartItems,
    count: cartCount,
    subtotal,
    isOpen: cartOpen,
    removeItem,
    updateQty,
    openCart,
    closeCart,
  } = useCart();

  const {
    items: wishlistItems,
    count: wishlistCount,
    isOpen: wishlistOpen,
    remove: removeWishlist,
    openWishlist,
    closeWishlist,
  } = useWishlist();

  const { theme, toggleTheme } = useTheme();

  /* Scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Rotating concierge line */
  useEffect(() => {
    const id = setInterval(
      () => setMsgIndex((i) => (i + 1) % TOPBAR_MESSAGES.length),
      4200,
    );
    return () => clearInterval(id);
  }, []);

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow =
      drawerOpen || cartOpen || wishlistOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen, cartOpen, wishlistOpen]);

  const enterMega = (label) => {
    clearTimeout(megaTimeout.current);
    setOpenMega(label);
  };
  const leaveMega = () => {
    megaTimeout.current = setTimeout(() => setOpenMega(null), 110);
  };



  const getIBClass = (isOpen = false) => {
    if (scrolled) {
      return `relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
        isOpen ? "bg-secondary text-primary" : "text-ink/65 hover:bg-secondary hover:text-primary"
      }`;
    } else {
      return `relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
        isOpen ? "bg-white/15 text-white" : "text-white/80 hover:bg-white/15 hover:text-white"
      }`;
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
        style={{ paddingTop: "10px", paddingBottom: "10px", paddingLeft: "16px", paddingRight: "16px" }}
      >
        {/* Floating pill wrapper */}
        <div
          className="mx-auto"
          style={{
            maxWidth: "1200px",
            borderRadius: "9999px",
            // Premium gradient glassmorphism background
            background: scrolled
              ? "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(233,30,99,0.10) 40%, rgba(180,120,255,0.10) 70%, rgba(201,164,74,0.12) 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(233,30,99,0.07) 40%, rgba(180,120,255,0.07) 70%, rgba(201,164,74,0.08) 100%)",
            backdropFilter: "blur(20px) saturate(1.8)",
            WebkitBackdropFilter: "blur(20px) saturate(1.8)",
            // Gradient border
            border: "1px solid",
            borderColor: scrolled
              ? "rgba(233,30,99,0.25)"
              : "rgba(255,255,255,0.18)",
            boxShadow: scrolled
              ? "0 8px 32px -8px rgba(233,30,99,0.20), 0 24px 48px -16px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.25)"
              : "0 4px 24px -8px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
        {/* ════ Main row ════════════════════════════════ */}
      <Container
        className="flex items-center justify-between"
        style={{ height: "clamp(54px, 6vw, 64px)", gap: 24, paddingLeft: "clamp(16px, 3vw, 32px)", paddingRight: "clamp(16px, 3vw, 32px)" }}
      >
        {/* Logo — with signature drawn flourish */}
        <a
          href="/#top"
          aria-label="Luxora — Home"
          className="relative flex items-end gap-1.5 shrink-0 group"
        >
          <span
            className={`font-serif italic group-hover:text-primary transition-colors duration-350 ${scrolled ? "text-ink" : "text-white"}`}
            style={{
              fontSize: "clamp(22px, 2.8vw, 28px)",
              lineHeight: 1,
              letterSpacing: "-0.01em",
            }}
          >
            Luxora
          </span>
          <span
            className="font-sans font-bold text-primary mb-[2px]"
            style={{
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Gifts
          </span>

          {/* Hand-drawn stem flourish, traces in on hover */}
          <svg
            aria-hidden="true"
            width="86"
            height="14"
            viewBox="0 0 86 14"
            className="absolute -bottom-2 left-0 pointer-events-none overflow-visible"
          >
            <motion.path
              d="M1 3 C 22 3, 30 11, 48 6 S 74 1, 85 7"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="1.4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileHover={{ pathLength: 1, opacity: 0.85 }}
              animate={{ pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease }}
            />
            <motion.circle
              cx="85"
              cy="7"
              r="1.6"
              fill="var(--color-primary)"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.85 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            />
          </svg>
        </a>

        {/* Desktop nav */}
        <nav
          className="hidden lg:flex items-center"
          style={{ gap: "clamp(16px, 2.2vw, 32px)" }}
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative group/link"
              onMouseEnter={() => link.mega && enterMega(link.label)}
              onMouseLeave={() => link.mega && leaveMega()}
            >
              <a
                href={link.href}
                className={`relative flex items-center gap-1 py-2 font-medium transition-colors duration-250 ${
                  scrolled ? "text-ink hover:text-primary" : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
                {link.mega && (
                  <motion.span
                    animate={{ rotate: openMega === link.label ? 180 : 0 }}
                    transition={{ duration: 0.22 }}
                    style={{ display: "flex", opacity: 0.55, fontSize: 11 }}
                  >
                    <FiChevronDown />
                  </motion.span>
                )}
                {/* Center-out underline */}
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 -bottom-0.5 h-[1.5px] w-0 -translate-x-1/2 bg-primary transition-all duration-300 ease-out group-hover/link:w-full"
                />
              </a>

              {/* Mega menu */}
              <AnimatePresence>
                {link.mega && openMega === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 14, scale: 0.975 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.975 }}
                    transition={{ duration: 0.22, ease }}
                    onMouseEnter={() => enterMega(link.label)}
                    onMouseLeave={leaveMega}
                    className="absolute left-1/2 -translate-x-1/2 top-full bg-surface border border-line/60 overflow-hidden z-50"
                    style={{
                      marginTop: 18,
                      width: 620,
                      borderRadius: 24,
                      boxShadow:
                        "0 24px 64px -18px rgba(0,0,0,0.20), 0 6px 18px rgba(0,0,0,0.07)",
                    }}
                  >
                    {/* thin gold hairline crown */}
                    <div
                      style={{
                        height: 2,
                        background:
                          "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
                      }}
                    />

                    <div className="grid grid-cols-[1fr_1fr_1fr_172px]">
                      <div
                        className="col-span-3 grid grid-cols-3 p-8"
                        style={{ gap: 0 }}
                      >
                        {link.mega.map((col, ci) => (
                          <div
                            key={col.title}
                            className="flex flex-col"
                            style={{
                              gap: 10,
                              paddingRight: ci < 2 ? 24 : 0,
                              paddingLeft: ci > 0 ? 24 : 0,
                              borderRight:
                                ci < 2
                                  ? "1px solid var(--color-border)"
                                  : "none",
                            }}
                          >
                            <p
                              style={{
                                fontSize: 9.5,
                                fontWeight: 700,
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                color: "var(--color-primary)",
                                marginBottom: 4,
                              }}
                            >
                              {col.title}
                            </p>
                            {col.items.map((item) => (
                              <a
                                key={item}
                                href="#"
                                className="group/i flex items-center gap-1.5 hover:text-primary transition-colors duration-200"
                                style={{
                                  fontSize: 12.5,
                                  color: "var(--color-text-secondary)",
                                }}
                              >
                                <FiChevronRight
                                  style={{
                                    fontSize: 9,
                                    opacity: 0,
                                    transition: "opacity 0.2s, transform 0.2s",
                                  }}
                                  className="group-hover/i:opacity-100 group-hover/i:translate-x-0.5 text-primary"
                                />
                                {item}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>

                      {/* Featured panel */}
                      <div className="relative overflow-hidden bg-secondary/40">
                        <img
                          src={MEGA_FEATURED.image}
                          alt=""
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover opacity-75 transition-transform duration-700 hover:scale-105"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)",
                          }}
                        />
                        <div className="absolute bottom-5 left-4 right-4">
                          <p
                            style={{
                              fontSize: 9.5,
                              color: "rgba(255,255,255,0.65)",
                              textTransform: "uppercase",
                              letterSpacing: "0.1em",
                              fontWeight: 600,
                              marginBottom: 4,
                            }}
                          >
                            {MEGA_FEATURED.label}
                          </p>
                          <p
                            className="font-serif italic"
                            style={{
                              fontSize: 13.5,
                              color: "#fff",
                              lineHeight: 1.4,
                            }}
                          >
                            {MEGA_FEATURED.sub}
                          </p>
                          <button
                            className="flex items-center gap-1 mt-2.5 hover:text-white transition-colors"
                            style={{
                              fontSize: 10.5,
                              color: "rgba(255,255,255,0.7)",
                              fontWeight: 600,
                              letterSpacing: "0.04em",
                            }}
                          >
                            Shop Now <FiArrowRight style={{ fontSize: 9.5 }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Icon cluster */}
        <div className="flex items-center" style={{ gap: 2 }}>
          {/* Theme Toggle */}
          <button
            aria-label="Toggle Theme"
            onClick={toggleTheme}
            className={`${getIBClass()} overflow-hidden`}
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.div
                  key="moon"
                  initial={{ y: -20, opacity: 0, rotate: -30 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 30 }}
                  transition={{ duration: 0.24 }}
                >
                  <FiMoon size={17} />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ y: -20, opacity: 0, rotate: 30 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: -30 }}
                  transition={{ duration: 0.24 }}
                >
                  <FiSun size={17} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <button
            aria-label="Search"
            onClick={() => {
              setSearchOpen((v) => !v);
              setProfileOpen(false);
            }}
            className={`${getIBClass(searchOpen)} hidden sm:flex`}
          >
            <FiSearch size={17} />
          </button>

          <button
            aria-label={`Wishlist (${wishlistCount})`}
            onClick={openWishlist}
            className={getIBClass()}
          >
            <FiHeart size={17} />
            {wishlistCount > 0 && (
              <motion.span
                key={wishlistCount}
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                className="absolute top-0.5 right-0.5 bg-primary text-white rounded-full flex items-center justify-center font-bold tabular-nums"
                style={{
                  width: 17,
                  height: 17,
                  fontSize: 9,
                  boxShadow: "0 0 0 2px var(--color-surface)",
                }}
              >
                {wishlistCount}
              </motion.span>
            )}
          </button>

          <button
            aria-label={`Cart (${cartCount})`}
            onClick={openCart}
            className={getIBClass()}
          >
            <FiShoppingBag size={17} />
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                className="absolute top-0.5 right-0.5 bg-primary text-white rounded-full flex items-center justify-center font-bold tabular-nums"
                style={{
                  width: 17,
                  height: 17,
                  fontSize: 9,
                  boxShadow: "0 0 0 2px var(--color-surface)",
                }}
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          {/* Profile dropdown */}
          <div className="relative hidden sm:block">
            <button
              aria-label="Account"
              onClick={() => {
                setProfileOpen((v) => !v);
                setSearchOpen(false);
              }}
              className={getIBClass(profileOpen)}
            >
              <FiUser size={17} />
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.18, ease }}
                  className="absolute right-0 top-full bg-surface border border-line/60 flex flex-col p-1.5 z-50"
                  style={{
                    marginTop: 10,
                    width: 204,
                    borderRadius: 18,
                    boxShadow:
                      "0 12px 40px -10px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.06)",
                  }}
                >
                  {[
                    { l: "Sign In", e: "👤" },
                    { l: "Create Account", e: "✨" },
                    { l: "Track Order", e: "📦" },
                  ].map(({ l, e }) => (
                    <button
                      key={l}
                      onClick={() => setProfileOpen(false)}
                      className="text-left flex items-center gap-2.5 rounded-[13px] px-3.5 py-2.5 hover:bg-surface/50 hover:text-primary transition-colors duration-200"
                      style={{
                        fontSize: 12.5,
                        color: "var(--color-text-secondary)",
                        fontWeight: 500,
                      }}
                    >
                      <span style={{ fontSize: 14 }}>{e}</span> {l}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            className={`${getIBClass()} lg:hidden`}
          >
            <FiMenu size={19} />
          </button>
        </div>
      </Container>
        </div>{/* end pill */}
      </header>

      {/* ════ Search bar ══════════════════════════════ */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden bg-surface/96 backdrop-blur-xl border-t border-line/50"
          >
            <Container className="py-4">
              <div className="flex items-center gap-3 bg-section border border-line/60 rounded-pill px-6 py-3.5 max-w-2xl mx-auto transition-shadow duration-300 focus-within:shadow-[0_0_0_3px_var(--color-primary)1A] focus-within:border-primary/50">
                <FiSearch size={15} className="text-muted shrink-0" />
                <label htmlFor="site-search" className="sr-only">
                  Search
                </label>
                <input
                  id="site-search"
                  ref={searchRef}
                  autoFocus
                  type="search"
                  placeholder="Search gifts, flowers, hampers…"
                  className="flex-1 bg-transparent focus:outline-none placeholder:text-muted/55 text-ink"
                  style={{ fontSize: 14 }}
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="text-ink/35 hover:text-primary transition-colors p-1"
                >
                  <FiX size={18} />
                </button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════ Mobile nav drawer ══════════════════════ */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="fixed inset-0 bg-ink/48 backdrop-blur-[2px] z-[9998]"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease }}
              className="fixed top-0 right-0 bottom-0 w-[84vw] max-w-[340px] bg-surface z-[9999] flex flex-col overflow-y-auto"
              style={{ boxShadow: "-20px 0 60px rgba(0,0,0,0.10)" }}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-line shrink-0">
                <span className="font-serif italic text-[22px] text-ink">
                  Luxora
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary text-ink/50 hover:text-primary transition-all duration-250"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Mobile search */}
              <div className="px-5 py-4 border-b border-line/60">
                <div className="flex items-center gap-2.5 bg-section rounded-pill border border-line/50 px-4 py-3">
                  <FiSearch size={14} className="text-muted shrink-0" />
                  <input
                    type="search"
                    placeholder="Search gifts…"
                    className="flex-1 bg-transparent focus:outline-none placeholder:text-muted/55"
                    style={{ fontSize: 13 }}
                  />
                </div>
              </div>

              <nav className="flex-1 px-4 py-3">
                {navLinks.map((link) => (
                  <div
                    key={link.label}
                    style={{ borderBottom: "1px solid var(--color-border)80" }}
                    className="last:border-0"
                  >
                    {link.mega ? (
                      <>
                        <button
                          onClick={() =>
                            setExpandedMobile(
                              expandedMobile === link.label ? null : link.label,
                            )
                          }
                          className="w-full flex items-center justify-between px-3 py-4 hover:text-primary transition-colors duration-200"
                          style={{
                            fontSize: 11.5,
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          {link.label}
                          <motion.span
                            animate={{
                              rotate: expandedMobile === link.label ? 90 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <FiChevronRight size={12} />
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {expandedMobile === link.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22 }}
                              className="overflow-hidden"
                            >
                              {link.mega.map((col) => (
                                <div key={col.title} className="px-4 pb-4">
                                  <p
                                    style={{
                                      fontSize: 9.5,
                                      fontWeight: 700,
                                      letterSpacing: "0.14em",
                                      textTransform: "uppercase",
                                      color: "var(--color-primary)",
                                      marginBottom: 8,
                                    }}
                                  >
                                    {col.title}
                                  </p>
                                  {col.items.map((item) => (
                                    <a
                                      key={item}
                                      href="#"
                                      onClick={() => setDrawerOpen(false)}
                                      className="block py-1.5 hover:text-primary transition-colors"
                                      style={{
                                        fontSize: 13,
                                        color: "var(--color-text-muted)",
                                      }}
                                    >
                                      {item}
                                    </a>
                                  ))}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <a
                        href={link.href}
                        onClick={() => setDrawerOpen(false)}
                        className="block px-3 py-4 hover:text-primary transition-colors duration-200"
                        style={{
                          fontSize: 11.5,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {link.label}
                      </a>
                    )}
                  </div>
                ))}
              </nav>

              <div className="px-6 py-5 border-t border-line bg-surface/50/70 shrink-0 flex items-center gap-4">
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    setTimeout(openWishlist, 240);
                  }}
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                  style={{ fontSize: 12.5, color: "var(--color-text-secondary)" }}
                >
                  <FiHeart size={14} /> Wishlist{" "}
                  {wishlistCount > 0 && `(${wishlistCount})`}
                </button>
                <button
                  className="flex items-center gap-2 hover:text-primary transition-colors ml-auto"
                  style={{ fontSize: 12.5, color: "var(--color-text-secondary)" }}
                >
                  <FiUser size={14} /> Sign In
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ════ Cart drawer ═════════════════════════════ */}
      <Panel
        open={cartOpen}
        onClose={closeCart}
        title={
          <>
            Your Bag{" "}
            {cartCount > 0 && (
              <span className="text-primary">({cartCount})</span>
            )}
          </>
        }
        footer={
          cartItems.length > 0 && (
            <div className="p-6 flex flex-col gap-4 bg-surface/50/50">
              <div className="flex items-center justify-between">
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                  }}
                >
                  Subtotal
                </span>
                <span
                  style={{
                    fontSize: 19,
                    fontWeight: 800,
                    color: "var(--color-text-primary)",
                  }}
                >
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p style={{ fontSize: 11, color: "var(--color-text-muted)" }}>
                Shipping & taxes calculated at checkout
              </p>
              <button className="btn-primary w-full">Checkout</button>
            </div>
          )
        }
      >
        <div className="flex flex-col gap-1 p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
              <div className="w-20 h-20 rounded-full bg-surface/50 flex items-center justify-center text-3xl">
                🛍️
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: 15,
                    color: "var(--color-text-primary)",
                  }}
                >
                  Your bag is empty
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--color-text-muted)",
                    marginTop: 4,
                  }}
                >
                  Start adding pieces you love.
                </p>
              </div>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={() => removeItem(item.id)}
                onQty={(qty) => updateQty(item.id, qty)}
              />
            ))
          )}
        </div>
      </Panel>

      {/* ════ Wishlist drawer ══════════════════════════ */}
      <Panel
        open={wishlistOpen}
        onClose={closeWishlist}
        title={
          <>
            Wishlist{" "}
            {wishlistCount > 0 && (
              <span className="text-primary">({wishlistCount})</span>
            )}
          </>
        }
      >
        <div className="flex flex-col gap-1 p-6">
          {wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
              <div className="w-20 h-20 rounded-full bg-surface/50 flex items-center justify-center text-3xl">
                🤍
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: 15,
                    color: "var(--color-text-primary)",
                  }}
                >
                  Nothing saved yet
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--color-text-muted)",
                    marginTop: 4,
                  }}
                >
                  Tap the heart on anything you love.
                </p>
              </div>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <WishlistItem
                key={item.id}
                item={item}
                onRemove={() => removeWishlist(item.id)}
              />
            ))
          )}
        </div>
      </Panel>
    </>
  );
}

/* ─── Cart item row ─────────────────────────────── */
function CartItem({ item, onRemove, onQty }) {
  return (
    <div className="flex gap-4 py-4 border-b border-line/50 last:border-0">
      <div
        className="rounded-[14px] overflow-hidden shrink-0 bg-secondary"
        style={{ width: 74, height: 74 }}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 74 74'%3E%3Crect width='74' height='74' fill='%23FCE4EC'/%3E%3C/svg%3E";
          }}
        />
      </div>
      <div className="flex-1 flex flex-col gap-1.5 min-w-0">
        <p
          className="font-semibold text-ink truncate leading-snug"
          style={{ fontSize: 13.5 }}
        >
          {item.name}
        </p>
        <p style={{ fontSize: 12.5, color: "var(--color-text-muted)" }}>
          ${item.price}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <button
            onClick={() => onQty(item.qty - 1)}
            className="w-7 h-7 rounded-full border border-line flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-200"
            aria-label="Decrease"
            style={{ fontSize: 11 }}
          >
            <FiMinus />
          </button>
          <span
            className="tabular-nums font-semibold w-5 text-center"
            style={{ fontSize: 13 }}
          >
            {item.qty}
          </span>
          <button
            onClick={() => onQty(item.qty + 1)}
            className="w-7 h-7 rounded-full border border-line flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-200"
            aria-label="Increase"
            style={{ fontSize: 11 }}
          >
            <FiPlus />
          </button>
          <button
            onClick={onRemove}
            aria-label={`Remove ${item.name}`}
            className="ml-auto text-ink/28 hover:text-primary transition-colors"
            style={{ fontSize: 13 }}
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Wishlist item row ─────────────────────────── */
function WishlistItem({ item, onRemove }) {
  return (
    <div className="flex gap-4 py-4 border-b border-line/50 last:border-0">
      <div
        className="rounded-[14px] overflow-hidden shrink-0 bg-secondary"
        style={{ width: 74, height: 74 }}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 74 74'%3E%3Crect width='74' height='74' fill='%23FCE4EC'/%3E%3C/svg%3E";
          }}
        />
      </div>
      <div className="flex-1 flex flex-col gap-1 justify-center min-w-0">
        <p
          className="font-semibold text-ink truncate leading-snug"
          style={{ fontSize: 13.5 }}
        >
          {item.name}
        </p>
        <p style={{ fontSize: 12.5, color: "var(--color-text-muted)" }}>
          ${item.price}
        </p>
      </div>
      <button
        onClick={onRemove}
        aria-label={`Remove ${item.name}`}
        className="text-ink/28 hover:text-primary transition-colors self-start mt-1"
        style={{ fontSize: 13 }}
      >
        <FiTrash2 />
      </button>
    </div>
  );
}
