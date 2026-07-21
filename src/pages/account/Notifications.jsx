import { useNotifications } from "../../context/NotificationContext";
import { FiBell, FiCheck, FiTrash2, FiInfo, FiGift, FiBox } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
export default function NotificationsTab() {
  
const {
    notifications,
    unreadCount,
    markAsRead,
    clearAll
  } = useNotifications();
  const getIcon = type => {
    switch (type) {
      case "order":
        return <FiBox size={20} className="text-blue-400" />;
      case "promo":
        return <FiGift size={20} className="text-pink-400" />;
      default:
        return <FiInfo size={20} className="text-ink/60" />;
    }
  };
  return <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif italic text-3xl text-ink">Notifications</h1>
          <p className="text-ink/60 mt-1">Stay Updated On</p>
        </div>
        <div className="flex gap-3">
          {notifications.length > 0 && <button onClick={clearAll} className="px-4 py-2 bg-secondary/50 hover:bg-secondary text-ink rounded-xl text-sm font-medium transition-colors">Clear All</button>}
        </div>
      </div>

      <div className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-3xl overflow-hidden">
        {notifications.length > 0 ? <div className="divide-y divide-line/30">
            <AnimatePresence>
              {notifications.map((notif, idx) => <motion.div key={notif.id} initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            height: 0
          }} transition={{
            delay: idx * 0.05
          }} className={`p-6 flex gap-4 transition-colors ${!notif.read ? 'bg-primary/5' : 'hover:bg-secondary/20'}`} onClick={() => !notif.read && markAsRead(notif.id)}>
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className={`font-medium ${!notif.read ? 'text-ink font-bold' : 'text-ink/80'}`}>
                        {notif.title}
                      </h3>
                      <span className="text-xs text-ink/40 whitespace-nowrap">
                        {new Date(notif.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className={`text-sm mt-1 ${!notif.read ? 'text-ink/90' : 'text-ink/60'}`}>
                      {notif.message}
                    </p>
                  </div>
                  {!notif.read && <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_10px_rgba(233,30,99,0.5)]" />}
                </motion.div>)}
            </AnimatePresence>
          </div> : <div className="p-12 text-center">
            <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4 text-ink/30">
              <FiBell size={32} />
            </div>
            <h3 className="text-xl text-ink font-serif italic mb-2">Youre All Caug</h3>
            <p className="text-ink/50 max-w-md mx-auto">There Are No Ne</p>
          </div>}
      </div>
    </div>;
}