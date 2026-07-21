import { NavLink } from "react-router-dom";
import { FiGrid, FiUser, FiShoppingBag, FiHeart, FiMapPin, FiCreditCard, FiBell, FiShield, FiStar, FiClock, FiAward, FiLogOut, FiSettings, FiShoppingCart } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useNotifications } from "../../context/NotificationContext";
import { useNavigate } from "react-router-dom";
const NAV_ITEMS = [{
  labelKey: "dashboard.dashboard",
  fallback: "Dashboard",
  path: "/account",
  icon: FiGrid,
  exact: true
}, {
  labelKey: "navbar.profile",
  fallback: "My Profile",
  path: "/account/profile",
  icon: FiUser
}, {
  labelKey: "dashboard.orders",
  fallback: "Orders",
  path: "/account/orders",
  icon: FiShoppingBag
}, {
  labelKey: "dashboard.wishlist",
  fallback: "Wishlist",
  path: "/account/wishlist",
  icon: FiHeart,
  badge: "wishlist"
}, {
  labelKey: "dashboard.cart",
  fallback: "Cart",
  path: "/account/cart",
  icon: FiShoppingCart,
  badge: "cart"
}, {
  labelKey: "dashboard.addresses",
  fallback: "Addresses",
  path: "/account/addresses",
  icon: FiMapPin
}, {
  labelKey: "dashboard.payments",
  fallback: "Payment Methods",
  path: "/account/payments",
  icon: FiCreditCard
}, {
  labelKey: "dashboard.notifications",
  fallback: "Notifications",
  path: "/account/notifications",
  icon: FiBell,
  badge: "notifications"
}, {
  labelKey: "dashboard.security",
  fallback: "Security",
  path: "/account/security",
  icon: FiShield
}, {
  labelKey: "dashboard.reviews",
  fallback: "Reviews",
  path: "/account/reviews",
  icon: FiStar
}, {
  labelKey: "dashboard.recent",
  fallback: "Recently Viewed",
  path: "/account/recent",
  icon: FiClock
}, {
  labelKey: "dashboard.coupons",
  fallback: "Coupons & Rewards",
  path: "/account/rewards",
  icon: FiAward
}, {
  labelKey: "dashboard.preferences",
  fallback: "Preferences",
  path: "/account/preferences",
  icon: FiSettings
}];
export default function Sidebar({
  onNavigate
}) {
    const {
    user
  } = useAuth();
  const {
    logout
  } = useAuth();
  const {
    count: cartCount
  } = useCart();
  const {
    count: wishlistCount
  } = useWishlist();
  let unreadCount = 0;
  try {
    unreadCount = useNotifications().unreadCount;
  } catch (e) {}
  const navigate = useNavigate();
  const getBadgeValue = type => {
    if (type === "cart") return cartCount;
    if (type === "wishlist") return wishlistCount;
    if (type === "notifications") return unreadCount;
    return 0;
  };
  return <div className="flex flex-col h-full">
      {/* User summary snippet */}
      <div className="flex items-center gap-4 mb-8 px-2">
        <img src={user.profile.avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover border border-primary/30" />
        <div>
          <p className="text-ink font-medium">{user.profile.fullName}</p>
          <p className="text-ink/50 text-sm font-sans">{user.rewards.level}</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1.5 flex-1">
        {NAV_ITEMS.map(item => {
        const Icon = item.icon;
        const label = item.fallback;
        return <NavLink key={item.labelKey} to={item.path} end={item.exact} onClick={onNavigate} className={({
          isActive
        }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium group relative overflow-hidden ${isActive ? "text-ink bg-primary shadow-[0_4px_20px_-4px_rgba(233,30,99,0.3)]" : "text-ink/70 hover:text-ink hover:bg-secondary/50"}`}>
              {({
            isActive
          }) => <>
                  <Icon size={18} className={isActive ? "text-ink" : "text-ink/60 group-hover:text-primary transition-colors"} />
                  <span className="relative z-10 flex-1">{label}</span>
                  {item.badge && getBadgeValue(item.badge) > 0 && <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${isActive ? "bg-ink text-surface" : item.badge === "notifications" ? "bg-red-500/20 text-red-500" : "bg-primary/20 text-primary"}`}>
                      {getBadgeValue(item.badge)}
                    </span>}
                  {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />}
                </>}
            </NavLink>;
      })}
      </nav>

      <div className="mt-8 pt-6 border-t border-line/60">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all font-medium text-left" onClick={() => {
        logout();
        navigate("/");
        if (onNavigate) onNavigate();
      }}>
          <FiLogOut size={18} />
          <span>{"Logout"}</span>
        </button>
      </div>
    </div>;
}