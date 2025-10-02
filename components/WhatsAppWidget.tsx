"use client";

import { useEffect, useState } from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";

const WhatsAppWidget: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [widgetKey, setWidgetKey] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      // Force re-render on resize to apply mobile/desktop differences
      setWidgetKey((prev) => prev + 1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <FloatingWhatsApp
      key={widgetKey} // Force re-render on resize
      phoneNumber="233265056031"
      accountName="EleventTHFactor"
      avatar="/logo.jpeg"
      statusMessage="Typically replies in a few minutes"
      chatMessage="Hi there! 👋 How can we help you?"
      placeholder="Type a message..."
      allowEsc={true}
      allowClickAway={false}
      notification={true}
      notificationDelay={30000} // Show notification after 30 seconds
      notificationSound={true}
      darkMode={false}
      // Mobile-specific props
      {...(isMobile && {
        notification: false, // Disable notification on mobile
        buttonStyle: {
          bottom: "20px",
          right: "20px",
        },
      })}
      // Desktop-specific props
      {...(!isMobile && {
        notification: true,
        buttonStyle: {
          bottom: "30px",
          right: "30px",
        },
      })}
    />
  );
};

export default WhatsAppWidget;
