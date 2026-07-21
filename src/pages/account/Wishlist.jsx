import { useWishlist } from "../../context/WishlistContext";
import ProductCard from "../../components/home/ProductCard";
import { FiHeart } from "react-icons/fi";
export default function WishlistTab() {
  
const {
    items: wishlist
  } = useWishlist();
  return <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif italic text-3xl text-ink">My Wishlist</h1>
          <p className="text-ink/60 mt-1">Products You Ha</p>
        </div>
        <div className="text-primary font-medium bg-primary/10 px-4 py-2 rounded-xl">
          {wishlist.length}"Items Saved"</div>
      </div>

      {wishlist.length > 0 ? <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {wishlist.map(product => <ProductCard key={product.id} product={product} />)}
        </div> : <div className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-3xl p-12 text-center">
          <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4 text-ink/30">
            <FiHeart size={32} />
          </div>
          <h3 className="text-xl text-ink font-serif italic mb-2">Your Wishlist I</h3>
          <p className="text-ink/50 max-w-md mx-auto">Explore Our Mar</p>
        </div>}
    </div>;
}