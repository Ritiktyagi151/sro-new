// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, PackageCheck, Search, ShieldCheck, Truck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Requirement Review",
    text: "We understand bearing type, load, speed, machine condition, fitment, and application environment.",
  },
  {
    icon: ShieldCheck,
    title: "Right Product Match",
    text: "Our team shortlists suitable bearings, housings, sleeves, seals, chains, and support products.",
  },
  {
    icon: CheckCircle2,
    title: "Quality Check",
    text: "Products are checked for size, series, finish, packaging, and dispatch readiness before movement.",
  },
  {
    icon: PackageCheck,
    title: "Inventory Support",
    text: "Warehouse coordination helps customers get faster availability for planned and urgent requirements.",
  },
  {
    icon: Truck, 
    title: "Dispatch & Support",
    text: "We keep communication clear from enquiry to delivery, with practical after-sales support when needed.",
  },
];

export default function Journey({ about = {} }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const stats =
    about?.stats?.length > 0
      ? about.stats.slice(0, 4)
      : [
          { number: "40+", label: "Years Experience" },
          { number: "7+", label: "Product Families" },
          { number: "24/7", label: "Support Mindset" },
          { number: "100%", label: "Bearing Focus" },
        ];

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-gradient-to-b from-green-50 to-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
    >
      <style>{`
        .journey-path {
          stroke-dasharray: 1400;
          stroke-dashoffset: 1400;
        }

        .journey-path.is-visible {
          animation: journey-draw 2.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .journey-card {
          opacity: 0;
          transform: translateY(22px) scale(0.98);
        }

        .journey-card.is-visible {
          animation: journey-card-in 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .journey-node {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.65);
        }

        .journey-node.is-visible {
          animation: journey-node-in 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes journey-draw {
          to { stroke-dashoffset: 0; }
        }

        @keyframes journey-card-in {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes journey-node-in {
          70% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>

      <div className="mx-auto max-w-7xl">
        <div className="mb-10 border-b border-slate-200 pb-6">
          <p className="border-l-4 border-[#00974A] pl-3 text-xs font-black uppercase tracking-[0.28em] text-slate-500">
            Our Journey
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-sans font-bold leading-tight text-slate-950 md:text-4xl">
            From Bearing Requirement To Reliable Movement
          </h2>
        </div>

        <div className="relative hidden min-h-[520px] lg:block">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1200 520"
            preserveAspectRatio="none"
          >
            <path
              d="M80 290 C210 130, 345 130, 470 270 S720 420, 850 245 S1030 100, 1130 250"
              fill="none"
              stroke="#111827"
              strokeWidth="3"
              strokeLinecap="round"
              className={`journey-path ${isVisible ? "is-visible" : ""}`}
            />
            <path
              d="M80 290 C210 130, 345 130, 470 270 S720 420, 850 245 S1030 100, 1130 250"
              fill="none"
              stroke="#00974A"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.28"
              className={`journey-path ${isVisible ? "is-visible" : ""}`}
            />
          </svg>

          {steps.map((step, index) => {
            const positions = [
              { left: "7%", top: "56%", card: "top-[345px] left-0" },
              { left: "28%", top: "28%", card: "top-0 left-[180px]" },
              { left: "48%", top: "52%", card: "top-[310px] left-[420px]" },
              { left: "70%", top: "46%", card: "top-[35px] left-[700px]" },
              { left: "94%", top: "49%", card: "top-[300px] right-0" },
            ];
            const Icon = step.icon;
            const pos = positions[index];

            return (
              <React.Fragment key={step.title}>
                <div
                  className={`journey-node absolute z-20 grid h-16 w-16 place-items-center border-4 border-white bg-slate-950 text-white shadow-xl ${
                    isVisible ? "is-visible" : ""
                  }`}
                  style={{
                    left: pos.left,
                    top: pos.top,
                    animationDelay: `${0.35 + index * 0.28}s`,
                  }}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <article
                  className={`journey-card absolute z-10 w-[270px] border border-slate-200 bg-white p-5 shadow-lg ${
                    isVisible ? "is-visible" : ""
                  } ${pos.card}`}
                  style={{ animationDelay: `${0.5 + index * 0.3}s` }}
                >
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                    Step 0{index + 1}
                  </span>
                  <h3 className="mt-3 text-xl font-sans font-bold text-slate-950">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                    {step.text}
                  </p>
                </article>
              </React.Fragment>
            );
          })}
        </div>

        <div className="lg:hidden">
          <div className="relative border-l-2 border-slate-950 pl-6">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.title}
                  className={`journey-card relative mb-6 border border-slate-200 bg-white p-5 shadow-sm ${
                    isVisible ? "is-visible" : ""
                  }`}
                  style={{ animationDelay: `${0.2 + index * 0.18}s` }}
                >
                  <span className="absolute -left-[39px] top-5 grid h-8 w-8 place-items-center bg-slate-950 text-white ring-4 ring-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                    Step 0{index + 1}
                  </p>
                  <h3 className="mt-2 text-xl font-sans font-bold text-slate-950">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                    {step.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-0 border-l border-t border-slate-200 bg-white sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={`${stat.label}-${index}`} className="border-b border-r border-slate-200 p-5">
              <p className="text-3xl font-sans font-bold text-slate-950">
                {stat.prefix || ""}
                {stat.number}
              </p>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
