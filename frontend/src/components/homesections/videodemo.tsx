// @ts-nocheck
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "WE BUILD\nYOUR DREAM",
    description:
      "Premium bearing solutions for factories, heavy machinery, and industrial operations built around dependable performance.",
    background: "/srobanners/landing-page-banner1.png",
    showContent: true, // is slide pe text/buttons dikhenge
  },
  {
    title: "PRECISION IN\nEVERY MOTION",
    description:
      "SRO Bearings supports demanding applications with durable products, responsive service, and trusted technical knowledge.",
    background: "/srobanners/landingbanner2.png",
    showContent: true, // is slide pe text/buttons dikhenge
  },
  {
    title: "",
    description: "",
    background: "/home-page/plummer-blocks.png",
    showContent: false, // is slide pe text/buttons hide rahenge
  },
    {
    title: "",
    description: "",
    background: "/srobanners/roller-chains-banner.png",
    showContent: false, // is slide pe text/buttons hide rahenge
  },
   {
    title: "",
    description: "",
    background: "/srobanners/multi-row-banner.jpeg",
    showContent: false, // is slide pe text/buttons hide rahenge
  },
  {
    title: "",
    description: "",
    background: "/srobanners/spherical-roller-bearings-banner.jpeg",
    showContent: false, // is slide pe text/buttons hide rahenge
  },
  {
    title: "",
    description: "",
    background: "/srobanners/taper-roller-banner.jpeg",
    showContent: false, // is slide pe text/buttons hide rahenge
  },
  {
    title: "",
    description: "",
    background: "/srobanners/thrust-banner-banner.jpeg",
    showContent: false, // is slide pe text/buttons hide rahenge
  },
];

const Videodemo = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section
      className="relative min-h-[620px] overflow-hidden bg-slate-950 bg-cover bg-center bg-no-repeat pt-[88px] transition-[background-image] duration-700 sm:min-h-[680px] md:min-h-screen md:pt-[118px]"
      style={{ backgroundImage: `url('${slide.background}')` }}
    >
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/25 via-white/10 to-transparent" />
      {/* <div className="absolute inset-0 bg-gradient-to-r from-black/58 via-black/18 to-transparent" /> */}

      {/* <div className="absolute bottom-6 right-4 z-20 flex border border-white/30 bg-black/30 backdrop-blur-sm md:bottom-8 md:right-10">
        <button
          type="button"
          onClick={goToPrevious}
          className="grid h-12 w-12 place-items-center border-r border-white/25 text-white transition hover:bg-white hover:text-slate-950 md:h-14 md:w-14"
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} strokeWidth={1.8} />
        </button>

        <button
          type="button"
          onClick={goToNext}
          className="grid h-12 w-12 place-items-center text-white transition hover:bg-white hover:text-slate-950 md:h-14 md:w-14"
          aria-label="Next slide"
        >
          <ChevronRight size={28} strokeWidth={1.8} />
        </button>
      </div> */}

      {/* Yeh content block sirf tabhi render hota hai jab slide.showContent true ho */}
      {slide.showContent && (
        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-[1200px] items-center px-4 pb-20 pt-8 sm:px-6 md:min-h-[620px] md:px-10">
          <div className="max-w-[680px]">
            <h1 className="whitespace-pre-line text-[34px] font-black leading-[1.12] tracking-[0.06em] text-white min-[380px]:text-[40px] sm:text-[58px] sm:tracking-[0.1em] md:text-[64px]">
              {slide.title}
            </h1>

            <p className="mt-5 max-w-[620px] text-sm font-medium leading-7 text-white/90 sm:mt-6 sm:text-lg sm:leading-8">
              {slide.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap sm:gap-5">
              <Link
                href="/about"
                className="inline-flex justify-center bg-white px-6 py-4 text-xs font-extrabold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-[#00974A] sm:px-8 sm:tracking-[0.24em]"
              >
                About Us
              </Link>
              <Link
                href="/services"
                className="inline-flex justify-center border border-white px-6 py-4 text-xs font-extrabold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-slate-950 sm:px-8 sm:tracking-[0.24em]"
              >
                Services
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Agar content hide hai to bhi section ki min-height maintain rahe, isliye ek khali spacer */}
      {!slide.showContent && (
        <div className="relative z-10 min-h-[520px] md:min-h-[620px]" />
      )}

      <div className="absolute bottom-7 left-4 z-20 flex items-center gap-3 md:bottom-9 md:left-10">
        {slides.map((item, index) => (
          <button
            key={item.background}
            type="button"
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 transition-all ${
              index === currentSlide
                ? "w-16 bg-[#00974A]"
                : "w-9 bg-white/70 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Videodemo;