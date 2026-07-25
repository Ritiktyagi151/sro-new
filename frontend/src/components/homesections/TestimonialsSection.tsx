// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const accentColor = "#00974A";

const testimonials = [
  {
    name: "Amit Sharma",
    role: "Plant Maintenance Head",
    quote:
      "SRO Bearings helped us identify the right bearing fit for our conveyor line. The response was quick and the product support was practical.",
  },
  {
    name: "Rohit Mehta",
    role: "Purchase Manager",
    quote:
      "Their team understands urgency. We received clear availability, pricing, and dispatch support for our industrial bearing requirement.",
  },
  {
    name: "Neha Verma",
    role: "Operations Lead",
    quote:
      "The guidance on housings and bearing replacement reduced confusion for our maintenance team and helped us plan the shutdown better.",
  },
  {
    name: "Vikram Singh",
    role: "Workshop Supervisor",
    quote:
      "Good product range, dependable communication, and useful support for matching bearings with machine applications.",
  },
  {
    name: "Sanjay Gupta",
    role: "Factory Owner",
    quote:
      "SRO Bearings has been a reliable source for bearings, roller chains, and related maintenance products for our plant.",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(1);
      } else {
        setVisibleItems(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = useMemo(
    () => Math.max(testimonials.length - visibleItems, 0),
    [visibleItems]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(timer);
  }, [maxIndex]);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  return (
    <section className="overflow-hidden bg-gradient-to-b from-[#00974A]/10 to-white px-4 pb-24 pt-16 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className=" max-w-4xl border-b border-slate-200 pb-6">
          <p className="border-l-4 border-[#00974A] pl-3 text-xs font-black uppercase tracking-[0.28em] text-slate-500">
            Customer Voice
          </p>
          <h2 className="mt-4 text-3xl font-sans font-bold text-slate-950 md:text-4xl">
            Testimonials
          </h2>
          <p className="mt-5 text-base font-medium leading-7 text-slate-600">
            Customers trust SRO Bearings for reliable products, quick response,
            and practical support across industrial applications.
          </p>
        </div>

        <div className="relative mt-14">
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 text-slate-950 transition duration-300 hover:text-[#00974A]"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={42} strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 text-slate-950 transition duration-300 hover:text-[#00974A]"
            aria-label="Next testimonial"
          >
            <ChevronRight size={42} strokeWidth={2} />
          </button>

          <div className="mx-8 overflow-hidden sm:mx-10">
            <div
              className="flex transition-transform duration-700 ease-in-out will-change-transform"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
              }}
            >
              {testimonials.map((item) => (
                <div
                  key={`${item.name}-${item.role}`}
                  className="shrink-0 px-1 sm:px-4"
                  style={{ width: `${100 / visibleItems}%` }}
                >
                  <article className="relative pt-16">
                    <div className="absolute left-3 top-0 z-10 flex items-center sm:left-8">
                      <span
                        className="h-2 w-8 sm:w-12"
                        style={{ backgroundColor: accentColor }}
                      />
                      <Quote
                        className="mx-3 h-12 w-12 sm:mx-4 sm:h-16 sm:w-16"
                        style={{ fill: accentColor, color: accentColor }}
                      />
                      <span
                        className="h-2 w-16 sm:w-44"
                        style={{ backgroundColor: accentColor }}
                      />
                    </div>

                    <div
                      className="relative min-h-[340px] border-[7px] bg-slate-50 px-5 pb-12 pt-24 sm:min-h-[250px] sm:px-8 sm:pb-9 sm:pt-20"
                      style={{ borderColor: accentColor }}
                    >
                      <div className="absolute -top-7 left-5 right-5 bg-slate-950 px-5 py-4 text-white sm:-top-8 sm:left-8 sm:right-8 sm:px-8 sm:py-6">
                        <h3 className="text-base font-black uppercase tracking-wide sm:text-lg">
                          {item.name}
                        </h3>
                        <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-white/90 sm:text-sm sm:tracking-[0.14em]">
                          {item.role}
                        </p>
                      </div>

                      <p className="text-center text-sm font-semibold leading-7 text-slate-700 sm:text-base sm:leading-8">
                        {item.quote}
                      </p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 rounded-full transition ${
                currentIndex === index
                  ? "bg-slate-950"
                  : "bg-white ring-2 ring-slate-950"
              }`}
              aria-label={`Go to testimonial slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
