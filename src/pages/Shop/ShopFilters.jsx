import { useState, useMemo } from "react";
import { FiX, FiCheck, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
export default function ShopFilters({
  filters,
  setFilters,
  products,
  isMobileDrawer,
  isOpen,
  onClose
}) {
    // Extract unique categories and brands from products
  const categories = useMemo(() => {
    const cats = {};
    products.forEach(p => {
      cats[p.category] = (cats[p.category] || 0) + 1;
    });
    return Object.entries(cats).sort((a, b) => b[1] - a[1]);
  }, [products]);
  const brands = useMemo(() => {
    const brs = {};
    products.forEach(p => {
      brs[p.brand] = (brs[p.brand] || 0) + 1;
    });
    return Object.entries(brs).sort((a, b) => b[1] - a[1]);
  }, [products]);
  const badges = ["NEW", "SALE", "BEST SELLER"];
  const handleCategoryToggle = category => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category) ? prev.categories.filter(c => c !== category) : [...prev.categories, category]
    }));
  };
  const handleBrandToggle = brand => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand) ? prev.brands.filter(b => b !== brand) : [...prev.brands, brand]
    }));
  };
  const handleBadgeToggle = badge => {
    setFilters(prev => ({
      ...prev,
      badges: prev.badges.includes(badge) ? prev.badges.filter(b => b !== badge) : [...prev.badges, badge]
    }));
  };
  const clearAll = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: [0, 5000],
      badges: []
    });
  };
  const activeFilterCount = filters.categories.length + filters.brands.length + filters.badges.length + (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000 ? 1 : 0);
  const FilterContent = () => {
    return <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-line/30">
        <h2 className="text-xl font-serif italic text-ink">Filters</h2>
        {activeFilterCount > 0 && <button onClick={clearAll} className="text-sm text-primary hover:underline font-medium">Clear All</button>}
      </div>

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && <div className="flex flex-wrap gap-2">
          {filters.categories.map(c => <div key={c} className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-medium">
               {c} <button onClick={() => handleCategoryToggle(c)}><FiX size={12} /></button>
             </div>)}
          {filters.brands.map(b => <div key={b} className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-medium">
               {b} <button onClick={() => handleBrandToggle(b)}><FiX size={12} /></button>
             </div>)}
          {filters.badges.map(b => <div key={b} className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-medium">
               {b} <button onClick={() => handleBadgeToggle(b)}><FiX size={12} /></button>
             </div>)}
        </div>}

      {/* Categories */}
      <div className="space-y-4">
        <h3 className="font-medium text-ink flex items-center justify-between">Category</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
          {categories.map(([cat, count]) => <button key={cat} type="button" onClick={() => handleCategoryToggle(cat)} className="w-full flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.categories.includes(cat) ? 'bg-primary border-primary text-white' : 'border-line/60 bg-surface group-hover:border-primary/50'}`}>
                  {filters.categories.includes(cat) && <FiCheck size={12} />}
                </div>
                <span className={`text-sm ${filters.categories.includes(cat) ? 'text-ink font-medium' : 'text-ink/70 group-hover:text-ink'}`}>{cat}</span>
              </div>
              <span className="text-xs text-ink/40 bg-secondary/50 px-2 py-0.5 rounded-full">{count}</span>
            </button>)}
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-4 pt-6 border-t border-line/30">
        <h3 className="font-medium text-ink flex items-center justify-between">Brand</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
          {brands.map(([brand, count]) => <button key={brand} type="button" onClick={() => handleBrandToggle(brand)} className="w-full flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.brands.includes(brand) ? 'bg-primary border-primary text-white' : 'border-line/60 bg-surface group-hover:border-primary/50'}`}>
                  {filters.brands.includes(brand) && <FiCheck size={12} />}
                </div>
                <span className={`text-sm ${filters.brands.includes(brand) ? 'text-ink font-medium' : 'text-ink/70 group-hover:text-ink'}`}>{brand}</span>
              </div>
              <span className="text-xs text-ink/40 bg-secondary/50 px-2 py-0.5 rounded-full">{count}</span>
            </button>)}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4 pt-6 border-t border-line/30">
        <h3 className="font-medium text-ink flex items-center justify-between">Price Range</h3>
        <div className="space-y-4">
          <input type="range" min="0" max="5000" step="50" value={filters.priceRange[1]} onChange={e => setFilters(prev => ({
            ...prev,
            priceRange: [prev.priceRange[0], parseInt(e.target.value)]
          }))} className="w-full h-1 bg-line/50 rounded-lg appearance-none cursor-pointer accent-primary" />
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 bg-surface border border-line/60 rounded-lg px-3 py-2 flex items-center gap-2">
              <span className="text-ink/50 text-sm">$</span>
              <input type="number" value={filters.priceRange[0]} onChange={e => setFilters(prev => ({
                ...prev,
                priceRange: [parseInt(e.target.value) || 0, prev.priceRange[1]]
              }))} className="w-full bg-transparent text-sm text-ink focus:outline-none" />
            </div>
            <span className="text-ink/30">-</span>
            <div className="flex-1 bg-surface border border-line/60 rounded-lg px-3 py-2 flex items-center gap-2">
              <span className="text-ink/50 text-sm">$</span>
              <input type="number" value={filters.priceRange[1]} onChange={e => setFilters(prev => ({
                ...prev,
                priceRange: [prev.priceRange[0], parseInt(e.target.value) || 5000]
              }))} className="w-full bg-transparent text-sm text-ink focus:outline-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="space-y-4 pt-6 border-t border-line/30">
        <h3 className="font-medium text-ink flex items-center justify-between">Highlights</h3>
        <div className="flex flex-wrap gap-2">
          {badges.map(badge => <button key={badge} onClick={() => handleBadgeToggle(badge)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filters.badges.includes(badge) ? 'bg-primary text-white shadow-[0_0_15px_-3px_rgba(233,30,99,0.4)]' : 'bg-surface border border-line/60 text-ink/70 hover:border-primary/50 hover:text-ink'}`}>
              {badge}
            </button>)}
        </div>
      </div>
    </div>;
  };
  if (isMobileDrawer) {
    return <AnimatePresence>
        {isOpen && <>
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={onClose} className="fixed inset-0 bg-ink/70 backdrop-blur-sm z-[9998]" />
            <motion.div initial={{
          x: "100%"
        }} animate={{
          x: 0
        }} exit={{
          x: "100%"
        }} transition={{
          type: "spring",
          damping: 25,
          stiffness: 200
        }} className="fixed inset-y-0 right-0 w-[340px] max-w-full bg-surface border-l border-line/60 z-[9999] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <div className="flex justify-end mb-4">
                  <button onClick={onClose} className="p-2 bg-secondary/50 rounded-full text-ink hover:bg-secondary"><FiX size={20} /></button>
                </div>
                <FilterContent />
              </div>
              <div className="sticky bottom-0 p-6 bg-surface/90 backdrop-blur-md border-t border-line/30">
                <button onClick={onClose} className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25">Apply Filters</button>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>;
  }

  // Desktop Permanent Sidebar
  return <div className="sticky top-[130px] p-6 bg-surface/50 backdrop-blur-md border border-line/60 rounded-3xl">
      <FilterContent />
    </div>;
}