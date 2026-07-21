import { createContext, useContext, useMemo } from "react";
import { useAuth } from "./AuthContext";
import { authService } from "../services/authService";

const RecentlyViewedContext = createContext(null);

export function RecentlyViewedProvider({ children }) {
  const { user, isAuthenticated, refreshUser } = useAuth();

  const recentlyViewed = useMemo(() => user?.recentlyViewed || [], [user]);

  const addViewedProduct = (product) => {
    if (!isAuthenticated || !user) return;
    
    const existing = (user.recentlyViewed || []).filter(p => p.id !== product.id);
    const newProduct = { ...product, viewedAt: new Date().toISOString() };
    
    // Keep max 20
    const updated = [newProduct, ...existing].slice(0, 20);
    
    authService.updateUser({ ...user, recentlyViewed: updated });
    refreshUser();
  };

  const clearHistory = () => {
    if (!isAuthenticated || !user) return;
    authService.updateUser({ ...user, recentlyViewed: [] });
    refreshUser();
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addViewedProduct, clearHistory }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx) throw new Error("useRecentlyViewed must be used within a RecentlyViewedProvider");
  return ctx;
}
