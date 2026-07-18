import { createContext, useContext, useMemo, useState, useCallback } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]); // [{ id, name, price, image }]
  const [isOpen, setIsOpen] = useState(false);

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
