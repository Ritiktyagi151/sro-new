// @ts-nocheck
import Head from "next/head";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Gauge,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { bearingMarkets, getMarketImage } from "@/data/markets";

export async function getStaticPaths() {
  return {
    paths: bearingMarkets.map((market) => ({
      params: { slug: market.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const market = bearingMarkets.find((item) => item.slug === params.slug) || null;

  return {
    props: {
      market,
    },
  };
}

export default function MarketDetailPage({ market }) {
  if (!market) return null;

  const challenges = market.challenges || [
    "High radial and axial loads across rotating equipment",
    "Dust, moisture, heat, vibration, or contamination around bearing points",
    "Unplanned downtime caused by lubrication issues and component fatigue",
    "Misalignment and shock loads in continuous production environments",
  ];

  const benefits = market.benefits || [
    "Improved service life through correct bearing selection",
    "Lower maintenance frequency with reliable housings and sealing options",
    "Better uptime for production-critical machines",
    "Application-specific product guidance from the SRO Bearings team",
  ];

  const requirements = market.requirements || [
    "Load direction and operating speed",
    "Temperature and contamination level",
    "Mounting arrangement and shaft size",
    "Lubrication method and service interval",
  ];

  const relatedMarkets = bearingMarkets
    .filter((item) => item.slug !== market.slug)
    .slice(0, 3);

  return (
    <>
      <Head>
        <title>{market.name} | SRO Bearing Markets</title>
        <meta name="description" content={market.description} />
      </Head>

      <main className="bg-white text-slate-950">
        <section className="relative min-h-[520px] overflow-hidden pt-[88px] md:min-h-[560px] md:pt-[118px]">
          <img
            src={getMarketImage(market.image)}
            alt={market.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative z-10 mx-auto flex min-h-[432px] max-w-[1200px] flex-col justify-center px-4 py-16 text-white sm:px-6 md:min-h-[442px] md:py-20">
            <Link
              href="/"
              className="mb-8 inline-flex w-fit items-center text-sm font-bold uppercase tracking-[0.18em] text-white/85 transition hover:text-[#74d39e]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back To Home
            </Link>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#74d39e]">
              Market Detail
            </p>
            <h1 className="mt-4 max-w-4xl text-3xl font-black uppercase leading-tight sm:text-4xl md:text-6xl">
              {market.name}
            </h1>
            <p className="mt-6 max-w-3xl text-base font-medium leading-7 text-white/85 sm:text-lg sm:leading-8">
              {market.description}
            </p>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.26em] text-[#00974A]">
                  Market Overview
                </p>
                <h2 className="mt-3 text-2xl font-black uppercase text-slate-950 sm:text-3xl md:text-5xl">
                  Built For Demanding Bearing Points
                </h2>
              </div>
              <div className="space-y-5 text-base font-medium leading-8 text-slate-700">
                <p>
                  {market.name} equipment needs bearing products that can keep
                  rotating assemblies stable under real plant conditions. SRO
                  Bearings focuses on matching the correct bearing type,
                  housing, chain, and support component to the machine duty.
                </p>
                <p>
                  Our selection approach considers load, speed, sealing,
                  lubrication, mounting space, and maintenance access so the
                  solution is practical for day-to-day operations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f7faf8] px-4 py-14 sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.26em] text-[#00974A]">
                Bearing Fit
              </p>
              <h2 className="mt-3 text-2xl font-black uppercase text-slate-950 sm:text-3xl md:text-5xl">
                Recommended Products
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {market.products.map((product) => (
                  <Link
                    key={product}
                    href={`/products/${product
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z-]/g, "")}`}
                    className="group flex items-center justify-between border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#00974A]"
                  >
                    <span className="font-bold text-slate-950">{product}</span>
                    <ArrowRight className="h-5 w-5 text-[#00974A] transition group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-[#eef8f2] p-5 sm:p-7 md:p-9">
              <p className="text-sm font-black uppercase tracking-[0.26em] text-[#00974A]">
                Common Uses
              </p>
              <h2 className="mt-3 text-2xl sm:text-3xl font-black uppercase text-slate-950">
                Applications
              </h2>
              <div className="mt-8 space-y-4">
                {market.applications.map((application) => (
                  <div key={application} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#00974A]" />
                    <p className="font-semibold leading-7 text-slate-800">
                      {application}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-6 md:grid-cols-3">
              <article className="border border-slate-200 bg-white p-5 sm:p-7 shadow-sm">
                <Gauge className="h-9 w-9 text-[#00974A]" />
                <h2 className="mt-5 text-2xl font-black uppercase text-slate-950">
                  Operating Challenges
                </h2>
                <div className="mt-6 space-y-4">
                  {challenges.map((item) => (
                    <p key={item} className="text-sm font-semibold leading-7 text-slate-700">
                      {item}
                    </p>
                  ))}
                </div>
              </article>

              <article className="border border-slate-200 bg-white p-5 sm:p-7 shadow-sm">
                <Wrench className="h-9 w-9 text-[#00974A]" />
                <h2 className="mt-5 text-2xl font-black uppercase text-slate-950">
                  Selection Inputs
                </h2>
                <div className="mt-6 space-y-4">
                  {requirements.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-[#00974A]" />
                      <p className="text-sm font-semibold leading-7 text-slate-700">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="border border-slate-200 bg-white p-5 sm:p-7 shadow-sm">
                <ShieldCheck className="h-9 w-9 text-[#00974A]" />
                <h2 className="mt-5 text-2xl font-black uppercase text-slate-950">
                  Key Benefits
                </h2>
                <div className="mt-6 space-y-4">
                  {benefits.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-[#00974A]" />
                      <p className="text-sm font-semibold leading-7 text-slate-700">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 px-4 py-14 text-white sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.26em] text-[#74d39e]">
                Support Process
              </p>
              <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl md:text-5xl">
                From Requirement To Bearing Fit
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Understand machine duty and failure pattern",
                "Review load, speed, temperature, and environment",
                "Shortlist bearing, housing, and sealing options",
                "Support replacement planning and future maintenance",
              ].map((step, index) => (
                <div key={step} className="border border-white/15 p-5">
                  <span className="text-sm font-black text-[#74d39e]">
                    0{index + 1}
                  </span>
                  <p className="mt-3 text-base font-bold leading-7">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.26em] text-[#00974A]">
                  Explore More
                </p>
                <h2 className="mt-3 text-2xl sm:text-3xl font-black uppercase text-slate-950">
                  Related Markets
                </h2>
              </div>
              <Link
                href="/industries"
                className="inline-flex w-fit items-center text-sm font-black uppercase tracking-[0.18em] text-[#00974A]"
              >
                View All Industries
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {relatedMarkets.map((item) => (
                <Link
                  key={item.slug}
                  href={`/markets/${item.slug}`}
                  className="group relative h-64 overflow-hidden bg-slate-900"
                >
                  <img
                    src={getMarketImage(item.image)}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/55" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className="text-xl font-black uppercase">
                      {item.name}
                    </h3>
                    <p className="mt-3 text-sm font-bold uppercase text-[#74d39e]">
                      + Details
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 px-4 py-14 text-white sm:px-6">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.26em] text-[#74d39e]">
                Need Bearing Support?
              </p>
              <h2 className="mt-3 text-2xl sm:text-3xl font-black uppercase">
                Talk To SRO Bearings
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex w-full justify-center bg-[#00974A] px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:opacity-90 min-[420px]:w-fit min-[420px]:px-7"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
