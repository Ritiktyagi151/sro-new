// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";

const fallbackNewsItems = [
  {
    id: 1,
    title: "Advanced Materials Improve Bearing Performance",
    date: "2026-07-15",
    location: "Global",
    excerpt:
      "Advanced bearing materials and modern heat-treatment technologies are helping industries achieve higher load capacity, longer service life, and improved resistance to wear and corrosion. These innovations are enhancing equipment reliability across manufacturing and heavy engineering sectors.",
    category: "Innovation",
    image:
      "https://t4.ftcdn.net/jpg/05/85/00/55/240_F_585005559_YNUJFQaDLRWN61mGNxWzz9GZypXSrOgz.jpg",
    slug: "advanced-bearing-materials",
  },
  {
    id: 2,
    title: "Bearing Reliability Becomes a Key Focus in Heavy Industries",
    date: "2026-07-19",
    location: "Industrial Sector",
    excerpt:
      "Manufacturers in mining, steel, cement, and power industries are prioritizing high-quality bearing solutions to minimize equipment downtime, improve operational efficiency, and reduce long-term maintenance costs.",
    category: "Industrial",
    image:
      "https://t4.ftcdn.net/jpg/11/10/99/07/240_F_1110990700_5Fq0VFo1CSzfVgIfnaRARdlvy0TF8k3k.jpg",
    slug: "bearing-reliability",
  },
  {
    id: 3,
    title: "Automation Drives Growth in Precision Bearing Applications",
    date: "2026-07-22",
    location: "Manufacturing",
    excerpt:
      "The increasing adoption of industrial automation, robotics, and CNC machinery continues to boost the demand for precision bearings that deliver high accuracy, smooth performance, and long operational life.",
    category: "Automation",
    image:
      "https://t3.ftcdn.net/jpg/11/19/94/78/240_F_1119947888_mab34TBVzoVFc56OH96ELZk4MJE1qhis.jpg",
    slug: "automation-bearing-growth",
  },
  {
    id: 4,
    title: "Energy-Efficient Bearings Support Sustainable Manufacturing",
    date: "2026-07-25",
    location: "Global",
    excerpt:
      "Modern bearing technologies are reducing friction, lowering energy consumption, and improving machine efficiency. Industries are increasingly adopting energy-efficient bearing solutions to support sustainable manufacturing goals.",
    category: "Sustainability",
    image:
      "https://t4.ftcdn.net/jpg/11/86/60/59/240_F_1186605927_xIyNo6Hw4DSSP0myEk7r3oHRc9xyRxl7.jpg",
    slug: "energy-efficient-bearings",
  },
  {
    id: 5,
    title: "Predictive Maintenance Reduces Bearing Downtime",
    date: "2026-07-28",
    location: "Engineering",
    excerpt:
      "Predictive maintenance technologies, including vibration monitoring and condition analysis, are enabling industries to identify bearing wear before failures occur. This approach helps improve equipment uptime and reduce maintenance expenses.",
    category: "Technology",
    image:
      "https://t3.ftcdn.net/jpg/03/14/76/20/240_F_314762012_Ujc3BNLEdzQ6yfYAiCRbHQaPHxZxu2EF.jpg",
    slug: "predictive-maintenance",
  },
  {
    id: 6,
    title: "Global Demand for Industrial Bearings Continues to Rise",
    date: "2026-07-31",
    location: "Worldwide",
    excerpt:
      "Growing investments in infrastructure, renewable energy, automotive production, and industrial automation are driving steady demand for high-performance industrial bearings. Industry experts expect continued growth as manufacturers focus on efficiency, reliability, and advanced engineering solutions.",
    category: "Industry News",
    image:
      "https://t3.ftcdn.net/jpg/13/74/03/58/240_F_1374035846_7XnRZfXZnG1BXIq9Wx5nWx20eIvFdLZc.jpg",
    slug: "global-bearing-demand",
  },
];

const NewsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cardsPerSlide, setCardsPerSlide] = useState(2);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerSlide(window.innerWidth < 768 ? 1 : 2);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const newsItems = fallbackNewsItems;

  const slides = useMemo(() => {
    const groupedSlides = [];
    for (let i = 0; i < newsItems.length; i += cardsPerSlide) {
      groupedSlides.push(newsItems.slice(i, i + cardsPerSlide));
    }
    return groupedSlides;
  }, [newsItems, cardsPerSlide]);

  const totalSlides = slides.length;
  const clonedSlides = totalSlides
    ? [slides[totalSlides - 1], ...slides, slides[0]]
    : [];
  const activeDot =
    totalSlides > 0 ? (currentIndex - 1 + totalSlides) % totalSlides : 0;

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (!totalSlides) return;

    if (currentIndex === clonedSlides.length - 1) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 720);
      return () => clearTimeout(timer);
    }

    if (currentIndex === 0) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalSlides);
      }, 720);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, clonedSlides.length, totalSlides]);

  useEffect(() => {
    if (!isAutoPlaying || !totalSlides) return;

    const interval = setInterval(nextSlide, 5200);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex, totalSlides]);

  useEffect(() => {
    setIsTransitioning(false);
    setCurrentIndex(1);
    const timer = setTimeout(() => setIsTransitioning(true), 40);
    return () => clearTimeout(timer);
  }, [cardsPerSlide]);

  const formatDate = (dateString) => {
    if (!dateString) return "Recent";

    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getSlug = (item) => {
    if (item.slug) return item.slug;
    return item.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const getNewsHref = (item) => `/blogs/${getSlug(item)}`;

  const getBlogImage = (item) => {
    if (!item.image) {
      return "https://images.unsplash.com/photo-1503507739298-dce173d09653?w=800";
    }
    if (item.image.startsWith("http")) return item.image;
    return `http://localhost:5001${item.image}`;
  };

  return (
    <section className="bg-gradient-to-b from-[#00974A]/10 to-white py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 border-b border-gray-200 pb-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="mb-3 inline-flex items-center border-l-4 border-[#00974A] pl-3 text-xs font-bold uppercase tracking-[0.18em] text-gray-500">
              Blogs & Updates
            </span>
            <h2 className="text-3xl font-sans font-bold text-gray-950 md:text-4xl">
              Latest Blogs from SRO Bearings
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-gray-600 md:text-right">
            Bearing industry insights, engineering updates, and practical
            blogs from the SRO team.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous news"
            className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-gray-200 bg-white text-gray-950 shadow-lg transition duration-300 hover:border-gray-950 hover:bg-gray-950 hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next news"
            className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-gray-200 bg-white text-gray-950 shadow-lg transition duration-300 hover:border-gray-950 hover:bg-gray-950 hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="overflow-hidden">
            <div
              className={`flex will-change-transform ${
                isTransitioning
                  ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  : ""
              }`}
              style={{ transform: `translate3d(-${currentIndex * 100}%,0,0)` }}
            >
              {clonedSlides.map((group, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 px-2">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {group.map((news) => (
                      <Link
                        key={news._id || news.id}
                        href={getNewsHref(news)}
                        className="group block"
                      >
                        <article className="grid min-h-[300px] overflow-hidden border border-gray-200 bg-gray-50 transition duration-300 hover:-translate-y-1 hover:border-gray-900 hover:bg-white hover:shadow-xl lg:grid-cols-[42%_1fr]">
                          <div className="relative h-56 overflow-hidden bg-gray-200 lg:h-full">
                            <img
                              src={getBlogImage(news)}
                              alt={news.title}
                              className="h-full w-full object-cover grayscale-[20%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                            />
                            <div className="absolute left-4 top-4 bg-white px-3 py-1 text-xs font-bold uppercase text-gray-900">
                              {news.category || "Update"}
                            </div>
                          </div>

                          <div className="flex flex-col justify-between p-6 sm:p-7">
                            <div>
                              <div className="mb-4 flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                <span className="inline-flex items-center gap-1.5">
                                  <CalendarDays className="h-4 w-4 text-[#00974A]" />
                                  {formatDate(news.date || news.createdAt)}
                                </span>
                                {news.location && (
                                  <span className="inline-flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4 text-[#00974A]" />
                                    {news.location}
                                  </span>
                                )}
                              </div>

                              <h3 className="line-clamp-2 text-xl font-black leading-tight text-gray-950 transition group-hover:text-gray-700 sm:text-2xl">
                                {news.title}
                              </h3>
                              <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
                                {news.excerpt}
                              </p>
                            </div>

                            <div className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-gray-950">
                              Read more
                              <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 flex justify-center gap-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                type="button"
                key={index}
                aria-label={`Go to news slide ${index + 1}`}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(index + 1);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeDot === index
                    ? "w-8 bg-gray-950"
                    : "w-2.5 bg-[#00974A] hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSlider;
