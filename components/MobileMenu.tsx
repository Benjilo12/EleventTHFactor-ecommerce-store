"use client";

import { AlignLeft } from "lucide-react";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { CATEGORIES_QUERYResult } from "@/sanity.types"; // Import the correct type

interface MobileMenuProps {
  categories: CATEGORIES_QUERYResult;
}

export default function MobileMenu({ categories }: MobileMenuProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <AlignLeft className="hover:text-black hoverEffect md:hidden" />
      </button>
      <div className="md:hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          categories={categories} // ✅ Pass down to Sidebar
        />
      </div>
    </>
  );
}
