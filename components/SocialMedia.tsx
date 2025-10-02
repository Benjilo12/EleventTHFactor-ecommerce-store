import React from "react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import {
  FacebookIcon,
  Icon,
  Instagram,
  InstagramIcon,
  XIcon,
} from "lucide-react";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import { title } from "process";

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const socialLink = [
  {
    title: "Instagram",
    href: "https://www.instagram.com/eleventhfactor?igsh=a2Q4MTh2ZjJqZTBs&utm_source=qr",
    Icon: <InstagramIcon className="w-5 h-5" />,
  },
  {
    title: "X.com",
    href: "http://www.X.com",
    Icon: <XIcon className="w-5 h-5" />,
  },
  {
    title: "Facebook",
    href: "http://www.Facebook.com",
    Icon: <FacebookIcon className="w-5 h-5" />,
  },
];

export default function SocialMedia({
  className,
  iconClassName,
  tooltipClassName,
}: Props) {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5", className)}>
        {socialLink?.map((item) => (
          <Tooltip key={item?.title}>
            <TooltipTrigger asChild>
              <Link
                href={item?.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("p-2 border rounded-full", iconClassName)}
              >
                {item?.Icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "bg-white text-black font-semibold text-xs",
                tooltipClassName
              )}
            >
              {item?.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
