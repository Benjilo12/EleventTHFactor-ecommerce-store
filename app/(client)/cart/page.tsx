"use client";

import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import Loading from "@/components/Loading";
import NoAccessToCart from "@/components/NoAccessToCart";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButton from "@/components/QuantityButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { urlFor } from "@/sanity/lib/image";
import useCartStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { Heart, ShoppingBag, TrashIcon, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { toast } from "sonner";

interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  phone: string;
}

export default function Cartpage() {
  const [isClient, setIsClient] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    street: "",
    city: "",
    state: "",
    country: "Ghana",
    phone: "",
  });

  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubtotalPrice,
    resetCart,
    getGroupedItems,
    createOrder,
  } = useCartStore();

  // Ref to track if we've already pre-filled the phone number
  const hasPrefilledPhone = useRef(false);

  // All hooks must be called unconditionally at the top level
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Pre-fill user data if available - only run once when user is available
  useEffect(() => {
    if (user && !hasPrefilledPhone.current) {
      const userPhone = user.primaryPhoneNumber?.phoneNumber;
      if (userPhone && !shippingAddress.phone) {
        setShippingAddress((prev) => ({
          ...prev,
          phone: userPhone,
        }));
        hasPrefilledPhone.current = true;
      }
    }
  }, [user]);

  const cartProducts = getGroupedItems();

  const handleResetCart = () => {
    const confirmed = window.confirm("Are you sure to reset your Cart?");
    if (confirmed) {
      resetCart();
      toast.success("Your cart reset successfully!");
    }
  };

  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("Product deleted successfully");
  };

  // In your cart page, update the handleWhatsAppOrder function:
  const handleWhatsAppOrder = () => {
    if (
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.phone
    ) {
      toast.error("Please fill in all shipping address fields");
      return;
    }

    // Create order using the store
    const order = createOrder({
      customerEmail: user?.primaryEmailAddress?.emailAddress || "",
      customerName: user?.fullName || user?.firstName || "Customer",
      clerkUserId: user?.id || "",
      items: cartProducts.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      })),
      totalAmount: getTotalPrice(),
      subtotal: getSubtotalPrice(),
      shippingAddress,
      paymentMethod: "cash_on_delivery",
      status: "pending",
    });

    // Format order details for WhatsApp message
    const orderDetails = cartProducts
      .map(
        (item) =>
          `• ${item.product.name} (${item.product.variant}) - Qty: ${item.quantity} - GHS ${(item.product.price * item.quantity).toFixed(2)}`
      )
      .join("\n");

    const customerName = user?.fullName || user?.firstName || "Customer";

    const message = `🛒 *NEW ORDER - Payment on Delivery* 🛒

*Order Number:* ${order.orderNumber}

*Customer Details:*
Name: ${customerName}
Phone: ${shippingAddress.phone}
Email: ${user?.primaryEmailAddress?.emailAddress || "Not provided"}

*Shipping Address:*
Street: ${shippingAddress.street}
City: ${shippingAddress.city}
State: ${shippingAddress.state}
Country: ${shippingAddress.country}

*Order Items:*
${orderDetails}

*Order Summary:*
Subtotal: GHS ${getSubtotalPrice().toFixed(2)}
Total: GHS ${getTotalPrice().toFixed(2)}

*Payment Method:* Cash on Delivery
*Order Time:* ${new Date().toLocaleString()}

Please confirm this order and provide delivery details.`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // WhatsApp business number
    const whatsappNumber = "233265056031";

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Reset cart and close form
    resetCart();
    setShowCheckoutForm(false);

    // Show success message
    toast.success("Order details sent successfully! Opening WhatsApp...");

    // Open WhatsApp in new tab
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 1000);
  };

  // Use useCallback to prevent unnecessary re-renders
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setShippingAddress((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  // Memoize the form component to prevent re-renders
  const ShippingAddressForm = React.memo(() => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="street" className="text-sm font-medium">
          Street Address *
        </Label>
        <Input
          id="street"
          name="street"
          value={shippingAddress.street}
          onChange={handleInputChange}
          placeholder="Enter your street address"
          required
          className="mt-1"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city" className="text-sm font-medium">
            City *
          </Label>
          <Input
            id="city"
            name="city"
            value={shippingAddress.city}
            onChange={handleInputChange}
            placeholder="City"
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="state" className="text-sm font-medium">
            State/Region *
          </Label>
          <Input
            id="state"
            name="state"
            value={shippingAddress.state}
            onChange={handleInputChange}
            placeholder="State/Region"
            required
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="country" className="text-sm font-medium">
            Country
          </Label>
          <Input
            id="country"
            name="country"
            value={shippingAddress.country}
            onChange={handleInputChange}
            placeholder="Country"
            className="mt-1 bg-gray-50"
            disabled
          />
        </div>
        <div>
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone Number *
          </Label>
          <Input
            id="phone"
            name="phone"
            value={shippingAddress.phone}
            onChange={handleInputChange}
            placeholder="+233 XX XXX XXXX"
            required
            className="mt-1"
          />
        </div>
      </div>
    </div>
  ));

  ShippingAddressForm.displayName = "ShippingAddressForm";

  const ProceedToCheckoutButton = () => {
    if (!showCheckoutForm) {
      return (
        <Button
          className="w-full mt-6 font-semibold cursor-pointer bg-green-600 hover:bg-green-700 text-white"
          onClick={() => setShowCheckoutForm(true)}
          size="lg"
        >
          Proceed to Checkout
        </Button>
      );
    }

    return (
      <div className="mt-6 space-y-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg text-green-900">
            Shipping Information
          </h3>
          <p className="text-sm text-green-700 mt-1">
            Please provide your shipping details for order delivery
          </p>
        </div>

        <ShippingAddressForm />

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-green-800">
              WhatsApp Order Confirmation
            </h4>
          </div>
          <p className="text-sm text-green-700">
            After filling your details, click the button below to confirm your
            order via WhatsApp. You&apos;ll pay when your order is delivered.
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            className="flex-1 cursor-pointer"
            onClick={() => setShowCheckoutForm(false)}
          >
            Back to Cart
          </Button>
          <Button
            className="flex-1 bg-green-600 hover:bg-green-700 text-white cursor-pointer"
            onClick={handleWhatsAppOrder}
            size="lg"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Confirm Order via WhatsApp
          </Button>
        </div>
      </div>
    );
  };

  // Render loading state until client-side
  if (!isClient) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20 md:pb-10">
      {isSignedIn ? (
        <Container>
          {cartProducts?.length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag className="w-6 h-6" />
                <h1 className="text-xl font-semibold">Shopping Cart</h1>
                <div className="ml-auto text-sm text-gray-600">
                  {user?.firstName && `Welcome, ${user.firstName}!`}
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                {/* Products Section */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="border bg-white rounded-lg shadow-sm">
                    {cartProducts?.map(({ product }) => {
                      const itemCount = getItemCount(product?._id);
                      return (
                        <div
                          key={product?._id}
                          className="border-b p-4 last:border-b-0 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex flex-1 items-center gap-4 min-h-32 md:min-h-40">
                            {product?.images && (
                              <Link
                                href={`/product/${product?.slug?.current}`}
                                className="border p-1 rounded-md overflow-hidden group flex-shrink-0"
                              >
                                <Image
                                  src={urlFor(product?.images[0]).url()}
                                  alt="productImage"
                                  width={120}
                                  height={120}
                                  loading="lazy"
                                  className="w-24 h-24 md:w-32 md:h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                              </Link>
                            )}
                            <div className="flex flex-1 flex-col justify-between h-full py-1">
                              <div className="space-y-2">
                                <Link
                                  href={`/product/${product?.slug?.current}`}
                                  className="font-semibold line-clamp-2 hover:text-blue-600 transition-colors"
                                >
                                  {product?.name}
                                </Link>
                                <p className="text-sm text-gray-500 line-clamp-2">
                                  {product?.intro}
                                </p>
                                <p className="text-sm capitalize">
                                  Variant:{" "}
                                  <span className="font-semibold text-gray-700">
                                    {product.variant}
                                  </span>
                                </p>
                              </div>
                              <div className="text-gray-500 flex items-center gap-4 mt-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button className="p-1 hover:text-emerald-400 transition-colors">
                                        <Heart className="w-4 h-4 md:w-5 md:h-5" />
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Add to Favourite</p>
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button
                                        onClick={() =>
                                          handleDeleteProduct(product?._id)
                                        }
                                        className="p-1 hover:text-red-600 transition-colors cursor-pointer"
                                      >
                                        <TrashIcon className="w-4 h-4 md:w-5 md:h-5" />
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Remove from cart</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                            <div className="flex flex-col items-end justify-between h-full py-1">
                              <PriceFormatter
                                amount={(product?.price as number) * itemCount}
                                className="font-bold text-base md:text-lg text-gray-900"
                              />
                              <QuantityButton product={product} />
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="p-4 border-t">
                      <Button
                        className="font-semibold cursor-pointer"
                        variant="destructive"
                        onClick={handleResetCart}
                        size="sm"
                      >
                        Clear Entire Cart
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Order Summary & Checkout Section */}
                <div className="lg:col-span-1">
                  <div className="sticky top-6 space-y-6">
                    <div className="w-full bg-white p-6 rounded-lg border shadow-sm">
                      <h2 className="text-xl font-semibold mb-4">
                        Order Summary
                      </h2>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            Subtotal ({cartProducts.length} items)
                          </span>
                          <PriceFormatter amount={getSubtotalPrice()} />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Discount</span>
                          <PriceFormatter
                            amount={getSubtotalPrice() - getTotalPrice()}
                            className="text-green-600 font-medium"
                          />
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Total</span>
                          <PriceFormatter
                            amount={getTotalPrice()}
                            className="text-black"
                          />
                        </div>
                      </div>

                      <ProceedToCheckoutButton />

                      {/* WhatsApp Order Info */}
                      <div className="mt-6 space-y-3">
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <MessageCircle className="w-3 h-3 text-white" />
                          </div>
                          <span>
                            Confirm order via WhatsApp - Pay on Delivery
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Checkout Button - Fixed at bottom */}
              <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg z-40">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <span className="font-semibold text-sm">Total:</span>
                    <PriceFormatter
                      amount={getTotalPrice()}
                      className="text-lg font-bold ml-2"
                    />
                  </div>
                  <Button
                    className="bg-green-600 hover:bg-green-700 font-semibold text-white"
                    onClick={() => setShowCheckoutForm(true)}
                    size="lg"
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
}
