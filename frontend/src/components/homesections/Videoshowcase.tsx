// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";

const VideoGridSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const videoRefs = useRef([]);
  const intervalRef = useRef(null);
  const sliderRef = useRef(null);

  // Sample video data
  const allVideos = [
    {
      id: 1,
      title: "bearings 1",
      src: "/video/video-1.mp4",
      thumbnail:
        "https://t3.ftcdn.net/jpg/11/85/62/64/240_F_1185626483_PiyZOBtxyZBV9AGrEdiXpZnUVCu5esxg.jpg",
    },
    {
      id: 2,
      title: "bearings 2",
      src: "/video/video-2.mp4",
      thumbnail:
        "https://t3.ftcdn.net/jpg/14/47/37/64/240_F_1447376418_T3GqRJPHHYIeBbtlHxRCs3N7NHtM7OAJ.jpg",
    },
    {
      id: 3,
      title: "bearings 3",
      src: "/video/video-3.mp4",
      thumbnail:
        "https://t4.ftcdn.net/jpg/00/02/06/03/240_F_2060321_jH5uacaP5qrj7zMsld0FuHnABZabyM.jpg",
    },
    {
      id: 4,
      title: "bearings 4",
      src: "/video/video-4.mp4",
      thumbnail:
        "https://t4.ftcdn.net/jpg/01/02/07/23/240_F_102072378_RoaFenLsl4mFdID93imJj0wFd5iOzRVH.jpg",
    },
    {
      id: 5,
      title: "bearings 5",
      src: "/video/video-5.mp4",
      thumbnail:
        "https://t4.ftcdn.net/jpg/03/27/32/11/240_F_327321151_vggESRUygFWkw0pMeomH62gDcsgNnr2Y.jpg",
    },
    {
      id: 6,
      title: "bearings 6",
      src: "/video/video-6.mp4",
      thumbnail:
        "https://t4.ftcdn.net/jpg/02/55/89/01/240_F_255890167_1ji66H4IpOJrepji5KiiAaBmTMRnsFBj.jpg",
    },
  ];

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Group videos into slides based on current slidesToShow
  const groupedVideos = [];
  for (let i = 0; i < allVideos.length; i += slidesToShow) {
    groupedVideos.push(allVideos.slice(i, i + slidesToShow));
  }

  // Auto-rotate slides
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === groupedVideos.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [groupedVideos.length, slidesToShow]);

  const goToNext = () => {
    setCurrentSlide((prev) =>
      prev === groupedVideos.length - 1 ? 0 : prev + 1
    );
    resetAutoPlay();
  };

  const goToPrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? groupedVideos.length - 1 : prev - 1
    );
    resetAutoPlay();
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === groupedVideos.length - 1 ? 0 : prev + 1
      );
    }, 5000);
  };

  const handleVideoHover = (videoId) => {
    setIsHovered(videoId);
    const videoRef = videoRefs.current[videoId];
    if (videoRef) {
      videoRef.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  };

  const handleVideoLeave = (videoId) => {
    setIsHovered(null);
    const videoRef = videoRefs.current[videoId];
    if (videoRef) {
      videoRef.pause();
      videoRef.currentTime = 0;
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-gray-100 rounded-xl max-w-screen-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
        Video Gallery
      </h2>

      {/* Main Slider */}
      <div className="relative mb-8 w-full overflow-hidden" ref={sliderRef}>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300 w-full`}
        >
          {groupedVideos[currentSlide]?.map((video) => (
            <div
              key={video.id}
              className="relative rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow duration-300 aspect-video"
              onMouseEnter={() => handleVideoHover(video.id)}
              onMouseLeave={() => handleVideoLeave(video.id)}
            >
              <video
                ref={(el) => (videoRefs.current[video.id] = el)}
                src={video.src}
                poster={video.thumbnail}
                className="w-full h-full object-cover"
                loop
                muted
                preload="metadata"
              />
              <div
                className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-gray-900/80 to-transparent transition-opacity duration-300 ${
                  isHovered === video.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <h3 className="text-white text-sm font-medium">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {groupedVideos.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-800 hover:bg-[#00974A] hover:text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg transition-all duration-300 z-10"
              aria-label="Previous slide"
            >
              &lt;
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-800 hover:bg-[#00974A] hover:text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg transition-all duration-300 z-10"
              aria-label="Next slide"
            >
              &gt;
            </button>
          </>
        )}
      </div>

      {/* Indicators */}
      {groupedVideos.length > 1 && (
        <div className="flex justify-center space-x-2 mb-6">
          {groupedVideos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-[#00974A] w-6" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoGridSlider;
