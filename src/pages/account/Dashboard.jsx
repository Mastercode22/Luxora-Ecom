import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useNotifications } from "../../context/NotificationContext";
import { FiShoppingBag, FiHeart, FiGift, FiAward, FiChevronRight, FiStar, FiMessageSquare, FiEye, FiShoppingCart, FiMapPin, FiBell } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export default function Overview() {
  
const {
    user
  } = useAuth();
  const {
    count: cartCount
  } = useCart();
  const {
    unreadCount
  } = useNotifications();
  const stats = [{
    label: "Orders",
    value: user?.orders?.length || 0,
    icon: FiShoppingBag,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    path: "/account/orders"
  }, {
    label: "Wishlist",
    value: user?.wishlist?.length || 0,
    icon: FiHeart,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    path: "/account/wishlist"
  }, {
    label: "Cart Items",
    value: cartCount,
    icon: FiShoppingCart,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    path: "/account"
  }, {
    label: "Coupons",
    value: user?.rewards?.coupons?.length || 0,
    icon: FiGift,
    color: "text-green-400",
    bg: "bg-green-400/10",
    path: "/account/rewards"
  }, {
    label: "Reward Points",
    value: user?.rewards?.points || 0,
    icon: FiAward,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    path: "/account/rewards"
  }, {
    label: "Notifications",
    value: unreadCount,
    icon: FiBell,
    color: "text-red-400",
    bg: "bg-red-400/10",
    path: "/account/notifications"
  }, {
    label: "Addresses",
    value: user?.addresses?.length || 0,
    icon: FiMapPin,
    color: "text-teal-400",
    bg: "bg-teal-400/10",
    path: "/account/addresses"
  }, {
    label: "Reviews",
    value: user?.reviews?.length || 0,
    icon: FiMessageSquare,
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
    path: "/account/reviews"
  }, {
    label: "Recently Viewed",
    value: user?.recentlyViewed?.length || 0,
    icon: FiEye,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    path: "/account/recent"
  }];
  return <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-[#0a0a0a] text-white p-8 md:p-12 shadow-2xl">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/40 via-[#0a0a0a] to-[#0a0a0a]"></div>
          <motion.div animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }} transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }} className="absolute -top-20 -right-20 w-80 h-80 bg-primary/30 rounded-full blur-[80px]" />
          <motion.div animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2]
        }} transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }} className="absolute -bottom-20 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-white mb-3">Good Evening,<br className="hidden md:block" />
              <span className="not-italic font-sans font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                {user.profile.fullName}
              </span>
            </motion.h1>
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.1
          }} className="text-white/70 text-lg flex items-center gap-2">
              <FiStar className="text-primary" />Member Since {user?.profile?.memberSince && user.profile.memberSince !== "2023" ? user.profile.memberSince : new Date().getFullYear()} • {user?.rewards?.level || "Silver Member"}
            </motion.p>
          </div>
          
          <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: 0.2
        }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center min-w-[200px]">
            <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-1">Available Points</p>
            <p className="text-4xl font-bold text-white">{user.rewards.points}</p>
            <Link to="/account/rewards" className="inline-block mt-4 text-sm text-primary hover:text-white transition-colors">Redeem Rewards &rarr;</Link>
          </motion.div>
        </div>
      </div>

      <div className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-2xl p-4 sm:p-0 sm:bg-transparent sm:border-transparent overflow-hidden">
        <div className="grid grid-cols-4 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
          {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return <motion.div key={stat.label} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: idx * 0.1
          }}>
                <Link to={stat.path} className="flex flex-col items-center sm:items-start group sm:bg-surface/50 sm:backdrop-blur-md sm:border sm:border-line/60 sm:rounded-2xl sm:p-6 transition-all duration-300 sm:hover:bg-secondary/40 sm:hover:border-primary/50 relative overflow-hidden h-full">
                  <div className="hidden sm:flex items-center justify-between w-full mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                      <Icon size={24} />
                    </div>
                    <FiChevronRight className="text-ink/30 group-hover:text-primary transition-colors group-hover:translate-x-1" size={20} />
                  </div>
                  
                  {/* Mobile icon (small, round) */}
                  <div className={`flex sm:hidden w-10 h-10 rounded-full items-center justify-center ${stat.bg} ${stat.color} transition-transform group-hover:scale-110 mb-2`}>
                    <Icon size={18} />
                  </div>

                  <h3 className="text-xl sm:text-3xl font-bold text-ink mb-0.5 sm:mb-1">{stat.value}</h3>
                  <p className="text-ink/60 text-[10px] sm:text-sm font-medium text-center sm:text-left leading-tight">{stat.label}</p>
                </Link>
              </motion.div>;
        })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders Snippet */}
        <div className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif italic text-ink">Recent Orders</h2>
            <Link to="/account/orders" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {user.orders.slice(0, 2).map(order => <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-line/30">
                <div>
                  <p className="text-ink font-medium mb-1">{order.id}</p>
                  <p className="text-ink/50 text-xs">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-ink font-medium">${order.total.toFixed(2)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' : order.status === 'Processing' ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    {order.status}
                  </span>
                </div>
              </div>)}
          </div>
        </div>

        {/* Profile Snippet */}
        <div className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif italic text-ink">Profile Details</h2>
            <Link to="/account/profile" className="text-sm text-primary hover:underline">Edit</Link>
          </div>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b border-line/30 pb-3">
              <span className="text-ink/50">Full Name</span>
              <span className="text-ink">{user.profile.fullName}</span>
            </div>
            <div className="flex justify-between border-b border-line/30 pb-3">
              <span className="text-ink/50">Email</span>
              <span className="text-ink">{user.profile.email}</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-ink/50">Phone</span>
              <span className="text-ink">{user.profile.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
}