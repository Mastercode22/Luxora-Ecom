import { useUser } from "../../context/UserContext";
import { FiBell, FiMail, FiMessageSquare, FiSmartphone } from "react-icons/fi";

export default function NotificationsTab() {
  const { user, updateNotifications } = useUser();

  const toggleHandler = (key) => {
    updateNotifications(key, !user.notifications[key]);
  };

  const notificationOptions = [
    { key: "orderUpdates", label: "Order Updates", desc: "Get notifications about your order status, shipping, and delivery.", icon: FiBell },
    { key: "promotions", label: "Promotions & Offers", desc: "Receive updates about sales, discounts, and special offers.", icon: FiMail },
    { key: "newsletter", label: "Newsletter", desc: "Weekly updates on new luxury arrivals and trends.", icon: FiMail },
    { key: "sms", label: "SMS Alerts", desc: "Get text messages for important updates and deliveries.", icon: FiMessageSquare },
    { key: "push", label: "Push Notifications", desc: "Receive notifications on your devices via browser push.", icon: FiSmartphone },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif italic text-3xl text-ink">Notification Preferences</h1>
        <p className="text-ink/60 mt-1">Control how and when you want to be notified.</p>
      </div>

      <div className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-3xl p-6 md:p-8">
        <div className="divide-y divide-line/30">
          {notificationOptions.map((opt, idx) => {
            const Icon = opt.icon;
            const isChecked = user.notifications[opt.key];
            return (
              <div key={opt.key} className={`flex items-start justify-between gap-4 ${idx === 0 ? 'pb-6' : idx === notificationOptions.length - 1 ? 'pt-6' : 'py-6'}`}>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary text-ink/70 flex items-center justify-center shrink-0 mt-1">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-ink font-medium mb-1">{opt.label}</h3>
                    <p className="text-ink/50 text-sm max-w-md">{opt.desc}</p>
                  </div>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-2">
                  <input 
                    type="checkbox" 
                    checked={isChecked} 
                    onChange={() => toggleHandler(opt.key)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
