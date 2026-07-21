import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { FiShield, FiSmartphone, FiMonitor, FiLogOut, FiKey, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function SecuritySettings() {
  const { user } = useUser();
  const [toast, setToast] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 3000);
    e.target.reset();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif italic text-3xl text-ink">Security Settings</h1>
        <p className="text-ink/60 mt-1">Keep your account secure and manage devices.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Change Password */}
        <div className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-3xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
              <FiKey size={18} />
            </div>
            <h2 className="text-xl font-serif italic text-ink">Change Password</h2>
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-ink/70 text-sm font-medium">Current Password</label>
              <input type="password" required className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-primary/50" />
            </div>
            <div className="space-y-2">
              <label className="text-ink/70 text-sm font-medium">New Password</label>
              <input type="password" required className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-primary/50" />
            </div>
            <div className="space-y-2">
              <label className="text-ink/70 text-sm font-medium">Confirm New Password</label>
              <input type="password" required className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-primary/50" />
            </div>
            <div className="pt-4">
              <button type="submit" className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all shadow-[0_4px_20px_-4px_rgba(233,30,99,0.3)]">
                Update Password
              </button>
            </div>
            <p className="text-ink/40 text-xs text-center mt-4">Last changed: {user.security.lastPasswordChange}</p>
          </form>
        </div>

        <div className="space-y-8">
          {/* 2FA */}
          <div className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-3xl p-6 md:p-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-secondary text-ink flex items-center justify-center">
                    <FiShield size={18} />
                  </div>
                  <h2 className="text-xl font-serif italic text-ink">Two-Factor Auth</h2>
                </div>
                <p className="text-ink/50 text-sm pl-13">Add an extra layer of security to your account.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={user.security.twoFactor} className="sr-only peer" />
                <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>

          {/* Active Devices */}
          <div className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-3xl p-6 md:p-8">
            <h2 className="text-xl font-serif italic text-ink mb-6">Active Devices</h2>
            <div className="space-y-4">
              {user.security.devices.map(device => (
                <div key={device.id} className="flex items-start justify-between p-4 bg-secondary/30 rounded-xl border border-line/30">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-ink shrink-0">
                      {device.name.includes("iPhone") ? <FiSmartphone size={18} /> : <FiMonitor size={18} />}
                    </div>
                    <div>
                      <h3 className="text-ink font-medium flex items-center gap-2">
                        {device.name}
                        {device.active && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Current</span>}
                      </h3>
                      <p className="text-ink/50 text-xs mt-1">{device.location} • {device.time}</p>
                    </div>
                  </div>
                  {!device.active && (
                    <button className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors p-2">
                      <FiLogOut size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium rounded-xl transition-all">
              Log out of all devices
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-[9999] bg-green-500 text-ink px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 font-medium"
          >
            <FiCheck size={20} />
            Password updated successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
