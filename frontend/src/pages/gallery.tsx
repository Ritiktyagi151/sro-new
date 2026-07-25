// @ts-nocheck
import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export async function getStaticProps() {
  try {
    const res = await fetch("http://localhost:5001/api/cms/gallery");
    const data = await res.json();
    return {
      props: {
        initialGallery: data.gallery || [],
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("Error fetching gallery:", err);
    return {
      props: {
        initialGallery: [],
      },
      revalidate: 60,
    };
  }
}

export default function Gallery({ initialGallery = [] }) {
  const [activeTab, setActiveTab] = useState("photos");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const videoRefs = useRef([]);

  const [galleryItems] = useState(initialGallery);

  const photos = galleryItems.filter((item) => item.type === "photo");
  const videos = galleryItems.filter((item) => item.type === "video");

  const handleVideoHover = (index, isHovering) => {
    if (videoRefs.current[index]) {
      isHovering
        ? videoRefs.current[index].play()
        : videoRefs.current[index].pause();
    }
  };

  return (
    <>
      <Head>
        <title>Gallery | SRO Bearing</title>
        <meta
          name="description"
          content="Explore our bearing products gallery"
        />
      </Head>

      {/* Photo Zoom Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-6xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-10 right-0 text-white text-3xl z-10"
                onClick={() => setSelectedPhoto(null)}
              >
                &times;
              </button>
              <div className="bg-white rounded-lg overflow-hidden">
                <img
                  src={
                    selectedPhoto.src.startsWith("http")
                      ? selectedPhoto.src
                      : `http://localhost:5001${selectedPhoto.src}`
                  }
                  alt={selectedPhoto.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <div className="p-4 sm:p-6 bg-gray-50">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#00974A] mb-2">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-gray-600">{selectedPhoto.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative">
        <div className="relative w-full h-[60vh] min-h-[420px] overflow-hidden md:h-[70vh]">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="https://media.istockphoto.com/id/2194284479/video/macro-metal-balls-rolling-toward-the-camera.mp4?s=mp4-640x640-is&k=20&c=0YsV1hJ2cia-Mub37pUWjaFeXYhfb2oCrAIxXL6TeLE="
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center px-4"
            >
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4">
                SRO Bearing Gallery
              </h1>
              <p className="text-base sm:text-lg text-white max-w-2xl mx-auto">
                Discover our premium bearing solutions through our visual
                showcase
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Centered Content Section */}
      <div className="container mx-auto px-4 py-10 sm:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#00974A] mb-6">
            Our Product Gallery
          </h2>
          <p className="text-gray-600 mb-8 text-base sm:text-lg">
            As leading traders of high-quality bearings, SRO Bearing offers a
            wide range of precision-engineered products designed for durability
            and performance. Explore our collection below.
          </p>

          {/* Centered Tab Buttons */}
          <div className="flex justify-center mb-10 sm:mb-12">
            <div className="inline-flex w-full max-w-xs space-x-2 p-1 bg-gray-100 rounded-lg sm:w-auto">
              {["photos", "videos"].map((tab) => (
                <button
                  key={tab}
                  className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-300 sm:flex-none sm:px-6 ${
                    activeTab === tab
                      ? "bg-[#00974A] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "photos" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.map((photo) => (
                  <motion.div
                    key={photo._id}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                    }}
                    className="bg-gray-100 h-64 rounded-xl overflow-hidden relative group cursor-pointer"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <img
                      src={
                        photo.src.startsWith("http")
                          ? photo.src
                          : `http://localhost:5001${photo.src}`
                      }
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div>
                        <h3 className="text-white font-semibold text-lg">
                          {photo.title}
                        </h3>
                        <p className="text-gray-200 text-sm">
                          {photo.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <motion.div
                    key={video._id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-100 rounded-xl overflow-hidden relative group"
                    onMouseEnter={() => handleVideoHover(index, true)}
                    onMouseLeave={() => handleVideoHover(index, false)}
                  >
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      className="w-full h-48 object-cover"
                      muted
                      loop
                      playsInline
                      poster={
                        video.poster && video.poster.startsWith("http")
                          ? video.poster
                          : video.poster
                          ? `http://localhost:5001${video.poster}`
                          : ""
                      }
                    >
                      <source
                        src={
                          video.src.startsWith("http")
                            ? video.src
                            : `http://localhost:5001${video.src}`
                        }
                        type="video/mp4"
                      />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                      <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-[#00974A]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-semibold text-gray-800">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {video.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
