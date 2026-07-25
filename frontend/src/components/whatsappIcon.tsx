// @ts-nocheck
// components/WhatsAppBubble.js
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function WhatsAppBubble() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("pulse");
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Animation sequence
  useEffect(() => {
    setIsVisible(true); // Fade in on mount

    const animations = ["pulse", "bounce", "tada", "shake"];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % animations.length;
      setCurrentAnimation(animations[index]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Tooltip display on hover
  useEffect(() => {
    let timeout;
    if (isHovered) {
      timeout = setTimeout(() => {
        setShowTooltip(true);
      }, 500);
    } else {
      setShowTooltip(false);
    }
    return () => clearTimeout(timeout);
  }, [isHovered]);

  const getAnimationClass = () => {
    switch (currentAnimation) {
      case "pulse":
        return "animate-pulse";
      case "bounce":
        return "animate-bounce";
      case "tada":
        return "animate-tada";
      case "shake":
        return "animate-shake";
      default:
        return "animate-pulse";
    }
  };

  return (
    <div
      className={`fixed bottom-24 right-4 z-50 transition-opacity duration-1000 sm:bottom-28 sm:right-6 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative">
        {showTooltip && (
          <div className="absolute right-20 bottom-0 bg-gray-100 text-gray-800 px-3 py-2 rounded-lg shadow-md whitespace-nowrap animate-fade-in">
            Chat with us!
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-100 rotate-45"></div>
          </div>
        )}

        <Link
          href="https://wa.me/919873334405"
          target="_blank"
          rel="noopener noreferrer"
          className={`relative ${getAnimationClass()} 
            w-16 h-16 flex items-center justify-center transition-all duration-300 sm:h-20 sm:w-20
            ${isHovered ? "scale-110 rotate-12" : "scale-100 rotate-0"}
            hover:drop-shadow-xl`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src="/chat-icon.png"
            alt="Chat"
            width={80}
            height={80}
            className={`h-16 w-16 object-contain drop-shadow-lg transition-all duration-300 sm:h-20 sm:w-20 ${
              isHovered ? "scale-110 rotate-12" : "scale-100 rotate-0"
            }`}
          />

          {/* Ripple effect */}
          {isHovered && (
            <>
              <span className="absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-0 animate-ripple-1"></span>
              <span className="absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-0 animate-ripple-2"></span>
            </>
          )}
        </Link>
      </div>
    </div>
  );
}
