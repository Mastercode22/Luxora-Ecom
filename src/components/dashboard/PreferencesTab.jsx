import { useTheme } from "../../context/ThemeContext";
import { FiSun, FiMoon, FiGlobe, FiDollarSign, FiClock, FiCalendar } from "react-icons/fi";

export default function PreferencesTab() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif italic text-3xl text-ink">Account Preferences</h1>
        <p className="text-ink/60 mt-1">Customize your shopping experience.</p>
      </div>

      <div className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-3xl p-6 md:p-8 space-y-8">
        
        {/* Theme Settings */}
        <div>
          <h2 className="text-xl font-serif italic text-ink mb-6">Display Settings</h2>
          <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-line/30">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary text-ink flex items-center justify-center shrink-0">
                {theme === 'dark' ? <FiMoon size={18} /> : <FiSun size={18} />}
              </div>
              <div>
                <h3 className="text-ink font-medium mb-1">Dark Mode</h3>
                <p className="text-ink/50 text-sm">Toggle between light and dark theme.</p>
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
          <h2 className="text-xl font-serif italic text-ink mb-6">Regional Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-ink/70 text-sm font-medium flex items-center gap-2">
                <FiGlobe /> Language
              </label>
              <select className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-primary/50 appearance-none">
                <option value="en">English (US)</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
                <option value="it">Italiano</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-ink/70 text-sm font-medium flex items-center gap-2">
                <FiDollarSign /> Currency
              </label>
              <select className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-primary/50 appearance-none">
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-ink/70 text-sm font-medium flex items-center gap-2">
                <FiClock /> Timezone
              </label>
              <select className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-primary/50 appearance-none">
                <option value="EST">Eastern Time (EST)</option>
                <option value="CST">Central Time (CST)</option>
                <option value="PST">Pacific Time (PST)</option>
                <option value="GMT">Greenwich Mean Time (GMT)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-ink/70 text-sm font-medium flex items-center gap-2">
                <FiCalendar /> Date Format
              </label>
              <select className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-primary/50 appearance-none">
                <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2026)</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2026)</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (2026-12-31)</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
