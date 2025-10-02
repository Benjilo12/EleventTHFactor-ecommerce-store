import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Logo({ children, className }: Props) {
  return (
    <Link href="/" className="flex items-center gap-2 sm:gap-3">
      <Image
        src="/logo.jpeg"
        alt="logo"
        width={32}
        height={32}
        className="md:w-10 md:h-10 w-6 h-6"
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
