import { useUser } from "../../context/UserContext";
import ProductCard from "../home/ProductCard";
import { FiHeart } from "react-icons/fi";

export default function WishlistTab() {
  const { user } = useUser();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif italic text-3xl text-white">My Wishlist</h1>
          <p className="text-white/60 mt-1">Products you have saved for later.</p>
        </div>
        <div className="text-primary font-medium bg-primary/10 px-4 py-2 rounded-xl">
          {user.wishlist.length} Items Saved
        </div>
      </div>

      {user.wishlist.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {user.wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-3xl p-12 text-center">
          <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4 text-white/30">
            <FiHeart size={32} />
          </div>
          <h3 className="text-xl text-white font-serif italic mb-2">Your wishlist is empty</h3>
          <p className="text-white/50 max-w-md mx-auto">Explore our marketplace and tap the heart icon to save your favorite items here.</p>
        </div>
      )}
    </div>
  );
}
