// @ts-nocheck
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Package, ShieldCheck, Wrench } from "lucide-react";

const stats = [
  { value: "40+", label: "Years of bearing expertise" },
  { value: "7+", label: "Core product families" },
  { value: "24/7", label: "Support mindset" },
];

const strengths = [
  {
    icon: ShieldCheck,
    title: "Quality First",
    text: "Reliable bearing products selected for demanding industrial operating conditions.",
  },
  {
    icon: Package,
    title: "Wide Range",
    text: "Bearings, housings, roller chains, sleeves, tools, lubricants, and maintenance kits.",
  },
  {
    icon: Wrench,
    title: "Application Support",
    text: "Practical guidance for replacement, selection, maintenance, and plant requirements.",
  },
];

const AboutSnapshot = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-slate-200" />

      <div className="mx-auto grid max-h-none max-w-7xl gap-10 lg:max-h-[80vh] lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative h-[300px] overflow-hidden bg-black shadow-xl sm:h-[440px] lg:h-[62vh] lg:max-h-[560px]">
            <img
              src="https://media3.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dXIxM3owYWh2eXNpMWVkeGlwOGNmNHhtNTZxYjZmOHhraW5yN2gzbyZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/llxkS0wUmLOMuPHRqy/giphy.webp"
              alt="High precision bearing machinery"
              className="h-full w-full object-cover opacity-90"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-white/70">
                SRO Bharat
              </p>
              <h3 className="mt-3 text-xl font-black uppercase leading-tight sm:text-2xl">
                Precision Bearings For Industrial Motion
              </h3>
            </div>
          </div>

          <div className="relative mx-4 -mt-12 grid grid-cols-1 bg-[#00974A] text-white shadow-xl min-[460px]:grid-cols-3 lg:absolute lg:-bottom-[5rem] lg:left-6 lg:right-6 lg:mx-0 lg:mt-0">
            {stats.map((stat) => (
              <div key={stat.label} className="border-b border-white/20 p-4 last:border-b-0 min-[460px]:border-b-0 min-[460px]:border-r min-[460px]:last:border-r-0">
                <p className="text-2xl font-black">{stat.value}</p>
                <p className="mt-1 text-[11px] font-bold uppercase leading-4 text-white/85">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="pt-0 lg:pt-0"
        >
          <div className="border-b border-slate-200 pb-6">
            <p className="border-l-4 border-[#00974A] pl-3 text-xs font-black uppercase tracking-[0.28em] text-slate-500">
              About SRO Bearings
            </p>
            <h2 className="mt-4 max-w-3xl text-2xl font-sans font-bold uppercase leading-tight text-black sm:text-3xl md:text-4xl">
              Experience. Quality. Trust.
            </h2>
          </div>
          <p className="mt-5 text-base font-bold text-slate-700">
            40+ Years of Bearing Excellence at SRO Bharat
          </p>
          <div className="mt-5 space-y-4 text-sm font-medium leading-7 text-slate-700 md:text-base">
            <p>
              SRO Bharat delivers precision-engineered bearing solutions for
              steel, cement, automotive, mining, packaging, and material
              handling applications.
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {strengths.map((item) => (
              <div key={item.title} className="border border-slate-200 bg-white p-4 shadow-sm">
                <item.icon className="h-7 w-7 text-slate-900" />
                <h3 className="mt-4 text-sm font-black uppercase text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 min-[430px]:flex-row min-[430px]:flex-wrap sm:gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-slate-950 px-5 py-4 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-slate-800 sm:px-7 sm:tracking-[0.16em]"
            >
              View Product Range
              <ArrowRight className="ml-3 h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center border border-slate-300 px-5 py-4 text-sm font-black uppercase tracking-[0.12em] text-slate-950 transition hover:border-slate-950 sm:px-7 sm:tracking-[0.16em]"
            >
              About Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSnapshot;
