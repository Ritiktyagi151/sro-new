// @ts-nocheck
import { ChevronRight, Factory, Package, Wrench } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    title: "Products",
    description:
      "Bearings, housings, roller chains, sleeves, tools, and supporting equipment for reliable industrial motion.",
    link: "View products",
    href: "/products",
    icon: Package,
  },
  {
    title: "Services",
    description:
      "Engineering support, maintenance guidance, condition monitoring, and replacement planning.",
    link: "View services",
    href: "/services",
    icon: Wrench,
  },
  {
    title: "Industries",
    description:
      "Application-focused bearing solutions for steel, cement, mining, packaging, paper, and more.",
    link: "View industries",
    href: "/industries",
    icon: Factory,
  },
];

export default function WhatWeDoSection() {
  return (
    <section className="bg-gradient-to-b from-green-50 to-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        {/* self-start prevents the grid item from stretching; sticky needs the
            element's own height so it can pin and then stop within this section. */}
        <div className="self-start lg:sticky lg:top-28">
          <div className="border-b border-slate-200 pb-6">
            <p className="border-l-4 border-[#00974A] pl-3 text-xs font-black uppercase tracking-[0.28em] text-slate-500">
              Capabilities
            </p>
            <h2 className="mt-4 text-3xl font-sans font-bold uppercase leading-tight text-slate-950 md:text-4xl">
              What We Do
            </h2>
          </div>
          <p className="mt-5 max-w-md text-base font-medium leading-7 text-slate-600">
            Practical bearing solutions, product support, and industry-focused
            guidance for machinery that needs to keep moving.
          </p>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {categories.map((category, index) => (
            <Link
              key={category.title}
              href={category.href}
              className="group grid gap-5 py-7 transition hover:bg-slate-50 sm:grid-cols-[72px_1fr_auto] sm:items-center sm:px-5"
            >
              <div className="flex h-16 w-16 items-center justify-center border border-slate-300 bg-white text-slate-950 transition group-hover:border-slate-950">
                <category.icon className="h-7 w-7" />
              </div>

              <div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-black text-slate-400">  
                    0{index + 1}
                  </span>
                  <h3 className="text-2xl font-black uppercase text-slate-950 md:text-3xl">
                    {category.title}
                  </h3>
                </div>
                <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-600 md:text-base">
                  {category.description}
                </p>
              </div>

              <div className="inline-flex w-fit items-center text-sm font-black uppercase tracking-[0.16em] text-slate-950">
                {category.link}
                <ChevronRight className="ml-2 h-5 w-5 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
