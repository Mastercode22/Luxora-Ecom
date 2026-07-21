import { createContext, useContext, useMemo, useState, useCallback, useEffect } from "react";
import { storageService } from "../services/storageService";
import { useAuth } from "./AuthContext";
import { authService } from "../services/authService";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user, isAuthenticated, refreshUser } = useAuth();
  
  const [items, setItems] = useState(() => {
    return storageService.get("luxora_guest_cart") || [];
  });
  
  const [isOpen, setIsOpen] = useState(false);

  // Sync cart when user logs in/out
  useEffect(() => {
    if (isAuthenticated && user) {
      const guestCart = storageService.get("luxora_guest_cart") || [];
      if (guestCart.length > 0) {
        // Merge carts
        let merged = [...(user.cart || [])];
        guestCart.forEach(gItem => {
          const existing = merged.find(i => i.id === gItem.id);
          if (existing) {
            existing.qty += gItem.qty;
          } else {
            merged.push(gItem);
          }
        });
        const updatedUser = { ...user, cart: merged };
        authService.updateUser(updatedUser);
        refreshUser();
        storageService.remove("luxora_guest_cart");
        setItems(merged);
      } else {
        setItems(user.cart || []);
      }
    } else {
      setItems(storageService.get("luxora_guest_cart") || []);
    }
  }, [isAuthenticated, user?.id]);

  // Persist changes to cart
  useEffect(() => {
    if (isAuthenticated && user) {
      if (JSON.stringify(user.cart) !== JSON.stringify(items)) {
         authService.updateUser({ ...user, cart: items });
      }
    } else {
      storageService.set("luxora_guest_cart", items);
    }
  }, [items, isAuthenticated, user]);

  const addItem = useCallback((product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.qty * i.price, 0),
    [items]
  );

  const value = useMemo(() => ({
    items,
    count,
    subtotal,
    isOpen,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    openCart,
    closeCart,
  }), [items, count, subtotal, isOpen, addItem, removeItem, updateQty, clearCart, openCart, closeCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
