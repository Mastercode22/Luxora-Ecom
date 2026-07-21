import { createContext, useContext, useMemo } from "react";
import { useAuth } from "./AuthContext";
import { authService } from "../services/authService";

const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const { user, isAuthenticated, refreshUser } = useAuth();

  const orders = useMemo(() => Array.isArray(user?.orders) ? user.orders : [], [user]);

  const addOrder = (order) => {
    if (!isAuthenticated || !user) return;
    const newOrder = {
      ...order,
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString(),
      status: "Pending",
    };
    const updatedUser = { ...user, orders: [newOrder, ...user.orders] };
    authService.updateUser(updatedUser);
    refreshUser();
    return newOrder;
  };

  const cancelOrder = (orderId) => {
    if (!isAuthenticated || !user) return;
    const updatedOrders = user.orders.map(o =>
      o.id === orderId && o.status === "Pending" ? { ...o, status: "Cancelled" } : o
    );
    authService.updateUser({ ...user, orders: updatedOrders });
    refreshUser();
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, cancelOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within an OrdersProvider");
  return ctx;
}
