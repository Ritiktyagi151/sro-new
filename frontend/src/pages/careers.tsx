// @ts-nocheck
import Head from "next/head";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Factory,
  Mail,
  Settings,
  Users,
} from "lucide-react";

const departments = [
  {
    title: "Engineering Support",
    description:
      "Work with customers on bearing selection, fitment guidance, maintenance planning, and application support.",
    icon: Settings,
  },
  {
    title: "Sales and Customer Care",
    description:
      "Help industries find the right products quickly with clear communication, quotations, and order support.",
    icon: Users,
  },
  {
    title: "Operations and Dispatch",
    description:
      "Coordinate availability, packaging, quality checks, and timely movement of industrial bearing products.",
    icon: Factory,
  },
];

const benefits = [
  "Work with industrial products used across demanding applications",
  "Learn from practical bearing, maintenance, and application challenges",
  "Grow in a quality-focused team with direct customer exposure",
  "Build long-term skills in engineering support, sales, and operations",
];

const process = [
  "Share your profile",
  "Initial discussion",
  "Skill and role fit review",
  "Final conversation",
];

export default function CareersPage() {
  return (
    <>
      <Head>
        <title>Careers | SRO Bearings</title>
        <meta
          name="description"
          content="Explore career opportunities at SRO Bearings in engineering support, sales, customer care, and operations."
        />
      </Head>

      <section className="relative overflow-hidden bg-slate-950 bg-[url('/image/srofooter.jpg')] bg-cover bg-center px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#00974A]/30 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="border-l-4 border-[#00974A] pl-3 text-xs font-black uppercase tracking-[0.28em] text-emerald-200">
            Careers
          </p>
          <div className="mt-5 max-w-3xl">
            <h1 className="font-sans text-4xl font-black uppercase leading-tight sm:text-5xl lg:text-6xl">
              Build your career with SRO Bearings
            </h1>
            <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-200 sm:text-lg">
              Join a team focused on reliable bearing solutions, practical
              support, and responsive service for industries that need machinery
              to keep moving.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 min-[460px]:flex-row">
            <Link
              href="mailto:info@srobearings.com?subject=Career%20Application%20-%20SRO%20Bearings"
              className="inline-flex items-center justify-center bg-[#00974A] px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#007c3d]"
            >
              Apply Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-white/30 px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-white hover:bg-white/10"
            >
              Contact HR
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#00974A]/10 to-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="border-l-4 border-[#00974A] pl-3 text-xs font-black uppercase tracking-[0.28em] text-slate-500">
              Why Join Us
            </p>
            <h2 className="mt-4 border-b border-slate-200 pb-6 font-sans text-3xl font-bold uppercase leading-tight text-slate-950 md:text-4xl">
              Practical work, real industry impact
            </h2>
            <p className="mt-5 max-w-xl text-base font-medium leading-7 text-slate-600">
              At SRO Bearings, careers grow through hands-on product knowledge,
              customer conversations, and a strong focus on dependable service.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((item) => (
              <div
                key={item}
                className="flex gap-3 border border-slate-200 bg-white p-5 shadow-sm"
              >
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#00974A]" />
                <p className="text-sm font-semibold leading-6 text-slate-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl border-b border-slate-200 pb-6">
            <p className="border-l-4 border-[#00974A] pl-3 text-xs font-black uppercase tracking-[0.28em] text-slate-500">
              Opportunities
            </p>
            <h2 className="mt-4 font-sans text-3xl font-bold uppercase leading-tight text-slate-950 md:text-4xl">
              Areas we hire for
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {departments.map((department) => (
              <article
                key={department.title}
                className="border border-slate-200 bg-slate-50 p-6 transition hover:border-[#00974A]/50 hover:bg-white hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center bg-[#00974A] text-white">
                  <department.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-black uppercase text-slate-950">
                  {department.title}
                </h3>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                  {department.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="border-l-4 border-[#00974A] pl-3 text-xs font-black uppercase tracking-[0.28em] text-emerald-200">
              Hiring Process
            </p>
            <h2 className="mt-4 font-sans text-3xl font-bold uppercase leading-tight md:text-4xl">
              Simple and transparent
            </h2>
            <p className="mt-5 max-w-xl text-base font-medium leading-7 text-slate-300">
              Send your resume with your preferred role or area of interest.
              Our team will review your profile and connect if there is a good
              match.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {process.map((step, index) => (
              <div
                key={step}
                className="border border-white/15 bg-white/5 p-5 backdrop-blur-sm"
              >
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#36d37e]">
                  Step 0{index + 1}
                </span>
                <p className="mt-3 text-lg font-black uppercase">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border border-slate-200 bg-slate-50 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-[#00974A]">
              <BriefcaseBusiness className="h-6 w-6" />
              <span className="text-xs font-black uppercase tracking-[0.2em]">
                Open Application
              </span>
            </div>
            <h2 className="mt-4 font-sans text-2xl font-black uppercase text-slate-950 sm:text-3xl">
              Interested in working with SRO Bearings?
            </h2>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-600 sm:text-base">
              Share your resume and tell us which area you want to work in. We
              will keep your profile for suitable openings.
            </p>
          </div>

          <Link
            href="mailto:info@srobearings.com?subject=Career%20Application%20-%20SRO%20Bearings"
            className="inline-flex w-full items-center justify-center bg-slate-950 px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#00974A] sm:w-auto"
          >
            <Mail className="mr-2 h-4 w-4" />
            Send Resume
          </Link>
        </div>
      </section>
    </>
  );
}
