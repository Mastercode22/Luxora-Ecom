import { createContext, useContext, useMemo } from "react";
import { useAuth } from "./AuthContext";
import { authService } from "../services/authService";

const PreferencesContext = createContext(null);

export function PreferencesProvider({ children }) {
  const { user, isAuthenticated, refreshUser } = useAuth();

  const preferences = useMemo(() => user?.preferences || {
    theme: "system",
    language: "English",
    currency: "USD",
    emailMarketing: false,
    smsNotifications: false,
  }, [user]);

  const updatePreferences = (updates) => {
    if (!isAuthenticated || !user) return;
    const updatedUser = { 
      ...user, 
      preferences: { ...user.preferences, ...updates } 
    };
    authService.updateUser(updatedUser);
    refreshUser();
  };

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used within a PreferencesProvider");
  return ctx;
}
