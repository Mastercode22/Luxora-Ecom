import { storageService } from "./storageService";

const USERS_KEY = "luxora_users";
const CURRENT_USER_KEY = "luxora_current_user";

const patchUserSchema = (user) => {
  if (!user) return null;
  return {
    ...user,
    profile: {
      fullName: user.name || user.fullName || "User",
      username: user.username || "",
      email: user.email || "",
      phone: user.phone || "",
      avatar: user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop",
      memberSince: user.memberSince || String(new Date().getFullYear()),
      ...(user.profile || {})
    },
    addresses: user.addresses || [],
    payments: user.payments || [],
    orders: user.orders || [],
    wishlist: user.wishlist || [],
    cart: user.cart || [],
    notificationsList: user.notificationsList || [],
    notifications: {
      orderUpdates: true,
      promotions: false,
      newsletter: false,
      ...(user.notifications || {})
    },
    security: {
      twoFactor: false,
      lastPasswordChange: "Never",
      devices: [],
      ...(user.security || {})
    },
    rewards: {
      points: 0,
      level: "Silver Member",
      nextLevelAt: 1000,
      coupons: [],
      ...(user.rewards || {})
    },
    reviews: user.reviews || [],
    recentlyViewed: user.recentlyViewed || [],
    preferences: {
      theme: "system",
      language: "English",
      currency: "USD",
      emailMarketing: false,
      smsNotifications: false,
      ...(user.preferences || {})
    }
  };
};

export const authService = {
  register: async (userData) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = storageService.get(USERS_KEY) || [];
    
    // Check if user already exists
    if (users.find(u => u.email === userData.email)) {
      throw new Error("An account with this email already exists.");
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      ...userData,
      createdAt: new Date().toISOString(),
      profile: {
        fullName: userData.fullName,
        username: userData.username,
        email: userData.email,
        phone: userData.phone || "",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop",
      },
      addresses: [],
      payments: [],
      orders: [],
      wishlist: [],
      cart: [],
      notifications: {
        orderUpdates: true,
        promotions: false,
        newsletter: userData.newsletter || false,
      },
      security: {
        twoFactor: false,
      },
      rewards: {
        points: 0,
        level: "Silver Member",
        coupons: [],
      },
      reviews: [],
      recentlyViewed: [],
      preferences: {
        theme: "system",
        language: "English",
        currency: "USD",
        emailMarketing: false,
        smsNotifications: false,
      }
    };

    users.push(newUser);
    storageService.set(USERS_KEY, users);
    storageService.set(CURRENT_USER_KEY, newUser);

    return newUser;
  },

  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = storageService.get(USERS_KEY) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    storageService.set(CURRENT_USER_KEY, patchUserSchema(user));
    return patchUserSchema(user);
  },

  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    storageService.remove(CURRENT_USER_KEY);
  },

  getCurrentUser: () => {
    const user = storageService.get(CURRENT_USER_KEY);
    return patchUserSchema(user);
  },

  isAuthenticated: () => {
    return !!storageService.get(CURRENT_USER_KEY);
  },

  updateUser: (updatedUser) => {
    storageService.set(CURRENT_USER_KEY, updatedUser);
    const users = storageService.get(USERS_KEY) || [];
    const idx = users.findIndex(u => u.id === updatedUser.id);
    if (idx !== -1) {
      users[idx] = updatedUser;
      storageService.set(USERS_KEY, users);
    }
  }
};
