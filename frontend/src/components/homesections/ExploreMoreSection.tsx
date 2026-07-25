// @ts-nocheck
import React from "react";
import Link from "next/link";
const exploreItems = [
  {
    title: "Industry",
    description:
      "Explore how SRO bearings power critical operations across industries like automotive, manufacturing, and energy with precision and reliability.",
    image:
      "https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5kdXN0cmlhbHxlbnwwfHwwfHx8MA%3D%3D",
    linkText: "Explore our industry solutions",
    href: "/industries",
  },
  {
    title: "Services",
    description:
      "We offer expert support and tailored bearing services to maximize equipment uptime and extend product life. Discover what we can do for you.",
    image:
      "https://images.unsplash.com/photo-1643192820784-423a5201b121?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U2VydmljZXMlMjBiZWFyaW5nc3xlbnwwfHwwfHx8MA%3D%3D",
    linkText: "Explore our services",
    href: "/services",
  },
  {
    title: "Contact",
    description:
      "Need help or have a question? Our experts are here to assist you with inquiries, support, and tailored solutions for your business.",
    image:
      "https://images.unsplash.com/photo-1732791547490-bbcf92dfa722?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNvbnRhY3QlMjBiZWFyaW5nc3xlbnwwfHwwfHx8MA%3D%3D",
    linkText: "Get in touch with us",
    href: "/contact",
  },
];

const ExploreMoreSection = () => {
  return (
    <section className="bg-gray-100 py-6 px-6 md:px-16 text-[#00974A]">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl font-bold   mb-4">Explore more</h2>
        <p className="text-gray-600">
          Find out more about our commitment to industrial sustainability, the
          opportunities at SRO around the world and our stories in the selected
          sections below.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {exploreItems.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-md overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <Link
                href={item.href}
                className="text-[#00974A] font-medium hover:underline flex items-center gap-1"
              >
                <span className="text-lg">→</span>
                {item.linkText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreMoreSection;
