import React from "react";
import { motion } from "motion/react";
import Logo from "./Logo";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMedia from "./SocialMedia";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { CATEGORIES_QUERYResult } from "@/sanity.types"; // ✅ Import category type

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CATEGORIES_QUERYResult; // ✅ Add this
}

export default function Sidebar({ isOpen, onClose, categories }: SidebarProps) {
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 bg-black/50 shadow-xl hoverEffect w-full ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        ref={sidebarRef}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="min-w-72 max-w-96 bg-black text-white/70 h-full p-10 border-r border-r-white flex flex-col gap-6"
      >
        <div className="flex items-center justify-between">
          <button onClick={onClose}>
            <Logo className="text-white">EleventTHFactor</Logo>
          </button>

          <button className="hover:text-pink-500 hoverEffect" onClick={onClose}>
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* ✅ Navigation Links from Categories */}
        <div className="flex flex-col gap-3.5 text-base font-semibold tracking-wide">
          <Link
            href="/"
            onClick={() => setTimeout(onClose, 100)} // ✅ Allow navigation then close
            className={`hover:text-white hoverEffect ${
              pathname === "/" && "text-fuchsia-500"
            }`}
          >
            Home
          </Link>

          {categories?.map((category) => (
            <Link
              key={category._id}
              href={`/category/${category.slug?.current}`}
              onClick={() => setTimeout(onClose, 100)} // ✅ Small delay prevents route block
              className={`hover:text-white hoverEffect ${
                pathname === `/category/${category.slug?.current}` &&
                "text-fuchsia-500"
              }`}
            >
              {category.title}
            </Link>
          ))}
        </div>

        <SocialMedia />
      </motion.div>
    </div>
  );
}
