import { createContext, useContext, useMemo } from "react";
import { useAuth } from "./AuthContext";
import { authService } from "../services/authService";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { user, isAuthenticated, refreshUser } = useAuth();

  const notifications = useMemo(() => user?.notificationsList || [], [user]);
  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  const addNotification = (title, message, type = "system") => {
    if (!isAuthenticated || !user) return;
    const newNotif = {
      id: `notif_${Date.now()}`,
      title,
      message,
      type,
      read: false,
      date: new Date().toISOString()
    };
    const updatedUser = { 
      ...user, 
      notificationsList: [newNotif, ...(user.notificationsList || [])] 
    };
    authService.updateUser(updatedUser);
    refreshUser();
  };

  const markAsRead = (id) => {
    if (!isAuthenticated || !user) return;
    const updated = (user.notificationsList || []).map(n => n.id === id ? { ...n, read: true } : n);
    authService.updateUser({ ...user, notificationsList: updated });
    refreshUser();
  };

  const clearAll = () => {
    if (!isAuthenticated || !user) return;
    authService.updateUser({ ...user, notificationsList: [] });
    refreshUser();
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAsRead, clearAll }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within a NotificationProvider");
  return ctx;
}
