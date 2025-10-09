// app/orders/page.tsx
"use client";

import Container from "@/components/Container";
import Loading from "@/components/Loading";
import PriceFormatter from "@/components/PriceFormatter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCartStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function OrdersPage() {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  const { orders, updateOrderStatus } = useCartStore();

  useEffect(() => {
    setIsClient(true);
    setLoading(false);
  }, []);

  const handleUpdateOrderStatus = (orderId: string, newStatus: any) => {
    updateOrderStatus(orderId, newStatus);
    toast.success(`Order marked as ${newStatus}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "confirmed":
        return <Package className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isClient || !isLoaded) {
    return <Loading />;
  }

  if (!isSignedIn) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <Container>
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Sign In Required
            </h2>
            <p className="text-gray-600">Please sign in to view your orders.</p>
          </div>
        </Container>
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }

  const userOrders = orders.filter((order) => order.clerkUserId === user?.id);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <Container>
        <div className="flex items-center gap-3 mb-8">
          <Package className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-600">Track and manage your orders</p>
          </div>
        </div>

        {userOrders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Orders Yet
              </h3>
              <p className="text-gray-600 mb-6">
                You haven&apos;t placed any orders yet.
              </p>
              <Button asChild>
                <Link href="/">Start Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {userOrders.map((order) => (
              <Card key={order._id} className="overflow-hidden">
                <CardHeader className="bg-gray-50 border-b">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        Order #{order.orderNumber}
                        <Badge
                          variant="secondary"
                          className={getStatusColor(order.status)}
                        >
                          <span className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Placed on {formatDate(order.createdAt)}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">
                        <PriceFormatter amount={order.totalAmount} />
                      </div>
                      <div className="text-sm text-gray-600">
                        {order.items.length} item
                        {order.items.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Order Items */}
                    <div>
                      <h3 className="font-semibold text-lg mb-4">
                        Order Items
                      </h3>
                      <div className="space-y-4">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex-1">
                              <div className="font-medium">
                                {item.product.name}
                              </div>
                              <div className="text-sm text-gray-600 capitalize">
                                Variant: {item.product.variant}
                              </div>
                              <div className="text-sm text-gray-600">
                                Qty: {item.quantity} ×{" "}
                                <PriceFormatter
                                  amount={item.product.price || 0}
                                />
                              </div>
                            </div>
                            <div className="font-semibold">
                              <PriceFormatter
                                amount={
                                  (item.product.price || 0) * item.quantity
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping & Actions */}
                    <div className="space-y-6">
                      {/* Shipping Address */}
                      <div>
                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          Shipping Address
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="space-y-2 text-sm">
                            <div className="font-medium">
                              {order.customerName}
                            </div>
                            <div>{order.shippingAddress.street}</div>
                            <div>
                              {order.shippingAddress.city},{" "}
                              {order.shippingAddress.state}
                            </div>
                            <div>{order.shippingAddress.country}</div>
                            <div className="flex items-center gap-2 mt-2">
                              <Phone className="w-4 h-4" />
                              {order.shippingAddress.phone}
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              {order.customerEmail}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Order Summary */}
                      <div>
                        <h3 className="font-semibold text-lg mb-3">
                          Order Summary
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <PriceFormatter amount={order.subtotal} />
                          </div>
                          <div className="flex justify-between">
                            <span>Discount:</span>
                            <PriceFormatter
                              amount={order.subtotal - order.totalAmount}
                              className="text-green-600"
                            />
                          </div>
                          <Separator />
                          <div className="flex justify-between font-semibold">
                            <span>Total:</span>
                            <PriceFormatter amount={order.totalAmount} />
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Payment Method:</span>
                            <span className="capitalize">
                              {order.paymentMethod.replace("_", " ")}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Order Actions */}

                      {user?.id === order.clerkUserId &&
                        order.status !== "delivered" &&
                        order.status !== "cancelled" && (
                          <div>
                            <h3 className="font-semibold text-lg mb-3">
                              Order Actions
                            </h3>
                            <div className="space-y-2">
                              {/* Allow marking as delivered from any status except cancelled */}
                              {(order.status === "shipped" ||
                                order.status === "confirmed" ||
                                order.status === "pending") && (
                                <Button
                                  className="w-full bg-green-600 hover:bg-green-700"
                                  onClick={() =>
                                    handleUpdateOrderStatus(
                                      order._id,
                                      "delivered"
                                    )
                                  }
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Mark as Delivered
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                className="w-full"
                                onClick={() =>
                                  handleUpdateOrderStatus(
                                    order._id,
                                    "cancelled"
                                  )
                                }
                              >
                                Cancel Order
                              </Button>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
