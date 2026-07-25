// @ts-nocheck
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Users } from "lucide-react";

const ValuedClients = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [partnerCMS, setPartnerCMS] = useState({
    badge: "Trusted Partnership",
    title: "Our Client",
    description: "We're proud to work with industry-leading companies who trust us to deliver exceptional results and drive their success forward.",
    happyClientsCount: "12+",
    satisfactionRate: "98%",
    averageRating: "5.0 Average Rating",
    clients: []
  });

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/cms/partners");
        const data = await res.json();
        if (data.success && data.partner) {
          setPartnerCMS(data.partner);
        }
      } catch (err) {
        console.error("Error fetching partner CMS data:", err);
      }
    };
    fetchPartners();
  }, []);

  const clients = partnerCMS.clients && partnerCMS.clients.length > 0 ? partnerCMS.clients : [
    { id: 1, name: "TechCorp", logo: "TC", color: "from-gray-500 to-gray-600" },
    { id: 2, name: "GlobalDyne", logo: "GD", color: "from-gray-500 to-gray-600" },
    { id: 3, name: "Creative Co", logo: "CC", color: "from-gray-400 to-gray-500" },
    { id: 4, name: "FutureTech", logo: "FT", color: "from-gray-400 to-gray-500" },
    { id: 5, name: "HealthPlus", logo: "HP", color: "from-gray-600 to-gray-700" },
    { id: 6, name: "EduPro", logo: "EP", color: "from-gray-600 to-gray-700" },
    { id: 7, name: "FinanceX", logo: "FX", color: "from-gray-300 to-gray-400" },
    { id: 8, name: "StartupLab", logo: "SL", color: "from-gray-300 to-gray-400" }
  ];

  const clientsPerSlide = 8;
  const totalSlides = Math.ceil(clients.length / clientsPerSlide);

  const nextSlide = () => {
    if (totalSlides <= 1) return;
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    if (totalSlides <= 1) return;
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (isAutoPlaying && totalSlides > 1) {
      const interval = setInterval(nextSlide, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, totalSlides]);

  const getVisibleClients = () => {
    if (clients.length === 0) return [];
    const startIndex = currentSlide * clientsPerSlide;
    return clients.slice(startIndex, startIndex + clientsPerSlide);
  };

  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-white py-4 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100 rounded-full opacity-30 translate-x-48 -translate-y-48 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gray-100 rounded-full opacity-20 -translate-x-40 translate-y-40 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center min-h-[500px]">
          {/* Left Side - Our Clients Text */}
          <div className="space-y-8 animate-fade-in-left">
            <div className="inline-flex items-center gap-2 bg-[#00974A] text-gray-600 px-4 py-2 rounded-full text-lg font-medium animate-bounce">
              <Users className="w-4 h-4" />
              <span>{partnerCMS.badge}</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl lg:text-4xl font-bold text-[#00974A] leading-tight">
                Our{" "}
                <span className="bg-gradient-to-r from-gray-500 to-gray-600 bg-clip-text text-transparent">
                  {partnerCMS.title?.replace("Our ", "") || "Client"}
                </span>
              </h1>

              <p className="text-lg text-[#00974A] leading-relaxed max-w-lg">
                {partnerCMS.description}
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-6 max-w-md">
              <div className="bg-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="text-3xl font-bold text-gray-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {partnerCMS.happyClientsCount || `${clients.length}+`}
                </div>
                <div className="text-[#00974A] font-medium">Happy Clients</div>
              </div>
              <div className="bg-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="text-3xl font-bold text-gray-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {partnerCMS.satisfactionRate}
                </div>
                <div className="text-[#00974A] font-medium">
                  Satisfaction Rate
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 ">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-[#00974A] fill-green-400"
                  />
                ))}
              </div>
              <span className="text-gray-600 font-medium">
                {partnerCMS.averageRating}
              </span>
            </div>
          </div>

          {/* Right Side - Client Logos */}
          <div
            className="relative animate-fade-in-right"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-gray-100 hover:bg-gray-50 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 group"
            >
              <ChevronLeft className="w-5 h-5 text-[#00974A] group-hover:text-[#00974A]" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-gray-100 hover:bg-gray-50 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 group"
            >
              <ChevronRight className="w-5 h-5 text-[#00974A] group-hover:text-[#00974A]" />
            </button>

            {/* Client Logo Grid */}
            <div className="bg-gray-100 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-50"></div>

              <div className="relative z-10">
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {getVisibleClients().map((client, index) => (
                    <div
                      key={client.id}
                      className="aspect-square bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center group cursor-pointer animate-scale-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div
                        className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300 shadow-lg bg-gray-200"
                      >
                        {client.image ? (
                          <img src={client.image} alt={client.name} className="w-full h-full object-contain" />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${client.color} flex items-center justify-center`}>
                            {client.logo}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Company Names */}
                <div className="grid grid-cols-4 gap-4 text-center">
                  {getVisibleClients().map((client, index) => (
                    <div
                      key={`name-${client.id}`}
                      className="text-xs font-medium text-[#00974A] truncate animate-fade-in-up"
                      style={{ animationDelay: `${index * 100 + 200}ms` }}
                    >
                      {client.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-left {
          animation: fade-in-left 1s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 1s ease-out 0.3s both;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 1s both;
        }
      `}</style>
    </div>
  );
};

export default ValuedClients;
