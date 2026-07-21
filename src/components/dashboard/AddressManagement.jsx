import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { FiPlus, FiEdit2, FiTrash2, FiMapPin, FiStar } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function AddressManagement() {
  const { user, addAddress, deleteAddress } = useUser();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "", phone: "", street: "", apartment: "", city: "", region: "", country: "", postalCode: "", isDefault: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addAddress(formData);
    setIsAdding(false);
    setFormData({ fullName: "", phone: "", street: "", apartment: "", city: "", region: "", country: "", postalCode: "", isDefault: false });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif italic text-3xl text-ink">Saved Addresses</h1>
          <p className="text-ink/60 mt-1">Manage your shipping and billing addresses.</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-all shadow-[0_4px_20px_-4px_rgba(233,30,99,0.3)]"
          >
            <FiPlus size={18} /> Add New Address
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isAdding ? (
          <motion.form 
            key="add-form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit} 
            className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-3xl p-6 md:p-8 space-y-6 overflow-hidden"
          >
            <h2 className="text-xl font-serif italic text-ink mb-4">Add New Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-ink/70 text-sm font-medium">Full Name</label>
                <input required value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-ink/70 text-sm font-medium">Phone Number</label>
                <input required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-primary/50" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-ink/70 text-sm font-medium">Street Address</label>
                <input required value={formData.street} onChange={(e) => setFormData({...formData, street: e.target.value})} className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-ink/70 text-sm font-medium">Apartment/Suite (Optional)</label>
                <input value={formData.apartment} onChange={(e) => setFormData({...formData, apartment: e.target.value})} className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-ink/70 text-sm font-medium">City</label>
                <input required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-ink/70 text-sm font-medium">State/Region</label>
                <input required value={formData.region} onChange={(e) => setFormData({...formData, region: e.target.value})} className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-ink/70 text-sm font-medium">Postal Code</label>
                <input required value={formData.postalCode} onChange={(e) => setFormData({...formData, postalCode: e.target.value})} className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-primary/50" />
              </div>
              <div className="space-y-2 md:col-span-2 flex items-center gap-3">
                <input type="checkbox" id="isDefault" checked={formData.isDefault} onChange={(e) => setFormData({...formData, isDefault: e.target.checked})} className="w-5 h-5 rounded border-line/50 bg-secondary/30 accent-primary" />
                <label htmlFor="isDefault" className="text-ink/70 text-sm font-medium cursor-pointer">Set as default shipping address</label>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button type="submit" className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all">Save Address</button>
              <button type="button" onClick={() => setIsAdding(false)} className="px-8 py-3 bg-secondary/50 hover:bg-secondary text-ink font-medium rounded-xl transition-all">Cancel</button>
            </div>
          </motion.form>
        ) : (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {user.addresses.map((address) => (
              <div key={address.id} className={`bg-surface/50 backdrop-blur-md border ${address.isDefault ? 'border-primary/50 shadow-[0_0_20px_-5px_rgba(233,30,99,0.15)]' : 'border-line/60'} rounded-3xl p-6 relative group transition-all duration-300 hover:bg-secondary/30`}>
                {address.isDefault && (
                  <div className="absolute top-6 right-6 flex items-center gap-1.5 text-primary bg-primary/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    <FiStar className="fill-current" size={12} /> Default
                  </div>
                )}
                
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-ink shrink-0">
                    <FiMapPin size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink mb-1">{address.fullName}</h3>
                    <p className="text-ink/50 text-sm font-medium">{address.phone}</p>
                  </div>
                </div>

                <div className="space-y-1 text-ink/70 text-sm mb-8">
                  <p>{address.street} {address.apartment && `, ${address.apartment}`}</p>
                  <p>{address.city}, {address.region} {address.postalCode}</p>
                  <p>{address.country}</p>
                </div>

                <div className="flex gap-3 pt-6 border-t border-line/30">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-secondary/50 hover:bg-secondary text-ink rounded-xl text-sm font-medium transition-colors">
                    <FiEdit2 size={16} /> Edit
                  </button>
                  <button 
                    onClick={() => deleteAddress(address.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-sm font-medium transition-colors"
                  >
                    <FiTrash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
