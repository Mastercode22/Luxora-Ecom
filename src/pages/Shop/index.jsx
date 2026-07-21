import { useState, useMemo, useEffect } from "react";
import Container from "../../components/ui/Container";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { products as allProducts } from "../../data/products";
import ShopHero from "./ShopHero";
import ShopToolbar from "./ShopToolbar";
import ShopFilters from "./ShopFilters";
import ShopProductGrid from "./ShopProductGrid";
import QuickViewModal from "./QuickViewModal";
const ITEMS_PER_PAGE = 24;
export default function Shop() {
  
// Persistence via Local Storage
  const [viewMode, setViewMode] = useLocalStorage("luxora_view_mode", "grid"); // "grid", "compact", "list"
  const [filters, setFilters] = useLocalStorage("luxora_filters", {
    categories: [],
    brands: [],
    priceRange: [0, 5000],
    badges: []
  });
  const [sortBy, setSortBy] = useLocalStorage("luxora_sort", "featured");

  // Ephemeral State
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Scroll to top when filters change heavily
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [filters, searchQuery, sortBy]);

  // Derived state (Filtering & Sorting)
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    // Categories
    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }

    // Brands
    if (filters.brands.length > 0) {
      result = result.filter(p => filters.brands.includes(p.brand));
    }

    // Price
    result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    // Badges (NEW, SALE, BEST SELLER, etc)
    if (filters.badges.length > 0) {
      result = result.filter(p => {
        if (!p.badge) return false;
        return filters.badges.includes(p.badge.toUpperCase());
      });
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // Fallback to ID sorting or badge if no date exists
        result.sort((a, b) => a.badge === "New" ? -1 : 1);
        break;
      case "a-z":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-a":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "featured":
      default:
        // Assume default array order is featured
        break;
    }
    return result;
  }, [searchQuery, filters, sortBy]);
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  return <div className="min-h-screen pb-24 pt-[100px]">
      <ShopHero count={filteredProducts.length} />
      
      <Container>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-72 shrink-0">
            <ShopFilters filters={filters} setFilters={setFilters} products={allProducts} />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <ShopToolbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} viewMode={viewMode} setViewMode={setViewMode} sortBy={sortBy} setSortBy={setSortBy} onOpenMobileDrawer={() => setMobileDrawerOpen(true)} resultsCount={filteredProducts.length} />

            <ShopProductGrid products={visibleProducts} viewMode={viewMode} onQuickView={setQuickViewProduct} />

            {visibleCount < filteredProducts.length && <div className="mt-12 flex justify-center">
                <button onClick={() => setVisibleCount(v => v + ITEMS_PER_PAGE)} className="px-8 py-3 bg-secondary/50 hover:bg-secondary text-ink rounded-xl font-medium transition-colors">Load More Produ</button>
              </div>}
          </div>
        </div>
      </Container>

      {/* Mobile Filters Drawer */}
      <ShopFilters filters={filters} setFilters={setFilters} products={allProducts} isMobileDrawer isOpen={mobileDrawerOpen} onClose={() => setMobileDrawerOpen(false)} />

      {/* Quick View Modal */}
      {quickViewProduct && <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />}
    </div>;
}