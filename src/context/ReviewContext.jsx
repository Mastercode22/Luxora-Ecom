import { createContext, useContext, useMemo } from "react";
import { useAuth } from "./AuthContext";
import { authService } from "../services/authService";

const ReviewContext = createContext(null);

export function ReviewProvider({ children }) {
  const { user, isAuthenticated, refreshUser } = useAuth();

  const reviews = useMemo(() => user?.reviews || [], [user]);

  const addReview = (product, rating, comment) => {
    if (!isAuthenticated || !user) return;
    const newReview = {
      id: `rev_${Date.now()}`,
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      rating,
      comment,
      date: new Date().toLocaleDateString()
    };
    const updatedUser = { ...user, reviews: [newReview, ...(user.reviews || [])] };
    authService.updateUser(updatedUser);
    refreshUser();
  };

  const deleteReview = (id) => {
    if (!isAuthenticated || !user) return;
    const updated = (user.reviews || []).filter(r => r.id !== id);
    authService.updateUser({ ...user, reviews: updated });
    refreshUser();
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, deleteReview }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const ctx = useContext(ReviewContext);
  if (!ctx) throw new Error("useReviews must be used within a ReviewProvider");
  return ctx;
}
