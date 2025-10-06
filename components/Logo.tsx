import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Logo({ children, className }: Props) {
  return (
    <Link href="/" className="flex items-center gap-1 sm:gap-1">
      <Image
        src="/logo1.png"
        alt="logo"
        width={62}
        height={62}
        className="md:w-15 md:h-15 w-6 h-6"
      />
      <h2
        className={cn(
          "text-lg md:text-2xl text-[12px] text-black font-black tracking-wider uppercase",
          className
        )}
      >
        {children}
      </h2>
    </Link>
  );
}
