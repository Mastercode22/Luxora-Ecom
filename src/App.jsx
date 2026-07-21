import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { UserProvider } from "./context/UserContext";
import Product from "./pages/Product";
import Shop from "./pages/Shop";
import DashboardLayout from "./pages/DashboardLayout";
import Overview from "./components/dashboard/Overview";
import ProfileSettings from "./components/dashboard/ProfileSettings";
import AddressManagement from "./components/dashboard/AddressManagement";
import OrderHistory from "./components/dashboard/OrderHistory";
import PaymentMethods from "./components/dashboard/PaymentMethods";
import NotificationsTab from "./components/dashboard/NotificationsTab";
import SecuritySettings from "./components/dashboard/SecuritySettings";
import ReviewsTab from "./components/dashboard/ReviewsTab";
import RewardsTab from "./components/dashboard/RewardsTab";
import PreferencesTab from "./components/dashboard/PreferencesTab";
import RecentlyViewedTab from "./components/dashboard/RecentlyViewedTab";
import WishlistTab from "./components/dashboard/WishlistTab";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import GlobalBackground from "./components/ui/GlobalBackground";

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
      <CartProvider>
        <WishlistProvider>
          <UserProvider>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-surface overflow-x-hidden w-full relative z-0">
              <Navbar />
              <main className="flex-1 relative z-10 w-full max-w-[100vw]">
                <GlobalBackground />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/products/:slug" element={<Product />} />
                  
                  {/* Dashboard Routes */}
                  <Route path="/account" element={<DashboardLayout />}>
                    <Route index element={<Overview />} />
                    <Route path="profile" element={<ProfileSettings />} />
                    <Route path="orders" element={<OrderHistory />} />
                    <Route path="wishlist" element={<WishlistTab />} />
                    <Route path="addresses" element={<AddressManagement />} />
                    <Route path="payments" element={<PaymentMethods />} />
                    <Route path="notifications" element={<NotificationsTab />} />
                    <Route path="security" element={<SecuritySettings />} />
                    <Route path="reviews" element={<ReviewsTab />} />
                    <Route path="recent" element={<RecentlyViewedTab />} />
                    <Route path="rewards" element={<RewardsTab />} />
                    <Route path="preferences" element={<PreferencesTab />} />
                  </Route>
                </Routes>
              </main>
              <Footer />
            </div>
          </UserProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
