// @ts-nocheck
import React, { useState, useEffect } from "react";
import Link from "next/link";

const HeroVideoSection = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [nextVideo, setNextVideo] = useState(1);
  const [fade, setFade] = useState(false);

  const videoSources = [
    "video/srovideo1.mp4",
    "/video/propeller.mp4",
    "/video/srovideo3.mp4",
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setFade(true); // Start fading
      setTimeout(() => {
        setCurrentVideo((prev) => (prev + 1) % videoSources.length);
        setNextVideo((prev) => (prev + 1) % videoSources.length);
        setFade(false);
      }, 1000); // fade duration
    }, 5000);

    return () => clearInterval(interval);
  }, [isClient]);

  if (!isClient) return null;

  return (
    <section className="relative h-screen overflow-hidden font-futuristic">
      {/* Background Videos */}
      <div className="absolute inset-0 z-0">
        {/* Current Video */}
        <video
          src={videoSources[currentVideo]}
          autoPlay
          muted
          loop
          playsInline
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Next Video (preloaded) */}
        <video
          src={videoSources[nextVideo]}
          autoPlay
          muted
          loop
          playsInline
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="absolute inset-0 bg-black/10"></div>
      </div>

        {/* Text Content */}
        <div className="absolute inset-0 z-10 text-white">
          <div className="absolute top-[100px] right-6 md:right-12 text-right space-y-2">
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-none">
              PRECISION IN
            </h1>
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-none">
              MOTION
            </h1>
          </div>

          <div className="absolute bottom-10 left-6 md:left-12 text-left space-y-2">
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-none">
              EXCELLENCE IN
            </h1>
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-none">
              DESIGN
            </h1>
            <div className="mt-4">
              <p className="mb-2 text-sm md:text-base text-white/90">
                Innovative machinery and clean energy solutions
              </p>
              <Link
                href="/industries"
                className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-5 rounded transition"
              >
                Explore More
              </Link>
            </div>
          </div>
        </div>
    </section>
  );
};

export default HeroVideoSection;
