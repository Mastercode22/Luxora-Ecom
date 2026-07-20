import { useUser } from "../../context/UserContext";
import { FiShoppingBag, FiHeart, FiGift, FiAward, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Overview() {
  const { user } = useUser();

  const stats = [
    { label: "Orders", value: user.orders.length, icon: FiShoppingBag, color: "text-blue-400", bg: "bg-blue-400/10", path: "/account/orders" },
    { label: "Wishlist", value: user.wishlist.length, icon: FiHeart, color: "text-red-400", bg: "bg-red-400/10", path: "/account/wishlist" },
    { label: "Coupons", value: user.rewards.coupons.length, icon: FiGift, color: "text-green-400", bg: "bg-green-400/10", path: "/account/rewards" },
    { label: "Reward Points", value: user.rewards.points, icon: FiAward, color: "text-amber-400", bg: "bg-amber-400/10", path: "/account/rewards" },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-surface/60 backdrop-blur-md border border-line/60 rounded-3xl p-8 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        
        <h1 className="font-serif italic text-3xl md:text-4xl text-white mb-2 relative z-10">
          Good Evening, <br className="sm:hidden" />
          <span className="text-primary not-italic font-sans font-medium">{user.profile.fullName}</span>
        </h1>
        <p className="text-white/60 relative z-10">Member since {user.profile.memberSince} • {user.rewards.level}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link to={stat.path} className="block group">
                <div className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-2xl p-6 transition-all duration-300 hover:bg-secondary/40 hover:border-primary/50 relative overflow-hidden h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                      <Icon size={24} />
                    </div>
                    <FiChevronRight className="text-white/30 group-hover:text-primary transition-colors group-hover:translate-x-1" size={20} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-white/60 text-sm font-medium">{stat.label}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders Snippet */}
        <div className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif italic text-white">Recent Orders</h2>
            <Link to="/account/orders" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {user.orders.slice(0, 2).map(order => (
              <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-line/30">
                <div>
                  <p className="text-white font-medium mb-1">{order.id}</p>
                  <p className="text-white/50 text-xs">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">${order.total.toFixed(2)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                    order.status === 'Processing' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Snippet */}
        <div className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif italic text-white">Profile Details</h2>
            <Link to="/account/profile" className="text-sm text-primary hover:underline">Edit</Link>
          </div>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b border-line/30 pb-3">
              <span className="text-white/50">Full Name</span>
              <span className="text-white">{user.profile.fullName}</span>
            </div>
            <div className="flex justify-between border-b border-line/30 pb-3">
              <span className="text-white/50">Email</span>
              <span className="text-white">{user.profile.email}</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-white/50">Phone</span>
              <span className="text-white">{user.profile.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
