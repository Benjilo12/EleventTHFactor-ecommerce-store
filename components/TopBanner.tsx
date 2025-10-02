// components/TopBanner.tsx
import React from "react";

interface TopBannerProps {
  title: string;
  backgroundImage?: string;
  overlayColor?: string;
  height?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const TopBanner: React.FC<TopBannerProps> = ({
  title,
  backgroundImage = "/Simple.jpg", // Default image path from public/
  overlayColor = "rgba(0, 0, 0, 0.4)", // Default dark overlay
  height = "md", // Default height size
  className = "", // Default spacing
}) => {
  // Map height prop to Tailwind classes
  const heightClasses: Record<NonNullable<TopBannerProps["height"]>, string> = {
    sm: "h-48 md:h-56",
    md: "h-64 md:h-72",
    lg: "h-80 md:h-96",
    xl: "h-96 md:h-[500px]",
  };

  return (
    <section
      className={`
        relative 
        flex 
        items-center 
        justify-center 
        ${heightClasses[height]} 
        ${className}
      `}
      style={{
        backgroundImage: `linear-gradient(${overlayColor}, ${overlayColor}), url('${backgroundImage}')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="text-center px-4">
        <h1
          className="
            text-white 
            font-bold 
            text-4xl 
            md:text-6xl 
            lg:text-7xl 
            drop-shadow-lg
            animate-fade-in
          "
          data-aos="fade-up"
          data-aos-duration="800"
        >
          {title}
        </h1>
      </div>
    </section>
  );
};

export default TopBanner;
