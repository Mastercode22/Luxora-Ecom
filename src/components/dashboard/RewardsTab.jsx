import { useUser } from "../../context/UserContext";
import { FiAward, FiGift, FiCopy, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState } from "react";

export default function RewardsTab() {
  const { user } = useUser();
  const [copied, setCopied] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const progress = (user.rewards.points / user.rewards.nextLevelAt) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif italic text-3xl text-white">Coupons & Rewards</h1>
        <p className="text-white/60 mt-1">View your loyalty status and available discounts.</p>
      </div>

      {/* Loyalty Status */}
      <div className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <FiAward size={28} />
            </div>
            <div>
              <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-1">Current Tier</p>
              <h2 className="text-2xl font-serif italic text-white">{user.rewards.level}</h2>
            </div>
          </div>
          <div className="md:text-right">
            <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-1">Available Points</p>
            <h2 className="text-3xl font-bold text-amber-400">{user.rewards.points.toLocaleString()}</h2>
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex justify-between text-sm text-white/70 mb-2">
            <span>{user.rewards.points} pts</span>
            <span>{user.rewards.nextLevelAt} pts</span>
          </div>
          <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
            />
          </div>
          <p className="text-white/50 text-xs mt-3 text-center">
            Earn {user.rewards.nextLevelAt - user.rewards.points} more points to reach the Platinum tier!
          </p>
        </div>
      </div>

      {/* Coupons */}
      <div>
        <h2 className="text-xl font-serif italic text-white mb-6">Available Coupons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {user.rewards.coupons.map((coupon, idx) => (
            <motion.div 
              key={coupon.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-surface/50 backdrop-blur-md border ${coupon.status === 'Available' ? 'border-primary/50' : 'border-line/60 opacity-60'} rounded-3xl p-6 relative overflow-hidden`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`text-2xl font-bold ${coupon.status === 'Available' ? 'text-primary' : 'text-white/50'}`}>
                  {coupon.discount}
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${coupon.status === 'Available' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-secondary text-white/50 border-line/30'}`}>
                  {coupon.status}
                </div>
              </div>
              
              <h3 className="text-white font-medium mb-4">{coupon.description}</h3>
              
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-white/70 font-mono text-sm tracking-widest text-center">
                  {coupon.id}
                </div>
                {coupon.status === 'Available' && (
                  <button 
                    onClick={() => handleCopy(coupon.id)}
                    className="p-3 bg-secondary/50 hover:bg-secondary text-white rounded-xl transition-colors"
                  >
                    {copied === coupon.id ? <FiCheck className="text-green-400" /> : <FiCopy />}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
