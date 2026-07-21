import { createContext, useContext, useMemo } from "react";
import { useAuth } from "./AuthContext";
import { authService } from "../services/authService";

const RewardContext = createContext(null);

export function RewardProvider({ children }) {
  const { user, isAuthenticated, refreshUser } = useAuth();

  const rewards = useMemo(() => user?.rewards || { points: 0, level: "Guest", coupons: [] }, [user]);

  const addPoints = (points) => {
    if (!isAuthenticated || !user) return;
    const currentPoints = (user.rewards?.points || 0) + points;
    
    // Level logic
    let level = "Silver Member";
    if (currentPoints > 500) level = "Gold Member";
    if (currentPoints > 1500) level = "Diamond Member";

    const updatedUser = { 
      ...user, 
      rewards: { ...user.rewards, points: currentPoints, level } 
    };
    authService.updateUser(updatedUser);
    refreshUser();
  };

  const addCoupon = (code, discount) => {
    if (!isAuthenticated || !user) return;
    const newCoupon = { code, discount, status: "Active" };
    const updatedUser = { 
      ...user, 
      rewards: { 
        ...user.rewards, 
        coupons: [newCoupon, ...(user.rewards?.coupons || [])] 
      } 
    };
    authService.updateUser(updatedUser);
    refreshUser();
  };

  return (
    <RewardContext.Provider value={{ rewards, addPoints, addCoupon }}>
      {children}
    </RewardContext.Provider>
  );
}

export function useRewards() {
  const ctx = useContext(RewardContext);
  if (!ctx) throw new Error("useRewards must be used within a RewardProvider");
  return ctx;
}
