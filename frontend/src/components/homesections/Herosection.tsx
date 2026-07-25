// @ts-nocheck
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const HomePageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const sliderRef = useRef(null);
  const autoPlayTimeoutRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Detect touch device
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia("(pointer: coarse)").matches
      );
    };
    checkTouchDevice();
    window.addEventListener("resize", checkTouchDevice);
    return () => window.removeEventListener("resize", checkTouchDevice);
  }, []);

  const slides = [
    {
      id: 1,
      upperText: "WELCOME TO SRO BEARINGS",
      title: "Empowering Industries with Precision Bearings",
      subtitle: "Trusted Trader of Premium Bearings",
      description:
        "At SRO, we understand the critical role bearings play in ensuring seamless operations across various industries.",
      buttonText: "Explore Bearings",
      bgGradient: "from-[#00974A] to-[#00974A]",
      bgImage:
        "https://cdn.pixabay.com/photo/2017/01/06/15/45/ball-bearings-1958083_1280.jpg",
    },
    {
      id: 2,
      upperText: "QUALITY YOU CAN TRUST",
      title: "Delivering Excellence in Every Bearing",
      subtitle: "Enhancing Performance Across Sectors",
      description:
        "We offer a wide range of premium bearings, ensuring reliability and durability for all industrial needs.",
      buttonText: "Discover More",
      bgGradient: "from-gray-700 to-gray-900",
      bgImage:
        "https://as1.ftcdn.net/jpg/13/74/03/06/1000_F_1374030638_VNkxrIbcTuYuJetgVvY5jNwWMI33f4GD.webp",
    },
    {
      id: 3,
      upperText: "YOUR TRUSTED PARTNER",
      title: "Commitment to Quality & Service",
      subtitle: "Bearing Solutions Tailored for You",
      description:
        "Our mission is to support your operations with precision-engineered products and exceptional service.",
      buttonText: "Start Partnership",
      bgGradient: "from-[#00974A] to-gray-800",
      bgImage:
        "https://as1.ftcdn.net/v2/jpg/11/77/95/16/1000_F_1177951650_Jxu0QsY7kzQtZCpUZx8SS9AmgvHSrNF0.jpg",
    },
    {
      id: 4,
      upperText: "OVER 40 YEARS OF TRUST",
      title: "SRO Bharat – A Legacy of Excellence",
      subtitle: "Empowering Industries Worldwide",
      description:
        "With a legacy spanning 40+ years, SRO Bharat delivers high-performance bearings and industrial solutions across steel, mining, automotive, and more. Our values: Quality, Precision, Integrity, and Innovation.",
      buttonText: "Know More About Us",
      bgGradient: "from-gray-800 to-[#00974A]",
      bgImage:
        "https://as2.ftcdn.net/v2/jpg/04/13/01/33/1000_F_413013351_jkU9KwzPfTcLFkXqT08HnvJcWmq8WaUk.jpg",
    },
  ];

  // Memoized navigation functions
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    pauseAutoPlay();
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    pauseAutoPlay();
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    pauseAutoPlay();
  }, []);

  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 8000);
  }, []);

  // Auto-play effect
  useEffect(() => {
    let interval;
    if (isAutoPlaying && !isHovering) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, isHovering, slides.length]);

  // Event handlers
  const handleMouseEnter = useCallback(() => {
    if (!isTouchDevice) {
      setIsHovering(true);
      pauseAutoPlay();
    }
  }, [isTouchDevice, pauseAutoPlay]);

  const handleMouseLeave = useCallback(() => {
    if (!isTouchDevice) {
      setIsHovering(false);
      setIsAutoPlaying(true);
    }
  }, [isTouchDevice]);

  // Touch handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    pauseAutoPlay();
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    } else if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowRight":
          nextSlide();
          break;
        case "ArrowLeft":
          prevSlide();
          break;
        case " ":
          pauseAutoPlay();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, pauseAutoPlay]);

  // Preload images
  useEffect(() => {
    const preloadImages = slides.map((slide) => {
      const img = new Image();
      img.src = slide.bgImage;
      return img;
    });
  }, [slides]);

  return (
    <div
      ref={sliderRef}
      className="relative w-full overflow-hidden select-none h-[60vh] md:h-screen transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Image carousel"
    >
      {/* Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
            aria-hidden={index !== currentSlide}
            aria-live={index === currentSlide ? "polite" : "off"}
          >
            <div
              className={`h-full w-full bg-gradient-to-br ${slide.bgGradient} relative`}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.bgImage})` }}
                aria-hidden="true"
              />

              {/* Overlays */}
              <div
                className="absolute inset-0 bg-black/50"
                aria-hidden="true"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} opacity-70`}
                aria-hidden="true"
              />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="text-center text-white max-w-4xl mx-auto w-full px-2">
                  <div className="mb-2 sm:mb-4 opacity-90">
                    <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-lg font-medium tracking-widest uppercase border border-white/20">
                      {slide.upperText}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 leading-tight">
                    {slide.title}
                  </h1>

                  <h2 className="text-lg sm:text-lg md:text-lg lg:text-2xl font-light mb-3 sm:mb-6 text-gray-200">
                    {slide.subtitle}
                  </h2>

                  <p className="text-xs sm:text-base md:text-lg mb-4 sm:mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {slide.description}
                  </p>

                  <button
                    className="group bg-white text-gray-900 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold text-xs sm:text-base hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    aria-label={slide.buttonText}
                  >
                    {slide.buttonText}
                    <ArrowRight className="inline-block ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Decorative elements */}
              <div
                className="absolute top-8 left-8 sm:top-16 sm:left-16 w-16 h-16 sm:w-32 sm:h-32 bg-white/5 rounded-full blur-xl sm:blur-3xl"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-8 right-8 sm:bottom-16 sm:right-16 w-24 h-24 sm:w-40 sm:h-40 bg-[#00974A]/10 rounded-full blur-xl sm:blur-3xl"
                aria-hidden="true"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-1 sm:p-2 rounded-full transition-all duration-300 hover:scale-110 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-1 sm:p-2 rounded-full transition-all duration-300 hover:scale-110 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            } focus:outline-none focus:ring-2 focus:ring-white`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : "false"}
          />
        ))}
      </div>

      {/* Auto-play Status Indicator */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 flex items-center space-x-1">
        <div
          className={`w-2 h-2 rounded-full ${
            isAutoPlaying ? "bg-[#00974A] animate-pulse" : "bg-gray-400"
          }`}
          aria-hidden="true"
        />
        <span className="text-white text-xs font-medium bg-black/30 px-2 py-0.5 rounded">
          {isAutoPlaying ? "Auto" : "Manual"}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-white/20 z-20">
        <div
          className="h-full bg-white transition-all duration-1000 ease-linear"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
            transitionDuration: isAutoPlaying ? "5000ms" : "300ms",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Screen Reader Announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Slide ${currentSlide + 1} of ${slides.length}: ${
          slides[currentSlide].title
        }`}
      </div>
    </div>
  );
};

export default HomePageSlider;
