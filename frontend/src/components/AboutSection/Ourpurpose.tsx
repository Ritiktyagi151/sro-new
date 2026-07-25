// @ts-nocheck
import React from "react";
import Image from "next/image";
import Link from "next/link";

const PurposeSection = () => {
  return (
    <div id="purpose" className="relative min-h-[560px] overflow-hidden px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:min-h-screen w-full scroll-mt-20">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://media.istockphoto.com/id/1283024969/photo/female-civil-engineer.jpg?s=612x612&w=0&k=20&c=HvvX9yxEoXKa93Tp5tAZHa2ec4C_saqNjptDQt6FdVQ="
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-200/60" />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10 flex min-h-[448px] flex-col md:flex-row items-center gap-12 lg:min-h-[calc(100vh-8rem)]">
        {/* Text Content - Left Side */}
        <div className="md:w-1/2 space-y-6 text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00974A]">
            Our purpose
          </h2>

          <div className="space-y-4">
            <p className="text-xl sm:text-2xl md:text-3xl font-medium leading-tight">
              Our purpose guides our
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-medium leading-tight">
              everyday actions and
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-medium leading-tight">
              decisions
            </p>
          </div>

          <Link href="/about#purpose">
            <button className="mt-8 w-full bg-[#00974A] hover:bg-[#00974A] text-white font-medium py-3 px-6 rounded-md transition duration-300 min-[420px]:w-auto min-[420px]:px-8">
              Explore what drives us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurposeSection;
