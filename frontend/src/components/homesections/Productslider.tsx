// @ts-nocheck
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const bearingProducts = [
  {
    id: "spherical-roller",
    name: "Spherical Roller Bearings",
    displayName: "Spherical Roller",
    description:
      "Self-aligning bearings that accommodate heavy radial and axial loads in applications with misalignment",
    features: [
      "±2.5° self-alignment capability",
      "High load capacity design",
      "Extended service life",
      "Robust construction",
    ],
    applications: "Mining equipment, paper mills, gearboxes",
    image: "/image/product-slider-img/shperical-newone.png",
    link: "/products/spherical-roller-bearings",
  },
  {
    id: "taper-roller",
    name: "Taper Roller Bearings",
    displayName: "Taper Roller",
    description:
      "Precision bearings designed to handle combined radial and thrust loads in various configurations",
    features: [
      "Optimized load distribution",
      "Single, double, and four-row designs",
      "Precision ground surfaces",
      "Interchangeable components",
    ],
    applications: "Automotive wheels, heavy machinery, axles",
    image: "/product-img/taper-roller-bearings.png",
    link: "/products/taper-roller-bearings",
  },
  {
    id: "thrust",
    name: "Thrust Bearings",
    displayName: "Thrust Bearings",
    description:
      "Specialized bearings designed exclusively for axial load applications in various configurations",
    features: [
      "Ball or roller designs available",
      "High axial stiffness",
      "Low friction operation",
      "Precision alignment",
    ],
    applications: "Gearboxes, turbines, crane hooks",
    image: "/product-img/thrust-bearings.png",
    link: "/products/thrust-bearings",
  },
  {
    id: "multi-row",
    name: "Multi Row Bearings",
    displayName: "Multi Row",
    description:
      "High-capacity bearings featuring multiple rows of rollers for extreme load conditions",
    features: [
      "2, 3, or 4 row configurations",
      "Compact design",
      "High radial load capacity",
      "Precision alignment",
    ],
    applications: "Rolling mills, large gearboxes",
    image:
      "https://www.krw.de/fileadmin/_processed_/0/f/csm_Mehrreihig_Kerola_201910_5f327d1bda.png",
    link: "/products/multi-row-bearings",
  },
  {
    id: "pillow-block",
    name: "Pillow Block Bearing",
    displayName: "Pillow Block",
    description:
      "Mounted bearing units with housings for easy installation and maintenance",
    features: [
      "Various sealing options",
      "Cast iron or steel housings",
      "Self-locking seals",
      "Adapter sleeve mounting",
    ],
    applications: "Conveyors, fans, agricultural equipment",
    image: "/product-img/pillow-block-bearing.png",
    link: "/products/pillow-block-bearing",
  },
  {
    id: "plummer-blocks",
    name: "Plummer Blocks",
    displayName: "Plummer Blocks",
    description:
      "Heavy-duty bearing housings designed for industrial applications",
    features: [
      "Split housing design",
      "High load capacity",
      "Easy maintenance",
      "Various sealing options",
    ],
    applications: "Large fans, pumps, marine equipment",
    image: "/product-img/plummer-blocks.png",
    link: "/products/plummer-blocks",
  },
  {
    id: "roller-chains",
    name: "Roller Chains",
    displayName: "Roller Chains",
    description:
      "High-strength power transmission chains for industrial applications",
    features: [
      "Heat-treated components",
      "Precision roller bushings",
      "Corrosion-resistant options",
      "Multiple pitch sizes",
    ],
    applications: "Conveyors, industrial machinery, motorcycles",
    image: "/product-img/roller-chains.png",
    link: "/products/roller-chains",
  },
];

export default function BearingGrid() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [visibleItems, setVisibleItems] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = bearingProducts.length;
  const clonedProducts = [
    ...bearingProducts.slice(-visibleItems),
    ...bearingProducts,
    ...bearingProducts.slice(0, visibleItems),
  ];
  const firstRealSlide = visibleItems;
  const lastRealSlide = visibleItems + totalSlides - 1;
  const normalizeSlideIndex = useCallback((index: number) => {
    if (!totalSlides) return visibleItems;

    const normalized =
      ((index - visibleItems) % totalSlides + totalSlides) % totalSlides;

    return visibleItems + normalized;
  }, [totalSlides, visibleItems]);
  const activeDot =
    totalSlides > 0
      ? (currentIndex - visibleItems + totalSlides) % totalSlides
      : 0;

  const goToNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const goToPrevious = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (!totalSlides) return;

    if (currentIndex > lastRealSlide) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(normalizeSlideIndex(currentIndex));
      }, 720);
      return () => clearTimeout(timer);
    }

    if (currentIndex < firstRealSlide) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(normalizeSlideIndex(currentIndex));
      }, 720);
      return () => clearTimeout(timer);
    }
  }, [
    currentIndex,
    firstRealSlide,
    lastRealSlide,
    normalizeSlideIndex,
    totalSlides,
    visibleItems,
  ]);

  useEffect(() => {
    if (!isAutoPlaying || !totalSlides) return;

    const timer = setInterval(goToNext, 4200);
    return () => clearInterval(timer);
  }, [isAutoPlaying, currentIndex, totalSlides]);

  useEffect(() => {
    setIsTransitioning(false);
    setCurrentIndex(visibleItems);
    const timer = setTimeout(() => setIsTransitioning(true), 40);
    return () => clearTimeout(timer);
  }, [visibleItems]);

  return (
    <section
      className="relative mx-auto h-auto overflow-hidden bg-slate-950 bg-cover bg-center bg-no-repeat px-4 py-6 sm:py-6 lg:h-[85vh] lg:max-h-[85vh] lg:bg-fixed"
      style={{ backgroundImage: "url('/srobanners/factory.png')" }}
    >
      <div className="absolute inset-0 bg-slate-950/78" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute left-0 top-20 hidden h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent lg:block" />

      <div className="relative z-10 mx-auto mb-4 flex max-w-7xl  flex-col gap-3 border-b border-white/15 pb-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-200 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#36d37e]" />
            Product Range
          </p>
          <h2 className="mt-2 font-sans text-2xl font-black leading-tight text-white sm:text-3xl">
            Precision Bearing Products
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-5 text-slate-200">
            Heavy-duty bearing solutions for demanding industrial performance.
          </p>
        </div>
        <div className="flex w-fit overflow-hidden rounded-full border border-white/20 bg-white/10 p-1 shadow-2xl shadow-black/20 backdrop-blur-md">
          <button
            type="button"
            onClick={goToPrevious}
            className="grid h-10 w-10 place-items-center rounded-full text-white transition hover:bg-[#00974A] focus:outline-none focus:ring-2 focus:ring-[#36d37e]"
            aria-label="Previous product"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="grid h-10 w-10 place-items-center rounded-full text-white transition hover:bg-[#00974A] focus:outline-none focus:ring-2 focus:ring-[#36d37e]"
            aria-label="Next product"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        className="relative z-10 mx-auto max-w-7xl"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-1.5 shadow-2xl shadow-black/35 backdrop-blur-md">
          <div
            className={`flex will-change-transform ${
              isTransitioning
                ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                : ""
            }`}
            style={{
              transform: `translate3d(-${
                currentIndex * (100 / visibleItems)
              }%,0,0)`,
            }}
          >
            {clonedProducts.map((product, slideIndex) => {
                    const productIndex = bearingProducts.findIndex(
                      (item) => item.id === product.id
                    );

                    return (
                      <article
                        key={`${product.id}-${slideIndex}`}
                        className="group relative flex-shrink-0 px-1.5"
                        style={{ width: `${100 / visibleItems}%` }}
                      >
                        <div className="relative h-full overflow-hidden rounded-xl border border-transparent bg-white shadow-xl shadow-black/10 transition duration-300 group-hover:z-10 group-hover:border-[#36d37e]/60 group-hover:shadow-2xl group-hover:shadow-emerald-950/25">
                          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#00974A] via-[#36d37e] to-amber-300 opacity-0 transition duration-500 group-hover:opacity-100" />

                          <div className="flex min-h-[380px] flex-col sm:min-h-[400px] lg:h-[calc(80vh-160px)] lg:min-h-[290px]">
                            <div className="relative flex h-44 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#f8fafc_0%,#eef2f7_52%,#dbe3ee_100%)] p-4 sm:h-48 sm:p-5 lg:h-[56%] lg:min-h-[150px]">
                              <span className="absolute left-4 top-4 rounded-full bg-slate-950 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-slate-950/20">
                                0{productIndex + 1}
                              </span>
                              <span className="absolute right-4 top-4 hidden rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#007c3d] sm:block">
                                SRO
                              </span>
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-contain drop-shadow-2xl transition duration-500 group-hover:scale-110 group-hover:rotate-1"
                                loading="lazy"
                              />
                            </div>

                            <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5 lg:p-4">
                              <h3 className="min-h-[30px] py-0.5 text-[17px] font-sans font-black leading-[1.45] text-slate-950 sm:text-xl">
                                {product.displayName || product.name}
                              </h3>

                              <div className="mt-2 flex min-h-[24px] flex-wrap gap-2 overflow-hidden">
                                {product.features.slice(0, 1).map((feature) => (
                                  <span
                                    key={feature}
                                    className="max-w-full truncate rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-600 transition group-hover:border-emerald-200 group-hover:bg-emerald-50 group-hover:text-[#007c3d]"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>

                              <p className="mt-3 truncate rounded-lg border-l-4 border-[#00974A] bg-slate-50 px-3 py-2 text-[10px] font-bold uppercase leading-4 tracking-[0.08em] text-slate-500">
                                {product.applications}
                              </p>

                              <a
                                href={product.link}
                                className="mt-auto flex items-center justify-between border-t border-slate-200 pt-2.5 text-xs font-black uppercase tracking-[0.1em] text-slate-950 transition group-hover:text-[#00974A]"
                              >
                                Explore products
                                <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-950 text-white shadow-lg shadow-slate-950/20 transition group-hover:bg-[#00974A]">
                                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
          </div>
        </div>

        <div className="mt-3 flex justify-center gap-2">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(index + visibleItems);
              }}
              className={`h-2 rounded-full transition-all ${
                activeDot === index
                  ? "w-12 bg-[#36d37e] shadow-lg shadow-emerald-400/35"
                  : "w-7 bg-white/35 hover:bg-white/70"
              }`}
              aria-label={`Go to product slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
