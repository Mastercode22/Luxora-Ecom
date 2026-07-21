import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { FiPlus, FiTrash2, FiCreditCard, FiStar } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function PaymentMethods() {
  const { user } = useUser();
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif italic text-3xl text-ink">Payment Methods</h1>
          <p className="text-ink/60 mt-1">Manage your saved credit cards and payment accounts.</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-all shadow-[0_4px_20px_-4px_rgba(233,30,99,0.3)]"
          >
            <FiPlus size={18} /> Add Payment Method
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-3xl p-6 md:p-8 overflow-hidden"
          >
            <h2 className="text-xl font-serif italic text-ink mb-6">Add New Card</h2>
            <form onSubmit={(e) => { e.preventDefault(); setIsAdding(false); }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-ink/70 text-sm font-medium">Card Number</label>
                <div className="relative">
                  <FiCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/50" size={18} />
                  <input required placeholder="0000 0000 0000 0000" className="w-full bg-secondary/30 border border-line/50 rounded-xl pl-11 pr-4 py-3 text-ink focus:outline-none focus:border-primary/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-ink/70 text-sm font-medium">Expiry Date</label>
                <input required placeholder="MM/YY" className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-ink/70 text-sm font-medium">CVC</label>
                <input required placeholder="123" className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-primary/50" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-ink/70 text-sm font-medium">Name on Card</label>
                <input required placeholder="John Doe" className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-primary/50" />
              </div>
              <div className="md:col-span-2 flex gap-4 pt-4">
                <button type="submit" className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all">Save Card</button>
                <button type="button" onClick={() => setIsAdding(false)} className="px-8 py-3 bg-secondary/50 hover:bg-secondary text-ink font-medium rounded-xl transition-all">Cancel</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user.payments.map((card) => (
          <div key={card.id} className={`bg-gradient-to-br from-surface to-secondary backdrop-blur-md border ${card.isDefault ? 'border-primary/50 shadow-[0_0_20px_-5px_rgba(233,30,99,0.15)]' : 'border-line/60'} rounded-2xl p-6 relative group overflow-hidden`}>
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            
            {card.isDefault && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 text-primary bg-primary/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <FiStar className="fill-current" size={12} /> Default
              </div>
            )}
            
            <div className="mb-8 flex justify-between items-start">
              <div className="text-2xl italic font-bold text-ink/90">
                {card.type}
              </div>
              <FiCreditCard size={24} className="text-ink/40" />
            </div>

            <div className="text-ink tracking-[0.2em] font-mono mb-6 text-lg">
              •••• •••• •••• {card.last4}
            </div>

            <div className="flex justify-between items-end text-sm text-ink/70">
              <div>
                <p className="text-xs text-ink/40 mb-1 uppercase tracking-wider">Card Holder</p>
                <p className="font-medium text-ink">{card.cardholder}</p>
              </div>
              <div>
                <p className="text-xs text-ink/40 mb-1 uppercase tracking-wider text-right">Expires</p>
                <p className="font-medium text-ink text-right">{card.expiry}</p>
              </div>
            </div>

            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary/80 hover:bg-secondary text-ink rounded-xl text-sm font-medium transition-colors">
                <FiStar size={16} /> Set Default
              </button>
              <button className="flex items-center justify-center p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-colors">
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {/* Add new card placeholder */}
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex flex-col items-center justify-center h-full min-h-[220px] bg-secondary/20 hover:bg-secondary/40 border border-dashed border-line/60 rounded-2xl transition-colors group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <FiPlus size={24} />
            </div>
            <span className="text-ink/70 font-medium">Add New Method</span>
          </button>
        )}
      </div>
    </div>
  );
}
