import { productType } from "@/constant";
import { Repeat } from "lucide-react";
import React from "react";

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

export default function HomeTabbar({ selectedTab, onTabSelect }: Props) {
  return (
    <div className="flex items-center gap-1.5 text-sm justify-center font-semibold flex-wrap">
      <div className="flex items-center gap-2.5">
        {productType?.map((item) => (
          <button
            className={`border border-black px-2 text-xs md:text-base py-1.5 md:py-2 md:px-6 rounded-full hover:bg-black hover:text-white cursor-pointer hoverEffect ${selectedTab === item?.title && "bg-black text-white"}`}
            key={item?.title}
            onClick={() => onTabSelect(item?.title)}
          >
            {item?.title}
          </button>
        ))}
      </div>
      <button
        className={`border border-black p-1.5 md:p-2 rounded-full hover:bg-black hover:text-white cursor-pointer hoverEffect`}
      >
        {" "}
        <Repeat className="w-5 h-5" />
      </button>
    </div>
  );
}
