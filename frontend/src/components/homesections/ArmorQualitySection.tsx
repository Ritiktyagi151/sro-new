// @ts-nocheck

const panels = [
  {
    title: "Armor Bearing Protection",
    desktopImage: "/srobanners/banner2.png",
    mobileImage: "/srobanners/srobearing-mobile.png",
  },
  {
    title: "Product Quality",
    desktopImage: "/srobanners/bannersro.png",
    mobileImage: "/srobanners/srobearing2.png",
  },
];

export default function ArmorQualitySection() {
  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {panels.map((panel) => (
          <article
            key={panel.title}
            className="group relative h-[260px] overflow-hidden md:h-[380px]"
          >
            <picture>
              {/* Mobile Image */}
              <source
                media="(max-width: 767px)"
                srcSet={panel.mobileImage}
              />

              {/* Desktop Image */}
              <img
                src={panel.desktopImage}
                alt={panel.title}
                className="absolute inset-0 h-full w-full object-fill transition duration-700"
                loading="lazy"
              />
            </picture>
          </article>
        ))}
      </div>
    </section>
  );
}