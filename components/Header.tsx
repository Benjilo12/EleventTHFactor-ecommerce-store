import React from "react";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import Container from "./Container";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import { currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ListOrdered } from "lucide-react";
import { getAllCategories } from "@/sanity/lib/helpers/queries";

// Client component for order notification badge
import OrderNotificationBadge from "./OrderNotificationBadge";

export default async function Header() {
  const user = await currentUser();
  const categories = await getAllCategories();

  return (
    <header className=" border-b border-b-gray-400 py-5 sticky top-0 z-50 bg-white">
      <Container className="flex items-center justify-between gap-7 text-gray-700">
        <HeaderMenu categories={categories} />
        <div className="w-auto md:w-1/3 flex flex-center justify-center items-center gap-2.5">
          <MobileMenu categories={categories} />
          <Logo className="italic font-bold hidden md:block">
            EleventhFactor
          </Logo>
        </div>
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <ClerkLoaded>
            <SignedIn>
              <Link href="/orders" className="group relative">
                <ListOrdered className="w-5 h-5 group-hover:text-black hoverEffect" />
                <OrderNotificationBadge />
              </Link>
              <UserButton />
            </SignedIn>
            {!user && (
              <SignInButton mode="modal">
                <button className="text-sm font-semibold hover:text-black cursor-pointer">
                  Login
                </button>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
}
