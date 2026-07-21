import { createContext, useContext, useMemo, useState, useCallback, useEffect } from "react";
import { storageService } from "../services/storageService";
import { useAuth } from "./AuthContext";
import { authService } from "../services/authService";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { user, isAuthenticated, refreshUser } = useAuth();

  const [items, setItems] = useState(() => {
    return storageService.get("luxora_guest_wishlist") || [];
  });
  
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      const guestWish = storageService.get("luxora_guest_wishlist") || [];
      if (guestWish.length > 0) {
        let merged = [...(user.wishlist || [])];
        guestWish.forEach(gItem => {
          if (!merged.find(i => i.id === gItem.id)) {
            merged.push(gItem);
          }
        });
        authService.updateUser({ ...user, wishlist: merged });
        refreshUser();
        storageService.remove("luxora_guest_wishlist");
        setItems(merged);
      } else {
        setItems(user.wishlist || []);
      }
    } else {
      setItems(storageService.get("luxora_guest_wishlist") || []);
    }
  }, [isAuthenticated, user?.id]);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (JSON.stringify(user.wishlist) !== JSON.stringify(items)) {
         authService.updateUser({ ...user, wishlist: items });
      }
    } else {
      storageService.set("luxora_guest_wishlist", items);
    }
  }, [items, isAuthenticated, user]);

  const toggle = useCallback((product) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === product.id);
      if (exists) return prev.filter((i) => i.id !== product.id);
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
      ];
    });
  }, []);

  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const isWishlisted = useCallback(
    (id) => items.some((i) => i.id === id),
    [items]
  );

  const openWishlist = useCallback(() => setIsOpen(true), []);
  const closeWishlist = useCallback(() => setIsOpen(false), []);

  const count = useMemo(() => items.length, [items]);

  const value = useMemo(() => ({
    items,
    count,
    isOpen,
    toggle,
    remove,
    isWishlisted,
    openWishlist,
    closeWishlist,
  }), [items, count, isOpen, toggle, remove, isWishlisted, openWishlist, closeWishlist]);

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
