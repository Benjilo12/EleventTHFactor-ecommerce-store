import OrdersClient from "./OrdersClient";

// ✅ Add page metadata here
export const metadata = {
  title: "My Orders",
  description: "Track, manage, and review your past orders on MyStore.",
};

export default function OrdersPage() {
  return <OrdersClient />;
}
