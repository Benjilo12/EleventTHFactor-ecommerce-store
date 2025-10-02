// components/OrderNotificationBadge.tsx
"use client";

import React, { useEffect, useState } from "react";
import useCartStore from "@/store";

export default function OrderNotificationBadge() {
  const [hasUpdates, setHasUpdates] = useState(false);
  const { orders } = useCartStore();

  useEffect(() => {
    // Check for order updates
    const checkForUpdates = () => {
      const userOrders = orders;

      // Check if there are any orders with status changes (not pending)
      const hasActiveOrders = userOrders.some(
        (order) => order.status !== "pending" && order.status !== "cancelled"
      );

      // Check if there are new orders (created in the last 24 hours)
      const hasNewOrders = userOrders.some((order) => {
        const orderDate = new Date(order.createdAt);
        const now = new Date();
        const hoursDiff =
          (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60);
        return hoursDiff < 24;
      });

      // Check for orders that need attention (shipped but not delivered)
      const needsAttention = userOrders.some(
        (order) => order.status === "shipped" || order.status === "confirmed"
      );

      setHasUpdates(hasActiveOrders || hasNewOrders || needsAttention);
    };

    checkForUpdates();

    // Optional: Check for updates periodically
    const interval = setInterval(checkForUpdates, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [orders]);

  if (!hasUpdates) {
    return (
      <span className="absolute -top-1 -right-1 bg-gray-400 text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
        0
      </span>
    );
  }

  return (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white h-4 w-4 rounded-full text-xs font-semibold flex items-center justify-center animate-pulse">
      !
    </span>
  );
}
