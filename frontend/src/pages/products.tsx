// @ts-nocheck
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export async function getStaticProps() {
  try {
    const res = await fetch("http://localhost:5001/api/products");
    const data = await res.json();
    return {
      props: {
        initialProducts: data.products || [],
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("Error fetching products:", err);
    return {
      props: {
        initialProducts: [],
      },
      revalidate: 60,
    };
  }
}

export default function Products({ initialProducts = [] }) {
  const router = useRouter();
  const { category: selectedCategorySlug } = router.query;
  const [productsList] = useState(initialProducts);
  const canvasRef = useRef(null);

  const filteredProducts = selectedCategorySlug
    ? productsList.filter(
        (p) => p.category && p.category.slug === selectedCategorySlug
      )
    : productsList;

  useEffect(() => {
    if (typeof window !== "undefined" && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      let animationFrameId;

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = document.body.scrollHeight;
      };

      const createBearings = () => {
        const bearings = [];
        const count = Math.floor(window.innerWidth / 30);

        for (let i = 0; i < count; i++) {
          bearings.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 15 + Math.random() * 25,
            speed: 0.5 + Math.random() * 1.5,
            angle: Math.random() * Math.PI * 2,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.03,
          });
        }
        return bearings;
      };

      const drawBearing = (bearing, ctx) => {
        ctx.save();
        ctx.translate(bearing.x, bearing.y);
        ctx.rotate(bearing.rotation);

        // Outer ring
        ctx.beginPath();
        ctx.arc(0, 0, bearing.radius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(34, 197, 94, 0.2)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner ring
        ctx.beginPath();
        ctx.arc(0, 0, bearing.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(34, 197, 94, 0.15)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Balls
        const ballCount = Math.max(6, Math.floor(bearing.radius / 5));
        for (let i = 0; i < ballCount; i++) {
          const angle = (i / ballCount) * Math.PI * 2;
          const ballX = Math.cos(angle) * bearing.radius * 0.85;
          const ballY = Math.sin(angle) * bearing.radius * 0.85;

          ctx.beginPath();
          ctx.arc(ballX, ballY, bearing.radius * 0.1, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(34, 197, 94, 0.15)";
          ctx.fill();
        }

        ctx.restore();
      };

      const animate = (bearings) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        bearings.forEach((bearing) => {
          // Update position
          bearing.x += Math.cos(bearing.angle) * bearing.speed;
          bearing.y += Math.sin(bearing.angle) * bearing.speed;
          bearing.rotation += bearing.rotationSpeed;

          // Boundary check
          if (bearing.x < -bearing.radius * 2)
            bearing.x = canvas.width + bearing.radius;
          if (bearing.x > canvas.width + bearing.radius)
            bearing.x = -bearing.radius * 2;
          if (bearing.y < -bearing.radius * 2)
            bearing.y = canvas.height + bearing.radius;
          if (bearing.y > canvas.height + bearing.radius)
            bearing.y = -bearing.radius * 2;

          drawBearing(bearing, ctx);
        });

        animationFrameId = requestAnimationFrame(() => animate(bearings));
      };

      resizeCanvas();
      const bearings = createBearings();
      animate(bearings);

      const handleResize = () => {
        cancelAnimationFrame(animationFrameId);
        resizeCanvas();
        const newBearings = createBearings();
        animate(newBearings);
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);

  return (
    <div className="relative min-h-screen">
      <Head>
        <title>Products | SROBearing</title>
        <meta
          name="description"
          content="Explore our premium bearing products for industrial applications"
        />
      </Head>

      {/* Animated Bearings Background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10 opacity-10 pointer-events-none"
      />

      {/* Video Banner */}
      <div className="relative w-full h-[70vh] min-h-[520px] md:h-[550px] overflow-hidden bg-gray-700">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-90"
        >
          <source
            src="https://media.istockphoto.com/id/2063445461/video/two-ball-bearings.mp4?s=mp4-640x640-is&k=20&c=gQWd0Bd_0LOYDpvB9DorcwEGD-WNUGPJCsIhg1kq_Jk="
            type="video/mp4"
          />
          <img
            src="/bearing-banner-fallback.jpg"
            alt="Industrial bearings in motion"
            className="w-full h-full object-cover"
          />
        </video>

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center px-6 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Precision <span className="text-[#00974A]">Bearing</span>{" "}
              Solutions
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-white/90 mb-8">
              Engineered for performance, built for durability
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section className="relative bg-white/95 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-[#00974A]">Product</span> Range
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              High-quality bearings designed to meet the most demanding
              industrial requirements
            </p>
          </div>

          <div className="space-y-8">
            {filteredProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                passHref
              >
                <div className="flex flex-col md:flex-row items-center justify-between border border-gray-200 rounded-xl p-4 sm:p-6 bg-white shadow-md hover:shadow-lg transition duration-300 group">
                  {/* Left Image */}
                  <div className="w-full max-w-[320px] aspect-square flex-shrink-0">
                    <img
                      src={
                        product.image.startsWith("http")
                          ? product.image
                          : `http://localhost:5001${product.image}`
                      }
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Center Content */}
                  <div className="flex-1 md:mx-8 text-center md:text-left mt-4 md:mt-0">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-[#00974A] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 line-clamp-3">
                      {product.description ? product.description.replace(/<[^>]*>/g, "") : ""}
                    </p>
                  </div>

                  {/* Right Button */}
                  <div className="mt-5 md:mt-0">
                    <button className="px-5 py-2 bg-[#00974A] text-white font-medium rounded-lg shadow hover:bg-[#00974A] transition">
                      View Product
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
