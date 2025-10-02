// store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./sanity.types";

interface CartItem {
  product: Product;
  quantity: number;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  clerkUserId: string;
  items: OrderItem[];
  totalAmount: number;
  subtotal: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

interface CartState {
  items: CartItem[];
  orders: Order[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  deleteCartProduct: (productId: string) => void;
  clearCart: () => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubtotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => CartItem[];
  // Order methods
  createOrder: (
    orderData: Omit<Order, "_id" | "orderNumber" | "createdAt" | "updatedAt">
  ) => Order;
  getOrders: () => Order[];
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      orders: [],

      // Add item to Cart
      addItem: (product) => {
        const existingItem = get().items.find(
          (item) => item.product._id === product._id
        );

        if (existingItem) {
          set((state) => ({
            items: state.items.map((item) =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }));
        } else {
          set((state) => ({
            items: [...state.items, { product, quantity: 1 }],
          }));
        }
      },

      // Remove item from Cart
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
              // else, remove the item completely
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as CartItem[]),
        })),

      // Delete item from Cart
      deleteCartProduct: (productId) =>
        set((state) => ({
          items: state.items.filter(({ product }) => product._id !== productId),
        })),

      // Reset Cart
      resetCart: () => set({ items: [] }),

      // Clear Cart
      clearCart: () => {
        set({ items: [] });
      },

      // Get Total Price
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        );
      },

      // Get Subtotal Price
      getSubtotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          const discount = ((item.product.discount ?? 0) * price) / 100;
          const discountedPrice = price + discount;
          return total + discountedPrice * item.quantity;
        }, 0);
      },

      // Get item count
      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },

      getGroupedItems: () => get().items,

      // Order methods
      createOrder: (orderData) => {
        const newOrder: Order = {
          _id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...orderData,
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));

        return newOrder;
      },

      getOrders: () => {
        return get().orders;
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order._id === orderId
              ? { ...order, status, updatedAt: new Date().toISOString() }
              : order
          ),
        }));
      },
    }),
    {
      name: "cart-store",
    }
  )
);

export default useCartStore;
