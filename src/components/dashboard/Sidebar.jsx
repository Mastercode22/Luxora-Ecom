import { NavLink } from "react-router-dom";
import { 
  FiGrid, FiUser, FiShoppingBag, FiHeart, 
  FiMapPin, FiCreditCard, FiBell, FiShield, 
  FiStar, FiClock, FiAward, FiLogOut, FiSettings 
} from "react-icons/fi";
import { useUser } from "../../context/UserContext";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/account", icon: FiGrid, exact: true },
  { label: "My Profile", path: "/account/profile", icon: FiUser },
  { label: "Orders", path: "/account/orders", icon: FiShoppingBag },
  { label: "Wishlist", path: "/account/wishlist", icon: FiHeart },
  { label: "Addresses", path: "/account/addresses", icon: FiMapPin },
  { label: "Payment Methods", path: "/account/payments", icon: FiCreditCard },
  { label: "Notifications", path: "/account/notifications", icon: FiBell },
  { label: "Security", path: "/account/security", icon: FiShield },
  { label: "Reviews", path: "/account/reviews", icon: FiStar },
  { label: "Recently Viewed", path: "/account/recent", icon: FiClock },
  { label: "Coupons & Rewards", path: "/account/rewards", icon: FiAward },
  { label: "Preferences", path: "/account/preferences", icon: FiSettings },
];

export default function Sidebar({ onNavigate }) {
  const { user } = useUser();

  return (
    <div className="flex flex-col h-full">
      {/* User summary snippet */}
      <div className="flex items-center gap-4 mb-8 px-2">
        <img 
          src={user.profile.avatar} 
          alt="Avatar" 
          className="w-12 h-12 rounded-full object-cover border border-primary/30"
        />
        <div>
          <p className="text-white font-medium">{user.profile.fullName}</p>
          <p className="text-white/50 text-sm font-sans">{user.rewards.level}</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1.5 flex-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.exact}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium group relative overflow-hidden ${
                  isActive
                    ? "text-white bg-primary shadow-[0_4px_20px_-4px_rgba(233,30,99,0.3)]"
                    : "text-white/70 hover:text-white hover:bg-secondary/50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className={isActive ? "text-white" : "text-white/60 group-hover:text-primary transition-colors"} />
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-8 pt-6 border-t border-line/60">
        <button 
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all font-medium text-left"
          onClick={() => {
            // Mock logout
            window.location.href = "/LuxoraGift-ReactApp/";
          }}
        >
          <FiLogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
