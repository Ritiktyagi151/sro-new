// @ts-nocheck
import React from "react";

export const AnimatedLoader = ({
  logoSrc = "/sro-newlogo.png",
  text = "Preparing precision",
}) => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#f7f8f7] px-6">
      <style>{`
        @keyframes loader-orbit {
          to { transform: rotate(360deg); }
        }

        @keyframes loader-progress {
          0% { transform: translateX(-100%); }
          55% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }

        @keyframes loader-breathe {
          0%, 100% { opacity: 0.7; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1); }
        }

        @keyframes loader-line {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.85; }
        }

        .loader-orbit { animation: loader-orbit 2.8s linear infinite; }
        .loader-progress { animation: loader-progress 1.75s cubic-bezier(0.7,0,0.3,1) infinite; }
        .loader-breathe { animation: loader-breathe 2.2s ease-in-out infinite; }
        .loader-line { animation: loader-line 1.6s ease-in-out infinite; }
      `}</style>

      <div className="absolute inset-x-0 top-0 h-1 bg-[#00974A]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(247,248,247,0.9)),radial-gradient(circle_at_50%_42%,rgba(0,151,74,0.1),transparent_32%)]" />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center">
        <div className="relative flex h-40 w-40 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]" />
          <div className="absolute inset-4 rounded-full border border-slate-100" />
          <div className="loader-orbit absolute inset-3 rounded-full border-2 border-transparent border-t-[#00974A] border-r-[#00974A]" />
          <div className="loader-orbit absolute inset-[26px] rounded-full border border-dashed border-slate-300 [animation-duration:4.2s]" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="loader-breathe flex h-24 w-24 items-center justify-center rounded-full bg-white">
              <img
                src={logoSrc}
                alt="SRO Bearings"
                className="h-16 w-16 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 w-full">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#00974A]">
            SRO Bearings
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-950 sm:text-3xl">
            {text}
          </h2>
          <p className="mt-3 text-sm font-medium leading-6 text-slate-500">
            Please wait while the experience gets ready.
          </p>

          <div className="mx-auto mt-7 h-1 w-full max-w-[260px] overflow-hidden rounded-full bg-slate-200">
            <div className="loader-progress h-full w-1/2 rounded-full bg-[#00974A]" />
          </div>

          <div className="mt-7 flex items-center justify-center gap-3">
            {[0, 1, 2, 3].map((item) => (
              <span
                key={item}
                className="loader-line h-8 w-px bg-slate-300"
                style={{ animationDelay: `${item * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedLoader;
