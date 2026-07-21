import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import { DashboardProviders } from "./context/DashboardProviders";
import Product from "./pages/Product";
import Shop from "./pages/Shop";
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/account/Dashboard";
import Profile from "./pages/account/Profile";
import Addresses from "./pages/account/Addresses";
import Orders from "./pages/account/Orders";
import Payments from "./pages/account/Payments";
import Notifications from "./pages/account/Notifications";
import Security from "./pages/account/Security";
import Reviews from "./pages/account/Reviews";
import Rewards from "./pages/account/Rewards";
import Preferences from "./pages/account/Preferences";
import RecentlyViewed from "./pages/account/RecentlyViewed";
import Wishlist from "./pages/account/Wishlist";
import Cart from "./pages/account/Cart";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";

// New Pages
import About from "./pages/About";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import SuccessPage from "./pages/SuccessPage";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <DashboardProviders>
              <ScrollToTop />
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/products/:slug" element={<Product />} />
                <Route path="/about" element={<About />} />
                <Route path="/help" element={<Help />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<SuccessPage />} />
                
                {/* Dashboard Routes */}
                <Route path="/account" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="addresses" element={<Addresses />} />
                  <Route path="payments" element={<Payments />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="security" element={<Security />} />
                  <Route path="reviews" element={<Reviews />} />
                  <Route path="recent" element={<RecentlyViewed />} />
                  <Route path="rewards" element={<Rewards />} />
                  <Route path="preferences" element={<Preferences />} />
                </Route>
              </Routes>
              </Layout>
            </DashboardProviders>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
