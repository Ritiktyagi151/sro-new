// @ts-nocheck
import Image from "next/image";
import Link from "next/link";

const ResearchDevelopmentSection = () => {
  // Random technology-related image from Unsplash
  const randomImageUrl = "/image/about/Indian-lady-sro.jpg";

  return (
    <section id="research-tech" className="py-16 bg-gray-100 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="md:w-1/2">
            <Image
              src={randomImageUrl}
              alt="Technology research and development"
              width={600}
              height={400}
              className="rounded-lg shadow-xl object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-400 mb-6">
              <span className="block text-[#00974A]">
                Research and technology
              </span>
              <span className="block">development</span>
            </h2>

            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-[#00974A] mb-2">
                Co-innovating tomorrow's technologies
              </h3>
              <p className="text-gray-600">
                Saving energy by reducing friction is a concrete way towards a
                more sustainable world. Collaborating widely with other
                forward-thinking organizations, we're helping to make industry
                smarter, more competitive, and more energy efficient every day.
              </p>
            </div>

            <Link href="/research">
              <button className="px-6 py-3 bg-[#00974A] text-white font-medium rounded-lg hover:bg-[#00974A] transition-colors shadow-md">
                Explore R&D
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchDevelopmentSection;
