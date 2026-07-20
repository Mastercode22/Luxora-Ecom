import { useUser } from "../../context/UserContext";
import { FiDownload, FiEye, FiSearch, FiPackage } from "react-icons/fi";
import { motion } from "framer-motion";

export default function OrderHistory() {
  const { user } = useUser();

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Processing": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Pending": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "Cancelled": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-secondary text-white/70";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif italic text-3xl text-white">Order History</h1>
          <p className="text-white/60 mt-1">Track, return, or purchase items again.</p>
        </div>
        
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="w-full sm:w-64 bg-secondary/30 border border-line/60 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-primary/50 text-sm transition-colors"
          />
        </div>
      </div>

      <div className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-3xl overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-line/60 bg-secondary/30">
                <th className="p-6 text-white/50 font-medium text-sm tracking-wider uppercase">Order ID</th>
                <th className="p-6 text-white/50 font-medium text-sm tracking-wider uppercase">Date</th>
                <th className="p-6 text-white/50 font-medium text-sm tracking-wider uppercase">Items</th>
                <th className="p-6 text-white/50 font-medium text-sm tracking-wider uppercase">Total</th>
                <th className="p-6 text-white/50 font-medium text-sm tracking-wider uppercase">Status</th>
                <th className="p-6 text-white/50 font-medium text-sm tracking-wider uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/30">
              {user.orders.map((order, idx) => (
                <motion.tr 
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="hover:bg-secondary/20 transition-colors"
                >
                  <td className="p-6">
                    <span className="text-white font-bold">{order.id}</span>
                  </td>
                  <td className="p-6 text-white/70">{order.date}</td>
                  <td className="p-6 text-white/70">{order.items} items</td>
                  <td className="p-6 text-white font-medium">${order.total.toFixed(2)}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 bg-secondary/50 hover:bg-secondary text-white rounded-lg transition-colors tooltip-trigger" title="View Details">
                        <FiEye size={16} />
                      </button>
                      <button className="p-2 bg-secondary/50 hover:bg-secondary text-white rounded-lg transition-colors tooltip-trigger" title="Download Invoice">
                        <FiDownload size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-line/30">
          {user.orders.map((order, idx) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">{order.id}</h3>
                  <p className="text-white/50 text-sm">{order.date}</p>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between py-4 border-y border-line/30">
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <FiPackage /> {order.items} items
                </div>
                <div className="text-white font-bold">${order.total.toFixed(2)}</div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-secondary/50 hover:bg-secondary text-white rounded-xl text-sm font-medium transition-colors">
                  <FiEye size={16} /> Details
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-secondary/50 hover:bg-secondary text-white rounded-xl text-sm font-medium transition-colors">
                  <FiDownload size={16} /> Invoice
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {user.orders.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4 text-white/30">
              <FiShoppingBag size={32} />
            </div>
            <h3 className="text-xl text-white font-serif italic mb-2">No Orders Yet</h3>
            <p className="text-white/50 max-w-md mx-auto">When you place an order, it will appear here so you can easily track its status.</p>
          </div>
        )}
      </div>
    </div>
  );
}
