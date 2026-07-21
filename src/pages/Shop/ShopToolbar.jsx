import { FiSearch, FiGrid, FiList, FiFilter, FiChevronDown } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
export default function ShopToolbar({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  onOpenMobileDrawer,
  resultsCount
}) {
  
const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef();
  const sortOptions = [{
    id: "featured",
    label: "Featured"
  }, {
    id: "newest",
    label: "Newest First"
  }, {
    id: "price-asc",
    label: "Price Low to High"
  }, {
    id: "price-desc",
    label: "Price High to Low"
  }, {
    id: "rating",
    label: "Highest Rated"
  }, {
    id: "a-z",
    label: "Alphabetical A-Z"
  }, {
    id: "z-a",
    label: "Alphabetical Z-A"
  }];
  useEffect(() => {
    const handleClickOutside = e => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      {/* Search Bar */}
      <div className="relative w-full md:w-96">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/50" size={20} />
        <input type="text" placeholder="Search Products" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-surface border border-line/60 rounded-xl pl-12 pr-4 py-3.5 text-ink placeholder:text-ink/40 focus:outline-none focus:border-primary/50 transition-colors shadow-sm" />
      </div>

      <div className="flex items-center gap-3">
        {/* Mobile Filter Button */}
        <button onClick={onOpenMobileDrawer} className="lg:hidden flex items-center justify-center gap-2 px-4 py-3.5 bg-surface border border-line/60 rounded-xl text-ink font-medium">
          <FiFilter size={18} />Filters</button>

        {/* View Modes */}
        <div className="hidden sm:flex items-center p-1 bg-surface border border-line/60 rounded-xl">
          <button onClick={() => setViewMode("grid")} className={`p-2.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-secondary text-ink shadow-sm' : 'text-ink/40 hover:text-ink'}`} title="Grid View">
            <FiGrid size={20} />
          </button>
          <button onClick={() => setViewMode("list")} className={`p-2.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-secondary text-ink shadow-sm' : 'text-ink/40 hover:text-ink'}`} title="List View">
            <FiList size={20} />
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="relative" ref={sortRef}>
          <button onClick={() => setIsSortOpen(!isSortOpen)} className="flex items-center justify-between gap-3 w-48 px-4 py-3.5 bg-surface border border-line/60 rounded-xl text-ink font-medium hover:border-primary/50 transition-colors shadow-sm">
            <span className="truncate">{sortOptions.find(o => o.id === sortBy)?.label || "Sort By"}</span>
            <FiChevronDown className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isSortOpen && <motion.div initial={{
            opacity: 0,
            y: 10,
            scale: 0.95
          }} animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }} exit={{
            opacity: 0,
            y: 10,
            scale: 0.95
          }} transition={{
            duration: 0.2
          }} className="absolute right-0 top-full mt-2 w-56 bg-surface border border-line/60 rounded-xl shadow-xl overflow-hidden z-40">
                {sortOptions.map(option => <button key={option.id} onClick={() => {
              setSortBy(option.id);
              setIsSortOpen(false);
            }} className={`w-full text-left px-4 py-3 text-sm transition-colors ${sortBy === option.id ? 'bg-primary/10 text-primary font-medium' : 'text-ink hover:bg-secondary/50'}`}>
                    {option.label}
                  </button>)}
              </motion.div>}
          </AnimatePresence>
        </div>
      </div>
    </div>;
}