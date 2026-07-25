// @ts-nocheck
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

export async function getStaticProps() {
  try {
    const res = await fetch("http://localhost:5001/api/cms/industries");
    const data = await res.json();
    return {
      props: {
        initialIndustries: data.industries || [],
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("Error fetching industries:", err);
    return {
      props: {
        initialIndustries: [],
      },
      revalidate: 60,
    };
  }
}

const dummyIndustries = [
  {
    name: "Steel Industry",
    icon: "🔥",
    image:
      "https://t3.ftcdn.net/jpg/09/33/54/80/240_F_933548061_ILWuqxGjT7AscCB6eSthlsqJyHHueNg6.jpg",
    description:
      "High-temperature resistant bearings for rolling mills and continuous casters",
    stats: [
      "Withstands up to 300°C",
      "Heavy load capacity",
      "Scale-proof sealing",
      "Extended lubrication intervals",
    ],
  },
  {
    name: "Paper Industry",
    icon: "📜",
    image:
      "https://t4.ftcdn.net/jpg/08/90/04/79/240_F_890047910_MXbWg61YAaepNgfYH4me1xW9Smazi65R.jpg",
    description:
      "Corrosion-resistant bearings for humid paper machine environments",
    stats: [
      "Stainless steel options",
      "High-speed capability",
      "Moisture-proof design",
      "Reduced maintenance",
    ],
  },
  {
    name: "Cement Industry",
    icon: "🏗️",
    image:
      "https://t3.ftcdn.net/jpg/06/26/84/26/240_F_626842687_wrWPzxc3VJxt9Y9QODW3PtM3V6uKMN1G.jpg",
    description: "Dust-resistant bearings for crushers and kilns",
    stats: [
      "Abrasion-resistant materials",
      "Vibration damping",
      "Extended lubrication",
      "Heavy-duty construction",
    ],
  },
  {
    name: "Mining & Crushers",
    icon: "⛏️",
    image:
      "https://t4.ftcdn.net/jpg/14/41/72/09/240_F_1441720920_mV04OJcA2sFFUKYLNxUJdDdwcznLojrE.jpg",
    description: "Ultra-durable bearings for extreme shock loads",
    stats: [
      "Shock-load resistant",
      "Reinforced construction",
      "Contamination-proof",
      "Extended service life",
    ],
  },
];

const IndustryPage = ({ initialIndustries = [] }) => {
  const [industriesList] = useState(initialIndustries);
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const industries = industriesList && industriesList.length > 0 ? industriesList : dummyIndustries;

  useEffect(() => {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
            entry.target.style.opacity = 1;
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    // Try to autoplay video
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsVideoLoaded(true))
        .catch((e) => console.log("Autoplay prevented:", e));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Core Industries | SRO Bearing Solutions</title>
        <meta
          name="description"
          content="Specialized bearing solutions for Steel, Paper, Cement, and Mining industries with 40+ years of expertise"
        />
      </Head>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .gradient-text {
          background: linear-gradient(135deg, #00974A, #00974A);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-effect {
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hover-lift:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .shimmer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          animation: shimmer 2.5s infinite;
          z-index: 1;
        }

        .industry-card:hover .industry-image {
          transform: scale(1.1);
        }

        .industry-card:hover .industry-content {
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.9),
            rgba(0, 0, 0, 0.7)
          );
        }

        .industry-stats {
          max-height: 0;
          opacity: 0;
          transition: all 0.5s ease;
        }

        .industry-card:hover .industry-stats {
          max-height: 300px;
          opacity: 1;
        }

        .industry-description {
          transition: all 0.4s ease;
        }

        .industry-card:hover .industry-description {
          opacity: 0;
          transform: translateY(-10px);
        }

        .industry-button {
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.4s ease 0.1s;
        }

        .industry-card:hover .industry-button {
          transform: translateY(0);
          opacity: 1;
        }

        .industry-icon {
          transition: all 0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6);
        }

        .industry-card:hover .industry-icon {
          transform: rotate(15deg) scale(1.2);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative h-[78vh] min-h-[560px] overflow-hidden md:h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-[#00974A]/30 z-10 flex items-center justify-center">
          <div className="text-center px-4 max-w-6xl">
            <div className="glass-effect rounded-2xl p-5 sm:p-8 md:p-12 mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-on-scroll opacity-0 leading-tight">
                Precision Bearings for{" "}
                <span className="text-[#00974A]">Core Industries</span>
              </h1>
              <p className="text-base sm:text-lg md:text-2xl text-gray-100 mb-8 animate-on-scroll opacity-0 transition delay-100">
                Engineered solutions for Steel, Paper, Cement, and Mining
                applications
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-on-scroll opacity-0 transition delay-200">
                <button className="bg-[#00974A] hover:bg-[#00974A] text-white font-bold py-3 px-6 sm:py-4 sm:px-10 rounded-full text-base sm:text-lg shadow-lg hover-lift transition-all duration-300">
                  Industry Solutions
                </button>
                <button className="glass-effect hover:bg-white/20 text-white font-bold py-3 px-6 sm:py-4 sm:px-10 rounded-full text-base sm:text-lg hover-lift transition-all duration-300">
                  Technical Support
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.pexels.com/photos/459728/pexels-photo-459728.jpeg"
            onLoadedData={() => setIsVideoLoaded(true)}
          >
            <source
              src="https://videos.pexels.com/video-files/4686755/4686755-uhd_2560_1440_24fps.mp4"
              type="video/mp4"
            />
          </video>
          {!isVideoLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 animate-pulse"></div>
          )}
        </div>
      </section>

      {/* Core Industries We Serve - Enhanced Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20 animate-on-scroll opacity-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Core <span className="gradient-text">Industries</span> We Serve
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Specialized bearing solutions engineered for the most demanding
              industrial environments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="industry-card relative h-[360px] sm:h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 animate-on-scroll opacity-0"
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transform: "translateY(20px)",
                }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={industry.image.startsWith("http") ? industry.image : `http://localhost:5001${industry.image}`}
                    alt={industry.name}
                    className="industry-image w-full h-full object-cover transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>

                {/* Icon Badge */}
                <div className="industry-icon absolute top-5 right-5 w-12 h-12 sm:top-6 sm:right-6 sm:w-14 sm:h-14 bg-[#00974A] rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-lg z-10">
                  {industry.icon}
                </div>

                {/* Content */}
                <div className="industry-content absolute inset-0 flex flex-col justify-end p-5 sm:p-8 text-white z-10 transition-all duration-500">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">{industry.name}</h3>

                  <div
                    className="industry-description text-gray-200 mb-4 text-sm tiptap-editor-content"
                    dangerouslySetInnerHTML={{ __html: industry.description }}
                  />

                  <div className="industry-stats">
                    <ul className="space-y-2 mb-6">
                      {(industry.features || industry.stats || []).map((stat, i) => (
                        <li key={i} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-[#00974A] mr-2 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{stat}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="industry-button px-6 py-2 bg-[#00974A] hover:bg-[#00974A] rounded-full font-medium">
                      View Solutions
                    </button>
                  </div>
                </div>

                {/* Shimmer Effect */}
                <div className="shimmer opacity-0 industry-card:hover:opacity-100" />
              </div>
            ))}
          </div>

          {/* Supporting Stats */}
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 mt-12 sm:mt-16 max-w-5xl mx-auto">
            {[
              { value: "40+", label: "Years Experience" },
              { value: "500+", label: "Plant Installations" },
              { value: "75%", label: "Longer Bearing Life" },
              { value: "24/7", label: "Technical Support" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-on-scroll opacity-0 hover-lift"
                style={{ transitionDelay: `${index * 100 + 400}ms` }}
              >
                <p className="text-3xl sm:text-4xl font-bold text-[#00974A] mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Challenges Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20 animate-on-scroll opacity-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Industry <span className="gradient-text">Challenges</span> We
              Solve
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Addressing the unique bearing challenges in each core industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {[
              {
                industry: "Steel Manufacturing",
                challenge:
                  "Extreme heat and scale contamination cause premature bearing failure",
                solution:
                  "Our HTX series bearings feature special heat-resistant steel and advanced sealing systems that maintain lubrication integrity even at 300°C.",
                icon: (
                  <svg
                    className="w-10 h-10 text-[#00974A]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                    />
                  </svg>
                ),
                result:
                  "Increased bearing life from 6 to 18 months in rolling mill applications",
              },
              {
                industry: "Paper Production",
                challenge:
                  "Moisture and chemical exposure lead to corrosion and lubrication washout",
                solution:
                  "Stainless steel bearings with triple-lip seals and special polymer coatings prevent corrosion and maintain lubrication in wet environments.",
                icon: (
                  <svg
                    className="w-10 h-10 text-[#00974A]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                ),
                result:
                  "Reduced bearing replacements by 60% in paper machine dryer sections",
              },
              {
                industry: "Cement Processing",
                challenge:
                  "Abrasive dust penetrates bearings causing accelerated wear",
                solution:
                  "Patented labyrinth sealing systems combined with special grease formulations prevent dust ingress while maintaining proper lubrication.",
                icon: (
                  <svg
                    className="w-10 h-10 text-[#00974A]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                ),
                result:
                  "Extended crusher bearing life from 4 to 9 months in cement plants",
              },
              {
                industry: "Mining Operations",
                challenge:
                  "Shock loads from uncrushable material cause catastrophic bearing failures",
                solution:
                  "XHD series bearings feature reinforced cages and raceways with special heat treatment to withstand extreme impact loads.",
                icon: (
                  <svg
                    className="w-10 h-10 text-[#00974A]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                ),
                result:
                  "Reduced gyratory crusher downtime by 45% in mining applications",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 p-5 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 animate-on-scroll opacity-0 hover-lift"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start mb-6">
                  <div className="mr-4">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {item.industry}
                    </h3>
                    <p className="text-[#00974A] font-medium mt-1">
                      {item.challenge}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {item.solution}
                </p>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-[#00974A] mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium">
                    {item.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default IndustryPage;
