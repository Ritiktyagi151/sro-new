// @ts-nocheck
import React from "react";

const FrictionSection = ({ about = {} }) => {
  // Replace with your actual video source
  const videoSource =
    "https://cdn.pixabay.com/video/2017/01/12/7250-199191059_large.mp4";

  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Video and Text Row */}
        <div className="flex flex-col lg:flex-row gap-10 items-start mb-12">
          {/* Video on left */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-lg overflow-hidden aspect-video bg-gray-100">
              <video
                className="w-full h-full object-cover"
                muted
                controls
                loop
                playsInline
              >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Fallback image */}
              <img
                src="https://source.unsplash.com/random/800x450/?technology,industry"
                alt="Reducing friction in industry"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ display: "none" }}
              />
            </div>
          </div>

          {/* Text content on right */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl font-bold text-[#00974A] mb-6">
              Less friction. More progress.
            </h1>

            <p className="text-lg text-gray-700 max-w-2xl">
              We make some of the world's most innovative products and solutions
              to reduce friction. But we sell something bigger. Less friction
              means more energy saved. And it means that society can move
              forward to a more energy-efficient future where we can all do more
              with less.
            </p>
          </div>
        </div>

        {/* Stats section below both */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t pt-10  ">
          {about.stats && about.stats.length > 0 ? (
            about.stats.map((stat, idx) => (
              <StatItem key={idx} number={stat.number} label={stat.label} prefix={stat.prefix} />
            ))
          ) : (
            <>
              <StatItem number="38 000" label="Employees" />
              <StatItem number="130" label="Countries" />
              <StatItem number="71" label="Remanufacturing sites" />
              <StatItem number="17 000" label="Distributors" prefix=">" />
              <StatItem number="15" label="Technology Centres" />
              <StatItem number="40" label="Customer industries" />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// Stat component with exact styling from image
const StatItem = ({ number, label, prefix }) => (
  <div className="flex flex-col">
    <div className="flex items-baseline">
      {prefix && <span className="text-gray-500 mr-1">{prefix}</span>}
      <span className="text-3xl font-bold text-[#00974A]">{number}</span>
    </div>
    <span className="text-gray-500 mt-1">{label}</span>
  </div>
);

export default FrictionSection;
