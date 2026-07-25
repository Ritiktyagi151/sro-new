// @ts-nocheck
// components/AboutSection.jsx
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  // Animation variants for sliding in
  const slideInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    // Add overflow-hidden to the parent section to prevent horizontal scrollbars during animation
    <section className="bg-gradient-to-b from-[#00974A]/10 to-white flex min-h-0 items-center justify-center overflow-hidden py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:flex md:items-center md:gap-12 lg:gap-20">
        {/* Image - Animated */}
        <motion.div
          className="md:w-1/2 mb-10 md:mb-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          variants={slideInFromLeft}
        >
          <img
            src="https://images.unsplash.com/photo-1718824331840-399943ff5c1e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hY2hpbmV8ZW58MHx8MHx8fDA%3D"
            alt="Team Member"
            className="rounded-lg shadow-lg w-full h-[260px] object-cover sm:h-[320px] lg:h-[360px]"
          />
        </motion.div>

        {/* Text content - Animated */}
        <motion.div
          className="md:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          variants={slideInFromRight}
        >
          <p className="border-l-4 border-[#00974A] pl-3 text-xs font-black uppercase tracking-[0.28em] text-slate-500">
            Get to Know Us
          </p>
          <h2 className="mt-4 border-b border-slate-200 pb-6 text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-slate-950 mb-6 leading-tight">
            People think we’re just <br className="hidden md:block" />a bearing
            company
          </h2>
          <p className="text-gray-700 mb-6 max-w-[36rem]">
            We’re often seen as just a bearing manufacturer. But SRO Bearings is
            powered by a team of passionate individuals across engineering,
            manufacturing, customer service, and innovation. Get to know our
            team and discover why SRO is a great place to work and grow.
          </p>
          <Link
            href="/about"
            className="inline-flex w-full justify-center bg-slate-950 hover:bg-slate-800 text-white font-semibold py-3 px-5 rounded-md transition min-[420px]:w-auto min-[420px]:px-6"
          >
            Why work at SRO Bearings
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
