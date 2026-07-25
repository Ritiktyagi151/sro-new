// @ts-nocheck
// components/CoInnovationSection.jsx
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const CoInnovationSection = () => {
  // Re-usable animation variants
  const slideInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    // Add overflow-hidden to the parent section
    <section className="bg-gradient-to-b from-[#00974A]/10 to-white flex min-h-0 items-center justify-center overflow-hidden py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:flex md:items-center md:gap-12 lg:gap-20">
        {/* Text content - Animated */}
        <motion.div
          className="md:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          variants={slideInFromLeft}
        >
          <p className="border-l-4 border-[#00974A] pl-3 text-xs font-black uppercase tracking-[0.28em] text-slate-500">
            Research and technology development
          </p>
          <h2 className="mt-4 border-b border-slate-200 pb-6 text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-slate-950 mb-6 leading-tight">
            Co-innovation creates <br className="hidden md:block" /> tomorrow’s
            technologies
          </h2>
          <p className="text-gray-700 mb-6 max-w-[36rem]">
            Roughly 20% of global energy goes to overcoming friction. Through
            collaboration and knowledge sharing, the industry has a real
            possibility to pull that number down. Let’s join forces in the fight
            against friction.
          </p>
          <Link
            href="/research"
            className="inline-flex w-full justify-center bg-slate-950 hover:bg-slate-800 text-white font-semibold py-3 px-5 rounded-md transition min-[420px]:w-auto min-[420px]:px-6"
          >
            Learn more
          </Link>
        </motion.div>

        {/* Image - Animated */}
        <motion.div
          className="md:w-1/2 mb-10 md:mb-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          variants={slideInFromRight}
        >
          <img
            src="/image/about/Indian-lady-sro.jpg"
            alt="Bearing Technology"
            className="rounded-lg shadow-lg w-full h-[260px] object-cover sm:h-[320px] lg:h-[360px]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CoInnovationSection;
