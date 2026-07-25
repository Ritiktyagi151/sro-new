// @ts-nocheck
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";

export async function getStaticProps() {
  try {
    const res = await fetch("http://localhost:5001/api/cms/services");
    const data = await res.json();
    return {
      props: {
        initialServices: data.services || [],
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("Error fetching services:", err);
    return {
      props: {
        initialServices: [],
      },
      revalidate: 60,
    };
  }
}

export default function ServicesPage({ initialServices = [] }) {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [servicesList] = useState(initialServices);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dummyServices = [
    {
      title: "Condition Monitoring Solutions",
      description:
        "Predictive maintenance technologies to maximize equipment uptime.",
      fullDescription: [
        "Our advanced condition monitoring systems provide real-time insights into your equipment health, enabling predictive maintenance strategies that reduce downtime by up to 50%. Using a combination of vibration analysis, thermography, and oil analysis, we detect potential failures before they occur.",
        "Key features include:",
        "- Wireless sensor networks for comprehensive coverage",
        "- AI-powered analytics for failure prediction",
        "- Customizable alert thresholds",
        "- Integration with existing CMMS systems",
        "Typical applications:",
        "- Rotating machinery (pumps, motors, compressors)",
        "- Gearboxes and bearings",
        "- Process equipment",
      ],
      benefits: [
        "40-60% reduction in unplanned downtime",
        "25-40% longer equipment lifespan",
        "Reduced maintenance costs by 20-35%",
      ],
      icon: "📊",
      image: "https://picsum.photos/600/400?random=1",
      caseStudy:
        "A major refinery reduced maintenance costs by $2.3M annually after implementing our monitoring solution across their critical rotating assets.",
    },
    {
      title: "Oil Reconditioning",
      description:
        "Extend oil life indefinitely with our patented Double Separation Technology.",
      fullDescription: [
        "Our RecondOil Box system revolutionizes lubrication management by continuously cleaning and restoring oil to like-new condition. The patented Double Separation Technology removes both particulate contamination and dissolved impurities that conventional filtration can't address.",
        "System capabilities:",
        "- Processes up to 100 liters per minute",
        "- Removes particles down to 1 micron",
        "- Reduces water content to <100 ppm",
        "- Maintains optimal additive package",
        "Implementation options:",
        "- Skid-mounted systems for fixed installations",
        "- Mobile units for temporary applications",
        "- Integrated solutions for OEM equipment",
      ],
      benefits: [
        "90% reduction in oil consumption",
        "60-80% lower waste oil disposal costs",
        "Extended component life by 2-3x",
      ],
      icon: "🔄",
      image: "https://picsum.photos/600/400?random=2",
      caseStudy:
        "A steel mill achieved 97% oil reuse rate and eliminated $450,000 in annual oil purchases while reducing bearing failures by 65%.",
    },
    {
      title: "Rotating Equipment Performance",
      description:
        "Optimize your critical machinery for peak efficiency and reliability.",
      fullDescription: [
        "Our comprehensive rotating equipment performance program combines precision maintenance practices with advanced monitoring to deliver guaranteed results. We analyze your entire system from bearings to alignment, implementing best practices that transform your maintenance operations.",
        "Service components:",
        "- Laser alignment and dynamic balancing",
        "- Lubrication program optimization",
        "- Vibration analysis and correction",
        "- Bearing installation training",
        "- Root cause failure analysis",
        "Performance guarantees:",
        "- 15-30% energy reduction",
        "- 40% longer MTBF (Mean Time Between Failures)",
        "- 25% lower maintenance costs",
      ],
      benefits: [
        "Predictable maintenance budgets",
        "Improved equipment availability",
        "Reduced energy consumption",
      ],
      icon: "⚙️",
      image: "https://picsum.photos/600/400?random=3",
      caseStudy:
        "A power plant increased pump reliability by 300% and reduced vibration-related failures to zero after implementing our performance program.",
    },
    {
      title: "Application Engineering",
      description:
        "Custom solutions tailored to your exact operational requirements.",
      fullDescription: [
        "Our application engineering team develops bespoke solutions for your most challenging equipment problems. We start with a thorough site assessment to understand your specific operating conditions, then design solutions that address root causes rather than symptoms.",
        "Engineering services include:",
        "- Bearing arrangement redesign",
        "- Lubrication system upgrades",
        "- Material selection consulting",
        "- Failure mode analysis",
        "- Life cycle cost modeling",
        "Specialized solutions for:",
        "- High-temperature applications",
        "- Corrosive environments",
        "- Heavy shock loading",
        "- Extreme contamination",
      ],
      benefits: [
        "Equipment lifespan extended by 2-5x",
        "Elimination of chronic failure points",
        "Optimized total cost of ownership",
      ],
      icon: "🛠️",
      image: "https://picsum.photos/600/400?random=4",
      caseStudy:
        "For a mining client, we redesigned a problematic conveyor idler arrangement that was failing every 3 months, extending service life to over 24 months.",
    },
    {
      title: "Asset Management",
      description:
        "Transform your maintenance operations with data-driven strategies.",
      fullDescription: [
        "Our asset management program elevates your maintenance practices to world-class standards through systematic implementation of reliability-centered maintenance (RCM) principles. We help you transition from reactive to proactive maintenance with measurable results.",
        "Program components:",
        "- Criticality analysis and equipment ranking",
        "- Failure modes and effects analysis (FMEA)",
        "- Maintenance strategy optimization",
        "- Spare parts rationalization",
        "- Key performance indicators (KPIs)",
        "- Continuous improvement processes",
        "Implementation approach:",
        "- Assessment and benchmarking",
        "- Roadmap development",
        "- Pilot program execution",
        "- Full-scale rollout",
      ],
      benefits: [
        "20-40% reduction in maintenance costs",
        "15-25% improvement in equipment availability",
        "Standardized best practices across sites",
      ],
      icon: "📈",
      image: "https://picsum.photos/600/400?random=5",
      caseStudy:
        "A manufacturing client achieved $1.8M in annual maintenance cost savings and improved overall equipment effectiveness (OEE) by 18% within the first year.",
    },
    {
      title: "Remanufacturing",
      description:
        "Sustainable component renewal with performance enhancements.",
      fullDescription: [
        "Our certified remanufacturing process restores worn components to original specifications while incorporating design improvements that address known failure modes. Unlike simple repairs, our process includes complete disassembly, precision machining, upgraded materials, and rigorous testing.",
        "Remanufacturing process:",
        "- Complete disassembly and cleaning",
        "- Dimensional inspection and analysis",
        "- Precision machining of worn surfaces",
        "- Material upgrades where applicable",
        "- Assembly with premium components",
        "- Comprehensive performance testing",
        "Available for:",
        "- Bearings and bearing housings",
        "- Gearboxes",
        "- Hydraulic components",
        "- Pump and compressor parts",
      ],
      benefits: [
        "40-60% cost savings vs. new components",
        "Improved performance over original design",
        "Reduced environmental impact",
      ],
      icon: "♻️",
      image: "https://picsum.photos/600/400?random=6",
      caseStudy:
        "A paper mill saved $320,000 annually by remanufacturing large dryer section bearings instead of replacing them, with no reduction in service life.",
    },
  ];

  const services = servicesList && servicesList.length > 0 ? servicesList : dummyServices;

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Services | SRO Industrial Solutions</title>
        <meta
          name="description"
          content="Comprehensive industrial maintenance and reliability solutions"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      {/* Modal */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className={`flex ${
              isMobile ? "items-end" : "items-center"
            } justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0`}
          >
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={closeModal}
            >
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full ${
                isMobile ? "max-w-full" : "max-w-[95%]"
              }`}
            >
              <div className="bg-white">
                <div className="relative h-48 sm:h-64 w-full">
                  <Image
                    src={selectedService.image.startsWith("http") ? selectedService.image : `http://localhost:5001${selectedService.image}`}
                    alt={selectedService.title}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                    priority
                  />
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full bg-gray-100 text-2xl sm:text-3xl mr-3 sm:mr-4 md:mr-6">
                      {selectedService.icon}
                    </div>
                    <div className="flex-1 overflow-y-auto max-h-[60vh] sm:max-h-[70vh]">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                        {selectedService.title}
                      </h3>
                      <div
                        className="mt-3 sm:mt-4 md:mt-6 text-xs sm:text-sm md:text-base text-gray-650 space-y-3 tiptap-editor-content"
                        dangerouslySetInnerHTML={{
                          __html: Array.isArray(selectedService.fullDescription)
                            ? selectedService.fullDescription.map(p => p.startsWith("<") ? p : `<p>${p}</p>`).join("")
                            : selectedService.fullDescription
                        }}
                      />
                      <div className="mt-4 sm:mt-6">
                        <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                          Case Study:
                        </h4>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 italic mt-1">
                          {selectedService.caseStudy}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-xs sm:text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto"
                >
                  Request Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white h-[70vh] sm:h-[70vh] md:h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/1600/900?random=7"
            alt="Industrial facility with machinery"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Industrial Reliability Solutions
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl max-w-3xl">
            Transform your maintenance operations with our comprehensive suite
            of engineering services designed to maximize uptime and minimize
            costs.
          </p>
          <div className="mt-6 sm:mt-8">
            <button className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Explore Our Solutions
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Intro */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
            Comprehensive Industrial Solutions
          </h2>
          <p className="mt-3 sm:mt-4 max-w-3xl text-base sm:text-lg md:text-xl text-gray-600 mx-auto">
            Our integrated approach combines cutting-edge technology with
            decades of engineering expertise to deliver measurable improvements
            in equipment reliability and operational efficiency.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-48 sm:h-56 md:h-64">
                <Image
                  src={service.image.startsWith("http") ? service.image : `http://localhost:5001${service.image}`}
                  alt={service.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4 sm:p-6">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg sm:text-xl md:text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                  {service.description}
                </p>
                <ul className="mb-4 space-y-1">
                  {service.benefits.slice(0, 2).map((benefit, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-xs sm:text-sm text-gray-600"
                    >
                      <svg
                        className="flex-shrink-0 h-3 w-3 sm:h-4 sm:w-4 text-[#00974A] mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openModal(service)}
                  className="mt-2 inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Learn more
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Value Proposition */}
        <div className="mt-16 sm:mt-24 bg-gray-50 rounded-xl p-6 sm:p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
              Why Choose SRO Industrial Solutions?
            </h2>
            <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
              {[
                {
                  title: "Proven Expertise",
                  description:
                    "Over 25 years of experience solving complex industrial challenges across multiple sectors.",
                  icon: "🏭",
                },
                {
                  title: "Measurable Results",
                  description:
                    "Our solutions deliver quantifiable improvements in reliability, efficiency, and cost savings.",
                  icon: "📊",
                },
                {
                  title: "Innovative Approach",
                  description:
                    "Combining cutting-edge technology with practical engineering solutions.",
                  icon: "💡",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Circular Oil Section */}
        <div className="mt-16 sm:mt-24 bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2">
              <div className="relative h-64 sm:h-80 md:h-full">
                <Image
                  className="object-cover"
                  src="https://picsum.photos/600/400?random=8"
                  alt="RecondOil Box"
                  layout="fill"
                  priority
                />
              </div>
            </div>
            <div className="p-6 sm:p-8 md:p-12 md:w-1/2">
              <div className="uppercase tracking-wide text-xs sm:text-sm text-gray-600 font-semibold">
                Sustainability Innovation
              </div>
              <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900">
                Revolutionizing Industrial Lubrication
              </h2>
              <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600">
                <p>
                  Our RecondOil technology represents a paradigm shift in
                  lubrication management, enabling truly circular use of
                  industrial oils.
                </p>
                <p>
                  The system continuously removes both particulate contamination
                  and dissolved impurities that conventional filtration cannot
                  address, while preserving the oil's additive package.
                </p>
                <p className="font-medium">
                  Typical results include 90% reduction in oil consumption and
                  60-80% lower waste oil disposal costs.
                </p>
              </div>
              <div className="mt-6 sm:mt-8">
                <button className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Learn About Circular Oil Solutions
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Training Section */}
        <div className="mt-16 sm:mt-24 bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="md:flex flex-row-reverse">
            <div className="md:flex-shrink-0 md:w-1/2">
              <div className="relative h-64 sm:h-80 md:h-full">
                <Image
                  className="object-cover"
                  src="https://picsum.photos/600/400?random=9"
                  alt="Industrial Training"
                  layout="fill"
                  priority
                />
              </div>
            </div>
            <div className="p-6 sm:p-8 md:p-12 md:w-1/2">
              <div className="uppercase tracking-wide text-xs sm:text-sm text-gray-600 font-semibold">
                Knowledge Transfer
              </div>
              <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900">
                SRO Technical Training Programs
              </h2>
              <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600">
                <p>
                  Our comprehensive training platform equips your team with the
                  knowledge and skills needed to implement best practices in
                  equipment maintenance and reliability.
                </p>
                <p>
                  Developed by our team of industry veterans, our programs
                  combine theoretical knowledge with practical, hands-on
                  training tailored to your specific equipment and operational
                  challenges.
                </p>
                <ul className="space-y-2 pl-5 list-disc text-sm sm:text-base">
                  <li>Certified lubrication specialist training</li>
                  <li>Vibration analysis certification</li>
                  <li>Precision maintenance workshops</li>
                  <li>Root cause failure analysis</li>
                </ul>
              </div>
              <div className="mt-6 sm:mt-8">
                <button className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Explore Training Programs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
