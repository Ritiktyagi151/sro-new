// @ts-nocheck
import Link from "next/link";

const panels = [
  {
    title: "Customer Relationships & Service",
    description:
      "We build lasting relationships through fast responses, clear communication, and dependable support. From the first enquiry to after-sales assistance, our team keeps your bearing requirements moving smoothly.",
    button: "+ Service",
    href: "/services",
    desktopImage: "/home-page/customer-relationships-desktop.png",
    mobileImage: "/home-page/customer-support-mobile view.png",
  },
  {
    title: "Warehousing & Inventory Management",
    description:
      "A well-organized warehouse helps us maintain product availability, improve dispatch speed, reduce errors, and support urgent industrial requirements with confidence.",
    button: "+ Warehouse",
    href: "/contact",
    desktopImage: "/home-page/warehousing-desktop.png",
    mobileImage: "/home-page/warehouse-mobileview.png",
  },
];

export default function ServiceWarehouseSection() {
  return (
    <section className="bg-[#24145f]">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {panels.map((panel) => (
          <article
            key={panel.title}
            className="group relative h-[260px] overflow-hidden md:h-[380px]"
          >
            {/* Responsive Image */}
            <picture>
              <source media="(max-width: 767px)" srcSet={panel.mobileImage} />
              <img
                src={panel.desktopImage}
                alt={panel.title}
                className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-85"
                loading="lazy"
              />
            </picture>

            <div className="absolute inset-0 bg-black/58 transition duration-300 group-hover:bg-black/68" />

            <div className="relative z-10 flex h-full flex-col justify-center px-5 py-8 text-white sm:px-10 lg:px-16">
              <h2 className="max-w-[760px] text-xl font-bold uppercase leading-tight tracking-[0.04em] sm:text-2xl md:text-4xl">
                {panel.title}
              </h2>

              <p className="mt-3 max-w-[760px] text-xs font-semibold leading-6 text-white/95 sm:text-sm md:mt-5 md:text-base md:leading-7">
                {panel.description}
              </p>

              <Link
                href={panel.href}
                className="mt-5 inline-flex w-fit items-center justify-center border border-white px-5 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-slate-950 md:mt-8 md:px-8 md:py-3 md:text-sm"
              >
                {panel.button}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}