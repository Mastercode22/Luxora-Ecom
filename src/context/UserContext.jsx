import { createContext, useContext, useState, useEffect } from "react";
import { products } from "../data/products";

const UserContext = createContext();

const DUMMY_USER = {
  profile: {
    fullName: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    gender: "Male",
    dob: "1990-05-15",
    country: "United States",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    language: "English",
    bio: "Tech enthusiast, avid shopper, and lover of luxury goods.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop",
    memberSince: "2026"
  },
  addresses: [
    {
      id: "addr_1",
      fullName: "John Doe",
      phone: "+1 (555) 123-4567",
      street: "123 Luxury Avenue",
      apartment: "Apt 4B",
      city: "New York",
      region: "NY",
      country: "United States",
      postalCode: "10001",
      isDefault: true,
    }
  ],
  payments: [
    {
      id: "pay_1",
      type: "Visa",
      last4: "4242",
      expiry: "12/28",
      cardholder: "John Doe",
      isDefault: true,
    },
    {
      id: "pay_2",
      type: "Mastercard",
      last4: "8888",
      expiry: "09/27",
      cardholder: "John Doe",
      isDefault: false,
    }
  ],
  orders: [
    {
      id: "ORD-9823-A",
      date: "Oct 12, 2026",
      items: 3,
      total: 899.99,
      paymentMethod: "Visa •••• 4242",
      status: "Delivered"
    },
    {
      id: "ORD-7462-B",
      date: "Nov 04, 2026",
      items: 1,
      total: 1299.00,
      paymentMethod: "Apple Pay",
      status: "Processing"
    },
    {
      id: "ORD-5112-C",
      date: "Nov 18, 2026",
      items: 2,
      total: 349.50,
      paymentMethod: "Visa •••• 4242",
      status: "Pending"
    }
  ],
  wishlist: products.slice(0, 4),
  recentlyViewed: products.slice(4, 8),
  notifications: {
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    sms: false,
    push: true
  },
  security: {
    twoFactor: true,
    lastPasswordChange: "3 months ago",
    devices: [
      { id: 1, name: "MacBook Pro 16\"", location: "New York, USA", active: true, time: "Active now" },
      { id: 2, name: "iPhone 15 Pro", location: "New York, USA", active: false, time: "2 hours ago" }
    ]
  },
  reviews: [
    {
      id: 1,
      productId: products[0].id,
      productName: products[0].name,
      productImage: products[0].image,
      rating: 5,
      date: "Oct 15, 2026",
      comment: "Absolutely incredible quality. Exceeded all my expectations."
    }
  ],
  rewards: {
    points: 4250,
    level: "Gold Member",
    nextLevelAt: 5000,
    coupons: [
      { id: "WELCOME10", discount: "10% OFF", description: "Welcome bonus for new members", status: "Used" },
      { id: "LUX20", discount: "20% OFF", description: "Holiday special discount", status: "Available" }
    ]
  }
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(DUMMY_USER);
  
  const updateProfile = (newData) => {
    setUser(prev => ({ ...prev, profile: { ...prev.profile, ...newData } }));
  };

  const addAddress = (address) => {
    setUser(prev => {
      const newAddrs = [...prev.addresses, { ...address, id: `addr_${Date.now()}` }];
      if (address.isDefault) {
        newAddrs.forEach(a => { if (a.id !== newAddrs[newAddrs.length-1].id) a.isDefault = false; });
      }
      return { ...prev, addresses: newAddrs };
    });
  };

  const deleteAddress = (id) => {
    setUser(prev => ({ ...prev, addresses: prev.addresses.filter(a => a.id !== id) }));
  };
  
  const updateNotifications = (key, value) => {
    setUser(prev => ({ ...prev, notifications: { ...prev.notifications, [key]: value } }));
  };

  return (
    <UserContext.Provider value={{
      user,
      updateProfile,
      addAddress,
      deleteAddress,
      updateNotifications
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
