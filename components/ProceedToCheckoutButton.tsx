// components/ProceedToCheckoutButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import React from "react";

interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  phone: string;
}

interface ProceedToCheckoutButtonProps {
  showCheckoutForm: boolean;
  shippingAddress: ShippingAddress;
  onShowForm: () => void;
  onHideForm: () => void;
  onConfirmOrder: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// ShippingAddressForm component (moved here to keep it together)
const ShippingAddressForm = React.memo(
  ({
    shippingAddress,
    onInputChange,
  }: {
    shippingAddress: ShippingAddress;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <div className="space-y-4">
      <div>
        <label htmlFor="street" className="text-sm font-medium">
          Street Address *
        </label>
        <input
          id="street"
          name="street"
          value={shippingAddress.street}
          onChange={onInputChange}
          placeholder="Enter your street address"
          required
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="text-sm font-medium">
            City *
          </label>
          <input
            id="city"
            name="city"
            value={shippingAddress.city}
            onChange={onInputChange}
            placeholder="City"
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="state" className="text-sm font-medium">
            State/Region *
          </label>
          <input
            id="state"
            name="state"
            value={shippingAddress.state}
            onChange={onInputChange}
            placeholder="State/Region"
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="country" className="text-sm font-medium">
            Country
          </label>
          <input
            id="country"
            name="country"
            value={shippingAddress.country}
            onChange={onInputChange}
            placeholder="Country"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number *
          </label>
          <input
            id="phone"
            name="phone"
            value={shippingAddress.phone}
            onChange={onInputChange}
            placeholder="+233 XX XXX XXXX"
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
    </div>
  )
);

ShippingAddressForm.displayName = "ShippingAddressForm";

export default function ProceedToCheckoutButton({
  showCheckoutForm,
  shippingAddress,
  onShowForm,
  onHideForm,
  onConfirmOrder,
  onInputChange,
}: ProceedToCheckoutButtonProps) {
  if (!showCheckoutForm) {
    return (
      <Button
        className="w-full mt-6 font-semibold cursor-pointer bg-green-600 hover:bg-green-700 text-white"
        onClick={onShowForm}
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

      <ShippingAddressForm
        shippingAddress={shippingAddress}
        onInputChange={onInputChange}
      />

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
          onClick={onHideForm}
        >
          Back to Cart
        </Button>
        <Button
          className="flex-1 bg-green-600 hover:bg-green-700 text-white cursor-pointer"
          onClick={onConfirmOrder}
          size="lg"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Confirm Order via WhatsApp
        </Button>
      </div>
    </div>
  );
}
