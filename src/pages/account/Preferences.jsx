import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";
import { FiSun, FiMoon, FiGlobe, FiDollarSign, FiClock, FiCalendar, FiBell, FiMail, FiMessageSquare, FiSmartphone } from "react-icons/fi";
export default function PreferencesTab() {
  
const {
    theme,
    toggleTheme
  } = useTheme();
  const {
    user,
    refreshUser
  } = useAuth();
  const toggleNotification = key => {
    if (!user) return;
    const updatedUser = {
      ...user,
      notifications: {
        ...user.notifications,
        [key]: !user.notifications?.[key]
      }
    };
    authService.updateUser(updatedUser);
    refreshUser();
  };
  const notificationOptions = [{
    key: "orderUpdates",
    label: "Order Updates",
    desc: "Get notifications about your order status, shipping, and delivery.",
    icon: FiBell
  }, {
    key: "promotions",
    label: "Promotions & Offers",
    desc: "Receive updates about sales, discounts, and special offers.",
    icon: FiMail
  }, {
    key: "newsletter",
    label: "Newsletter",
    desc: "Weekly updates on new luxury arrivals and trends.",
    icon: FiMail
  }, {
    key: "sms",
    label: "SMS Alerts",
    desc: "Get text messages for important updates and deliveries.",
    icon: FiMessageSquare
  }, {
    key: "push",
    label: "Push Notifications",
    desc: "Receive notifications on your devices via browser push.",
    icon: FiSmartphone
  }];
  return <div className="space-y-8">
      <div>
        <h1 className="font-serif italic text-3xl text-ink">Account Prefere</h1>
        <p className="text-ink/60 mt-1">Customize Your</p>
      </div>

      <div className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-3xl p-6 md:p-8 space-y-8">
        
        {/* Theme Settings */}
        <div>
          <h2 className="text-xl font-serif italic text-ink mb-6">Display Setting</h2>
          <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-line/30">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary text-ink flex items-center justify-center shrink-0">
                {theme === 'dark' ? <FiMoon size={18} /> : <FiSun size={18} />}
              </div>
              <div>
                <h3 className="text-ink font-medium mb-1">Dark Mode</h3>
                <p className="text-ink/50 text-sm">Toggle Between</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} className="sr-only peer" />
              <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <hr className="border-line/30" />

        {/* Regional Settings */}
        <div>
          <h2 className="text-xl font-serif italic text-ink mb-6">Regional Settin</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-ink/70 text-sm font-medium flex items-center gap-2">
                <FiGlobe />Language</label>
              <select className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-primary/50 appearance-none">
                <option value="en">English Us</option>
                <option value="fr">Franais</option>
                <option value="es">Espaol</option>
                <option value="it">Italiano</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-ink/70 text-sm font-medium flex items-center gap-2">
                <FiDollarSign />Currency</label>
              <select className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-primary/50 appearance-none">
                <option value="USD">Usd</option>
                <option value="EUR">Eur</option>
                <option value="GBP">Gbp</option>
                <option value="JPY">Jpy</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-ink/70 text-sm font-medium flex items-center gap-2">
                <FiClock />Timezone</label>
              <select className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-primary/50 appearance-none">
                <option value="EST">Eastern Time E</option>
                <option value="CST">Central Time C</option>
                <option value="PST">Pacific Time P</option>
                <option value="GMT">Greenwich Mean</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-ink/70 text-sm font-medium flex items-center gap-2">
                <FiCalendar />Date Format</label>
              <select className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-primary/50 appearance-none">
                <option value="MM/DD/YYYY">Mmddyyyy 12</option>
                <option value="DD/MM/YYYY">Ddmmyyyy 31</option>
                <option value="YYYY-MM-DD">Yyyymmdd 202</option>
              </select>
            </div>
          </div>
        </div>

        <hr className="border-line/30" />

        {/* Notification Settings */}
        <div>
          <h2 className="text-xl font-serif italic text-ink mb-6">Notification Se</h2>
          <div className="divide-y divide-line/30 bg-secondary/10 rounded-2xl border border-line/30 px-6">
            {notificationOptions.map((opt, idx) => {
            const Icon = opt.icon;
            const isChecked = user?.notifications?.[opt.key] || false;
            return <div key={opt.key} className={`flex items-start justify-between gap-4 py-5`}>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary/50 text-ink/70 flex items-center justify-center shrink-0 mt-1">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="text-ink font-medium mb-1">{opt.label}</h3>
                      <p className="text-ink/50 text-sm max-w-md">{opt.desc}</p>
                    </div>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-2">
                    <input type="checkbox" checked={isChecked} onChange={() => toggleNotification(opt.key)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>;
          })}
          </div>
        </div>

      </div>
    </div>;
}