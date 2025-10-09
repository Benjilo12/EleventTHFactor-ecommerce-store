// app/not-found.tsx
import Link from "next/link";
import { Home, Search, ShoppingBag } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-gray-900 opacity-10 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              404
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>

        <p className="text-gray-600 mb-8 text-lg">
          Oops! The page you&apos;re looking for seems to have wandered off.
          Let&apos;s get you back to shopping!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
          >
            <Home size={20} />
            Back to Home
          </Link>

          <Link
            href="/products"
            className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            <ShoppingBag size={20} />
            Continue Shopping
          </Link>
        </div>

        {/* Quick Search Suggestion */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-3">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
          >
            <Search size={16} />
            Try our search page
          </Link>
        </div>
      </div>
    </div>
  );
}
