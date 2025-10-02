import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: Props) {
  return (
    <div className={cn("max-w-screen-xl mx-auto px-4 ", className)}>
      {children}
    </div>
  );
}
