// @ts-nocheck
import React from "react";

export const AnimatedLoader = ({
  logoSrc = "/sro-newlogo.png",
  text = "Loading",
}) => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-white">
      <style>{`
        @keyframes loader-rotate {
          to { transform: rotate(360deg); }
        }

        @keyframes loader-reverse {
          to { transform: rotate(-360deg); }
        }

        @keyframes loader-sweep {
          0% { transform: translateX(-115%); }
          100% { transform: translateX(115%); }
        }

        @keyframes loader-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes loader-fade {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }

        .loader-spin { animation: loader-rotate 3.6s linear infinite; }
        .loader-spin-reverse { animation: loader-reverse 5.2s linear infinite; }
        .loader-sweep { animation: loader-sweep 1.65s cubic-bezier(0.65,0,0.35,1) infinite; }
        .loader-float { animation: loader-float 2.8s ease-in-out infinite; }
        .loader-fade { animation: loader-fade 1.4s ease-in-out infinite; }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,151,74,0.12),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,151,74,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:52px_52px]" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center px-6">
        <div className="relative h-64 w-64">
          <div className="absolute inset-0 rounded-full border border-slate-200" />
          <div className="loader-spin absolute inset-2 rounded-full border-4 border-transparent border-t-[#00974A] border-r-[#00974A]" />
          <div className="loader-spin-reverse absolute inset-8 rounded-full border-2 border-dashed border-[#00974A]/70" />

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 220">
            {Array.from({ length: 16 }).map((_, index) => {
              const angle = (index * 360) / 16;
              return (
                <rect
                  key={index}
                  x="108"
                  y="12"
                  width="4"
                  height="18"
                  rx="2"
                  fill="#00974A"
                  opacity={index % 2 === 0 ? "0.8" : "0.35"}
                  transform={`rotate(${angle} 110 110)`}
                />
              );
            })}
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="loader-float flex h-28 w-28 items-center justify-center border border-slate-200 bg-white shadow-2xl">
              <img
                src={logoSrc}
                alt="SRO Bearings"
                className="h-20 w-20 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 w-full text-center">
          <p className="border-l-4 border-[#00974A] pl-3 text-left text-xs font-black uppercase tracking-[0.28em] text-slate-500">
            SRO Bearings
          </p>
          <h2 className="mt-4 text-3xl font-sans font-bold text-slate-950">
            {text}
          </h2>

          <div className="mt-6 h-1.5 overflow-hidden bg-slate-200">
            <div className="loader-sweep h-full w-2/3 bg-[#00974A]" />
          </div>

          <div className="mt-5 flex justify-center gap-2">
            {[0, 1, 2].map((item) => (
              <span
                key={item}
                className="loader-fade h-2.5 w-2.5 bg-[#00974A]"
                style={{ animationDelay: `${item * 0.18}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedLoader;
