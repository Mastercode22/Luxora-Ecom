import { storageService } from "./storageService";
import { authService } from "./authService";

const ORDERS_KEY = "luxora_orders";

export const orderService = {
  createOrder: async (orderData) => {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing

    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      throw new Error("Must be logged in to place an order.");
    }

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      userId: currentUser.id,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      createdAt: new Date().toISOString(),
      items: orderData.items,
      total: orderData.total,
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      tax: orderData.tax,
      discount: orderData.discount,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      status: "Processing"
    };

    // Save to global orders list
    const orders = storageService.get(ORDERS_KEY) || [];
    orders.push(newOrder);
    storageService.set(ORDERS_KEY, orders);

    // Save to user's profile
    const updatedUser = {
      ...currentUser,
      orders: [newOrder, ...(currentUser.orders || [])]
    };
    authService.updateUser(updatedUser);

    return newOrder;
  },

  getUserOrders: (userId) => {
    const orders = storageService.get(ORDERS_KEY) || [];
    return orders.filter(o => o.userId === userId);
  }
};
