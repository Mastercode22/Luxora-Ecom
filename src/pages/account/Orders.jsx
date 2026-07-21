import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../context/OrdersContext";
import { FiDownload, FiEye, FiSearch, FiPackage, FiX, FiPrinter, FiShoppingBag } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
export default function OrderHistory() {
    const {
    user
  } = useAuth();
  const {
    orders
  } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const handlePrint = () => {
    window.print();
  };
  const getStatusColor = status => {
    switch (status) {
      case "Delivered":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Processing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Pending":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "Cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-secondary text-ink/70";
    }
  };
  return <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif italic text-3xl text-ink">Order History</h1>
          <p className="text-ink/60 mt-1">Track Return</p>
        </div>
        
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/50" />
          <input type="text" placeholder="Search Orders" className="w-full sm:w-64 bg-secondary/30 border border-line/60 rounded-xl pl-11 pr-4 py-3 text-ink focus:outline-none focus:border-primary/50 text-sm transition-colors" />
        </div>
      </div>

      <div className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-3xl overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-line/60 bg-secondary/30">
                <th className="p-6 text-ink/50 font-medium text-sm tracking-wider uppercase">Order Id</th>
                <th className="p-6 text-ink/50 font-medium text-sm tracking-wider uppercase">Date</th>
                <th className="p-6 text-ink/50 font-medium text-sm tracking-wider uppercase">Items</th>
                <th className="p-6 text-ink/50 font-medium text-sm tracking-wider uppercase">Total</th>
                <th className="p-6 text-ink/50 font-medium text-sm tracking-wider uppercase">Status</th>
                <th className="p-6 text-ink/50 font-medium text-sm tracking-wider uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/30">
              {orders.map((order, idx) => {
              if (!order) return null;
              return <motion.tr key={order.id} initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: idx * 0.1
              }} className="hover:bg-secondary/20 transition-colors">
                  <td className="p-6">
                    <span className="text-ink font-bold">{order.id}</span>
                  </td>
                  <td className="p-6 text-ink/70">{order.date || 'N/A'}</td>
                  <td className="p-6 text-ink/70">{order.items || 0}"Items"</td>
                  <td className="p-6 text-ink font-medium">${(order.total || 0).toFixed(2)}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setSelectedOrder(order)} className="p-2 bg-secondary/50 hover:bg-secondary text-ink rounded-lg transition-colors tooltip-trigger" title="View Details">
                        <FiEye size={16} />
                      </button>
                      <button onClick={() => {
                      setSelectedOrder(order);
                      setTimeout(handlePrint, 300);
                    }} className="p-2 bg-secondary/50 hover:bg-secondary text-ink rounded-lg transition-colors tooltip-trigger" title="Download Invoic">
                        <FiDownload size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>;
            })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-line/30">
          {orders.map((order, idx) => {
          if (!order) return null;
          return <motion.div key={order.id} initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: idx * 0.1
          }} className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-ink font-bold text-lg mb-1">{order.id || 'N/A'}</h3>
                  <p className="text-ink/50 text-sm">{order.date || 'N/A'}</p>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between py-4 border-y border-line/30">
                <div className="flex items-center gap-3 text-ink/70 text-sm">
                  <FiPackage /> {order.items || 0}"Items"</div>
                <div className="text-ink font-bold">${(order.total || 0).toFixed(2)}</div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setSelectedOrder(order)} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-secondary/50 hover:bg-secondary text-ink rounded-xl text-sm font-medium transition-colors">
                  <FiEye size={16} />Details</button>
                <button onClick={() => {
                setSelectedOrder(order);
                setTimeout(handlePrint, 300);
              }} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-secondary/50 hover:bg-secondary text-ink rounded-xl text-sm font-medium transition-colors">
                  <FiDownload size={16} />Invoice</button>
              </div>
            </motion.div>;
        })}
        </div>

        {orders.length === 0 && <div className="p-12 text-center">
            <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4 text-ink/30">
              <FiShoppingBag size={32} />
            </div>
            <h3 className="text-xl text-ink font-serif italic mb-2">No Orders Yet</h3>
            <p className="text-ink/50 max-w-md mx-auto">When You Place</p>
          </div>}
      </div>

      <AnimatePresence>
        {selectedOrder && <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={() => setSelectedOrder(null)} className="absolute inset-0 bg-ink/60 backdrop-blur-sm print:hidden" />
            <motion.div initial={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }} animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }} exit={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }} className="bg-surface border border-line/60 rounded-3xl w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]" id="invoice-modal">
              {/* Header */}
              <div className="p-6 border-b border-line/30 flex items-center justify-between bg-secondary/20">
                <div>
                  <h2 className="text-2xl font-serif italic text-ink">"Order"{selectedOrder?.id || 'N/A'}</h2>
                  <p className="text-ink/60 text-sm mt-1">{selectedOrder?.date || 'N/A'}</p>
                </div>
                <div className="flex items-center gap-3 print:hidden">
                  <button onClick={handlePrint} className="p-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors tooltip-trigger" title="Print Invoice">
                    <FiPrinter size={18} />
                  </button>
                  <button onClick={() => setSelectedOrder(null)} className="p-2.5 bg-secondary hover:bg-secondary/80 text-ink rounded-xl transition-colors">
                    <FiX size={18} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto print:overflow-visible">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-sm font-bold text-ink/50 uppercase tracking-wider mb-2">Shipping Detail</h3>
                    <p className="text-ink font-medium">{user.profile.fullName}</p>
                    <p className="text-ink/70 text-sm">{user.profile.email}</p>
                    <p className="text-ink/70 text-sm mt-1">123 Luxury Aven<br />New York Ny 10</p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-sm font-bold text-ink/50 uppercase tracking-wider mb-2">Payment Info</h3>
                    <p className="text-ink font-medium">{selectedOrder?.paymentMethod || 'N/A'}</p>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedOrder?.status)}`}>
                      {selectedOrder?.status || 'Pending'}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-bold text-ink/50 uppercase tracking-wider mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {Array.from({
                  length: selectedOrder?.items || 0
                }).map((_, i) => {
                  return <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30 border border-line/30">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center shrink-0">
                            <FiPackage className="text-ink/30" size={24} />
                          </div>
                          <div>
                            <p className="text-ink font-medium">"Premium Item"{i + 1}</p>
                            <p className="text-ink/50 text-sm">Qty 1</p>
                          </div>
                        </div>
                        <p className="text-ink font-medium">${((selectedOrder?.total || 0) / (selectedOrder?.items || 1)).toFixed(2)}</p>
                      </div>;
                })}
                  </div>
                </div>
                
                {/* Summary */}
                <div className="border-t border-line/30 pt-6 space-y-3 text-sm">
                  <div className="flex justify-between text-ink/70">
                    <span>Subtotal</span>
                    <span>${(selectedOrder?.total || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-ink/70">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-ink/70">
                    <span>Tax 8875</span>
                    <span>${((selectedOrder?.total || 0) * 0.08875).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-ink font-bold text-lg pt-3 border-t border-line/30 mt-3">
                    <span>Total</span>
                    <span>${((selectedOrder?.total || 0) * 1.08875).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>}
      </AnimatePresence>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice-modal, #invoice-modal * {
            visibility: visible;
          }
          #invoice-modal {
            position: absolute;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            margin: 0;
            padding: 20px;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            border: none !important;
            overflow: visible !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>;
}