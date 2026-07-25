// @ts-nocheck
import React from "react";
import { motion } from "framer-motion";
import { Trophy, Globe, Zap, Target, Cpu, Milestone } from "lucide-react";

export default function TimelineSection({ about = {} }) {
  const milestones = about.timelineMilestones && about.timelineMilestones.length > 0
    ? about.timelineMilestones
    : [
        {
          year: "1990",
          title: "Company Foundation",
          description: "SRO Bearings was established with a focus on manufacturing high-precision miniature ball bearings."
        },
        {
          year: "2002",
          title: "Industrial Expansion",
          description: "Expanded our catalog to heavy-duty roller bearings and spherical joints for mining and power generation."
        },
        {
          year: "2010",
          title: "State-of-the-Art Technology Centre",
          description: "Inaugurated our R&D hub in Chennai to specialize in low-friction, high-temperature metallurgy."
        },
        {
          year: "2018",
          title: "Global Distribution Network",
          description: "Established strategic supply chain alliances across 130 countries and signed 17,000+ distributors."
        },
        {
          year: "2025",
          title: "Green Future Initiative",
          description: "Initiated key zero-waste and green-lubrication manufacturing standards targetting 2030 neutrality goals."
        }
      ];

  // Helper to render relevant icons based on order or content
  const getIcon = (idx) => {
    const className = "w-5 h-5 text-[#00974A] group-hover:text-white transition-colors duration-300";
    const icons = [
      <Cpu className={className} />,
      <Target className={className} />,
      <Zap className={className} />,
      <Globe className={className} />,
      <Trophy className={className} />
    ];
    return icons[idx % icons.length];
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#00974A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#00974A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00974A]/10 border border-[#00974A]/50 text-[#00974A] text-xs font-bold uppercase tracking-wider mb-3">
            <Milestone className="w-4 h-4" />
            Our Legacy
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            Journey of SRO Bearings
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
            A chronological legacy of innovation, pioneering solutions, and sustainability benchmarks that drive our worldwide footprint.
          </p>
        </div>

        {/* Central timeline track container */}
        <div className="relative">
          {/* Central vertical line with gradient */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[3px] bg-gradient-to-b from-[#00974A] via-[#00974A] to-[#00974A] opacity-80" />

          <div className="space-y-12">
            {milestones.map((ms, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-stretch md:justify-between w-full">
                  {/* Glowing timeline node dot */}
                  <div className="absolute left-[9px] md:left-1/2 md:-translate-x-1/2 top-6 z-10 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-white border-4 border-[#00974A] shadow-md relative flex items-center justify-center">
                      <div className="absolute w-8 h-8 rounded-full bg-[#00974A]/25 animate-ping opacity-60" />
                    </div>
                  </div>

                  {/* Card Section */}
                  <div className={`w-full md:w-[46%] pl-10 md:pl-0 flex flex-col ${isEven ? "md:items-end md:text-right" : "md:order-last md:items-start md:text-left"}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.98 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="group relative bg-white p-7 rounded-2xl border border-gray-150 shadow-md hover:shadow-xl hover:border-[#00974A]/35 transition-all w-full"
                    >
                      {/* Decorative corner glow */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00974A]/5 to-transparent rounded-tr-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Header row with Icon and Year */}
                      <div className={`flex items-center gap-3.5 mb-4 ${isEven ? "md:flex-row-reverse" : "flex-row"}`}>
                        <div className="p-3 bg-[#00974A]/10 border border-[#00974A] rounded-xl group-hover:bg-[#00974A] group-hover:border-[#00974A] transition-colors duration-300">
                          <div className="group-hover:text-white [&_svg]:text-white group-hover:[&_svg]:text-white transition-colors duration-300">
                            {getIcon(idx)}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-3xl font-black text-[#00974A] tracking-tight">{ms.year}</span>
                          <h4 className="text-lg font-extrabold text-gray-900 group-hover:text-[#00974A] transition-colors">{ms.title}</h4>
                        </div>
                      </div>

                      <p className="text-gray-650 text-sm leading-relaxed font-normal">
                        {ms.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Spacer for column symmetry */}
                  <div className="hidden md:block w-[46%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
