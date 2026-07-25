// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { apiGet } from "@/utils/api";
import { bearingMarkets, getMarketImage } from "@/data/markets";

export default function MarketSlider() {
  const [markets, setMarkets] = useState(bearingMarkets);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(5);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const data = await apiGet("/cms/industries");
        const apiMarkets = data.industries?.length ? data.industries : [];
        setMarkets(apiMarkets.length >= 5 ? apiMarkets : bearingMarkets);
      } catch (error) {
        console.error("Failed to fetch markets:", error);
        setMarkets(bearingMarkets);
      }
    };

    fetchMarkets();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 900) {
        setVisibleItems(2);
      } else if (window.innerWidth < 1180) {
        setVisibleItems(3);
      } else {
        setVisibleItems(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = useMemo(
    () => Math.max(markets.length - visibleItems, 0),
    [markets.length, visibleItems]
  );

  useEffect(() => {
    if (isHovering || maxIndex === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3200);

    return () => clearInterval(timer);
  }, [isHovering, maxIndex]);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  return (
    <section
      className="bg-gradient-to-b from-green-50 to-white px-3 py-12"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="mx-auto mb-8 max-w-[1500px] border-b border-slate-200 px-1 pb-6">
        <p className="border-l-4 border-[#00974A] pl-3 text-xs font-black uppercase tracking-[0.28em] text-slate-500">
          Bearing Applications
        </p>
        <h2 className="mt-4 text-3xl font-sans font-bold uppercase text-slate-950 md:text-4xl">
          All Markets
        </h2>
      </div>

      <div className="relative mx-auto max-w-[1500px] overflow-hidden border border-slate-200 bg-white">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
          }}
        >
          {markets.map((market) => (
            <Link
              key={market._id || market.name}
              href={`/markets/${market.slug || market.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
              className="h-[300px] shrink-0 border-r border-white last:border-r-0 md:h-[320px]"
              style={{ width: `${100 / visibleItems}%` }}
            >
              <div className="group relative h-full w-full overflow-hidden">
                <img
                  src={getMarketImage(market.image)}
                  alt={market.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 grid place-items-center bg-black/0 text-center text-white opacity-0 transition duration-300 group-hover:bg-black/70 group-hover:opacity-100">
                  <div className="px-5">
                    <Search className="mx-auto mb-4 h-5 w-5 opacity-70" />
                    <h3 className="text-xl font-black uppercase leading-tight md:text-2xl">
                      {market.name}
                    </h3>
                    <p className="mt-4 text-sm font-black uppercase">
                      + Details
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-6 top-1/2 z-10 -translate-y-1/2 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] transition hover:text-[#00974A]"
          aria-label="Previous market"
        >
          <ChevronLeft size={52} strokeWidth={1.7} />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-6 top-1/2 z-10 -translate-y-1/2 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] transition hover:text-[#00974A]"
          aria-label="Next market"
        >
          <ChevronRight size={52} strokeWidth={1.7} />
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-3">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full transition ${
              currentIndex === index ? "bg-slate-950" : "bg-white ring-2 ring-slate-950"
            }`}
            aria-label={`Go to market slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
