import { useRecentlyViewed } from "../../context/RecentlyViewedContext";
import ProductCard from "../../components/home/ProductCard";
import { FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";
export default function RecentlyViewedTab() {
  
const {
    recentlyViewed = []
  } = useRecentlyViewed();
  return <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif italic text-3xl text-ink">Recently Viewed</h1>
          <p className="text-ink/60 mt-1">Products Youve</p>
        </div>
      </div>

      {recentlyViewed.length > 0 ? <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {recentlyViewed.map(product => <ProductCard key={product.id} product={product} />)}
        </div> : <div className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-3xl p-12 text-center">
          <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4 text-ink/30">
            <FiClock size={32} />
          </div>
          <h3 className="text-xl text-ink font-serif italic mb-2">No Recently Vie</h3>
          <p className="text-ink/50 max-w-md mx-auto mb-6">You Havent Bro</p>
          <Link to="/#shop" className="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-colors">Start Shopping</Link>
        </div>}
    </div>;
}