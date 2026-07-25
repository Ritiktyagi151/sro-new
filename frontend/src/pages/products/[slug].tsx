// @ts-nocheck
import Head from "next/head";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Link from "next/link";

const productData = {
  "spherical-roller-bearings": {
    name: "Spherical Roller Bearings",
    description:
      "Spherical roller bearings are self-aligning and suitable for heavy-duty applications with misalignment.",
    image:
      "https://media.istockphoto.com/id/521230407/photo/group-of-bearings-isolated.jpg?s=612x612&w=0&k=20&c=L5TC6rTNrEeBvJdCy0gR9GolxTmYUhqhwh03XVawzRo=",
    features: [
      "Self-aligning capability (±3°)",
      "High load capacity",
      "Robust construction",
      "Suitable for heavy radial and axial loads",
    ],
    specifications: {
      Material: "Chrome steel",
      Cage: "Pressed steel or brass",
      "Temperature Range": "-30°C to +120°C",
      Lubrication: "Grease or oil",
    },
  },
  "taper-roller-bearings": {
    name: "Taper Roller Bearings",
    description:
      "These bearings handle combined loads and are often used in automotive and industrial gearboxes.",
    image:
      "https://media.istockphoto.com/id/1359522393/photo/modify-taper-bearing-on-a-white-background-motorcycle-taper-bearing-close-up-motorcycle-modify.jpg?s=612x612&w=0&k=20&c=cLNL_5NRg_jn2vj3iwNXpZvy7q_ZBTQgrNJcPeJGRXM=",
    features: [
      "High radial and axial load capacity",
      "Separable design",
      "Precision performance",
      "Long service life",
    ],
    specifications: {
      Material: "High-carbon chromium steel",
      Cage: "Pressed steel or polymer",
      "Precision Class": "ABEC-1 to ABEC-7",
      Sealing: "Open, shielded or sealed",
    },
  },
  "thrust-bearings": {
    name: "Thrust Bearings",
    description: "Handles axial loads in high-speed applications.",
    image:
      "https://media.istockphoto.com/id/537377996/photo/bearing.jpg?s=612x612&w=0&k=20&c=MJeT8jNpEtLkKZX0rCiEw6-3jHXSbFkO_gkFXMKq1ps=",
    features: [
      "Designed for axial load support",
      "High-speed capability",
      "Reduced friction and wear",
      "Available in various configurations",
    ],
    specifications: {
      Material: "Bearing steel",
      "Load Direction": "Axial only",
      Applications: "Automotive, aerospace, industrial machinery",
      Sealing: "Open or sealed",
    },
  },
  "multi-row-bearings": {
    name: "Multi Row Bearings",
    description: "Suitable for large radial loads and high-speed rotation.",
    image:
      "https://media.istockphoto.com/id/696640668/photo/3d-rendering-of-tapered-roller-bearings.jpg?s=612x612&w=0&k=20&c=VVGBMzlgasGoNf7BIHMK3IN-tBB-kFnv94LNXaH8ooY=",
    features: [
      "Multiple rows for higher load capacity",
      "High-speed rotation capability",
      "Improved alignment",
      "Durable under heavy loads",
    ],
    specifications: {
      Material: "Chrome steel",
      Rows: "2 to 4 rows",
      "Application Areas": "Rolling mills, heavy machinery",
      Cage: "Steel or brass",
    },
  },
  "pillow-block-bearing": {
    name: "Pillow Block Bearing",
    description: "Used in mounted bearing units for industrial machines.",
    image:
      "https://media.istockphoto.com/id/960982298/photo/support-bearing-assembly.jpg?s=612x612&w=0&k=20&c=Oy75zBQpWgk36rP70r9Hv1TdB9Wrjv74noM_fwpT49o=",
    features: [
      "Easy mounting and installation",
      "Provides stable support",
      "Available in different housing materials",
      "Low maintenance",
    ],
    specifications: {
      Housing: "Cast iron or pressed steel",
      Bearing: "Insert bearing with seals",
      "Lubrication Type": "Grease",
      Applications: "Conveyors, fans, industrial equipment",
    },
  },
  "plummer-blocks": {
    name: "Plummer Blocks",
    description: "Reliable and efficient housing for rotary shafts.",
    image:
      "https://media.istockphoto.com/id/1400522671/photo/bearing-unit.jpg?s=612x612&w=0&k=20&c=gioMYKovMFDvK7Hm_dxtI-9m6pKbAtHCln-wFdn3WPE=",
    features: [
      "Heavy-duty housing support",
      "Easy shaft alignment",
      "Long service life",
      "Suitable for harsh environments",
    ],
    specifications: {
      Material: "Cast iron or ductile iron",
      Mounting: "Foot-mounted",
      Sealing: "Multiple sealing options",
      Applications: "Mining, aggregate, cement industries",
    },
  },
  "roller-chains": {
    name: "Roller Chains",
    description: "High-performance transmission chain for power systems.",
    image:
      "https://media.istockphoto.com/id/636828986/photo/timing-mechanism-on-a-white-background.jpg?s=612x612&w=0&k=20&c=NRdgODUjCj07dR7ijdrrtbMWq5BOWlplGgvlmXBvIkA=",
    features: [
      "High tensile strength",
      "Wear resistance",
      "Smooth operation at high speed",
      "Precision engineered",
    ],
    specifications: {
      Material: "Carbon steel or stainless steel",
      "Pitch Range": "6 mm to 76.2 mm",
      Standard: "ANSI/ISO",
      Applications: "Power transmission, conveyor systems",
    },
  },
};

const bannerVideo = {
  src: "https://example.com/path-to-your-video.mp4", // Replace with your actual video URL
  fallbackImage:
    "https://t3.ftcdn.net/jpg/13/74/03/58/240_F_1374035846_7XnRZfXZnG1BXIq9Wx5nWx20eIvFdLZc.jpg",
  title: "Premium Industrial Bearings",
  subtitle: "Engineered for Performance and Durability",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};



import { useState } from "react";

export default function ProductDetail({ product, related = [] }) {
  const router = useRouter();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I would like to request a quote for the product: ${product?.name || ""}.`,
  });
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [quoteError, setQuoteError] = useState("");

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setQuoteSubmitting(true);
    setQuoteError("");
    try {
      const res = await fetch("http://localhost:5001/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "general_website",
          name: quoteForm.name,
          email: quoteForm.email,
          phone: quoteForm.phone,
          message: quoteForm.message,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit quote");
      setQuoteSuccess(true);
      setQuoteForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setQuoteError(err.message || "Failed to submit request.");
    } finally {
      setQuoteSubmitting(false);
    }
  };

  const handleDownloadCatalog = () => {
    if (!product) return;
    
    // Create a temporary hidden iframe
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);
    
    const iframeDoc = iframe.contentWindow.document;
    
    // Populate the iframe with a beautiful HTML catalog layout
    const featuresList = (product.features || []).map(f => `<li>${f}</li>`).join("");
    const specRows = Object.entries(product.specifications || {}).map(([k, v]) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #4a5568;">${k}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${v}</td>
      </tr>
    `).join("");
    
    const productImage = product.image 
      ? (product.image.startsWith("http") ? product.image : `http://localhost:5001${product.image}`)
      : "https://picsum.photos/seed/bearing/600/400";

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${product.name} Catalog</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Inter', sans-serif;
            color: #2d3748;
            margin: 0;
            padding: 40px;
            background-color: #ffffff;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 3px solid #00974A;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 24px;
            font-weight: 800;
            color: #00974A;
            letter-spacing: 1px;
          }
          .contact-info {
            text-align: right;
            font-size: 12px;
            color: #718096;
            line-height: 1.5;
          }
          .product-title {
            font-size: 32px;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 10px;
          }
          .category {
            display: inline-block;
            background-color: #f0fdf4;
            color: #00974A;
            font-size: 12px;
            font-weight: 600;
            padding: 4px 12px;
            border-radius: 9999px;
            border: 1px solid #bbf7d0;
            margin-bottom: 25px;
          }
          .main-content {
            display: flex;
            gap: 40px;
            margin-bottom: 40px;
          }
          .image-container {
            flex: 1;
            max-width: 45%;
          }
          .product-image {
            width: 100%;
            height: auto;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          }
          .details {
            flex: 1.2;
          }
          .section-title {
            font-size: 18px;
            font-weight: 700;
            color: #2d3748;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 8px;
            margin-top: 0;
            margin-bottom: 15px;
          }
          .description {
            font-size: 14px;
            line-height: 1.6;
            color: #4a5568;
            margin-bottom: 25px;
          }
          .features {
            padding-left: 20px;
            margin-bottom: 0;
          }
          .features li {
            font-size: 14px;
            line-height: 1.7;
            color: #4a5568;
            margin-bottom: 8px;
          }
          .specs-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          .specs-table th {
            background-color: #f8fafc;
            color: #334155;
            text-align: left;
            padding: 12px;
            font-weight: 700;
            border-bottom: 2px solid #e2e8f0;
          }
          .footer {
            margin-top: 60px;
            border-top: 1px solid #e2e8f0;
            padding-top: 20px;
            text-align: center;
            font-size: 11px;
            color: #a0aec0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">SRO BEARINGS</div>
          <div class="contact-info">
            <strong>SRO Bearing Co.</strong><br>
            info@srobearings.com | www.srobearings.com<br>
            Premium Industrial Bearings
          </div>
        </div>

        <div class="product-title">${product.name}</div>
        <div class="category">Premium Bearing Catalog</div>

        <div class="main-content">
          <div class="image-container">
            <img src="${productImage}" class="product-image" alt="${product.name}">
          </div>
          <div class="details">
            <h4 class="section-title">Product Description</h4>
            <p class="description">${product.description || "No description available."}</p>
            
            ${featuresList ? `
              <h4 class="section-title">Key Features</h4>
              <ul class="features">
                ${featuresList}
              </ul>
            ` : ""}
          </div>
        </div>

        ${specRows ? `
          <h4 class="section-title" style="margin-top: 40px;">Technical Specifications</h4>
          <table class="specs-table">
            <thead>
              <tr>
                <th style="width: 40%;">Parameter</th>
                <th style="width: 60%;">Value</th>
              </tr>
            </thead>
            <tbody>
              ${specRows}
            </tbody>
          </table>
        ` : ""}

        <div class="footer">
          © ${new Date().getFullYear()} SRO Bearings. All rights reserved. Generated dynamically from live product specifications.
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 500);
          };
        </script>
      </body>
      </html>
    `;
    
    iframeDoc.open();
    iframeDoc.write(htmlContent);
    iframeDoc.close();
    
    // Clean up iframe after printing dialog closes
    setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }, 15000);
  };

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <Head>
          <title>Product Not Found</title>
        </Head>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-[#00974A] hover:bg-[#00974A] text-white font-medium py-2 px-6 rounded-md transition duration-300"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} | Industrial Bearings</title>
        <meta name="description" content={product.description} />
      </Head>

      {/* Banner Video Section */}
      <div className="relative w-full h-[60vh] min-h-[460px] overflow-hidden bg-gray-900 md:h-[80vh]">
        {/* Fallback image in case video doesn't load */}
        <img
          src={bannerVideo.fallbackImage}
          alt="Industrial bearings"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />

        {/* Video element */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={bannerVideo.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay content */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
            >
              {bannerVideo.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-xl md:text-2xl text-white max-w-2xl mx-auto"
            >
              {bannerVideo.subtitle}
            </motion.p>
          </div>
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 sm:py-12 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.div variants={itemVariants} className="mb-6">
            <nav className="flex overflow-x-auto" aria-label="Breadcrumb">
              <ol className="flex min-w-0 items-center gap-2">
                <li>
                  <div className="flex items-center">
                    <Link
                      href="/products"
                      className="whitespace-nowrap text-sm sm:text-lg font-medium text-gray-500 hover:text-[#00974A]"
                    >
                      Products
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center"></div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-2 text-sm sm:text-lg font-medium text-[#00974A]">
                      {product.name}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </motion.div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Product Image */}
            <motion.div variants={itemVariants} className="mb-8 lg:mb-0">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={product.image.startsWith("http") ? product.image : `http://localhost:5001${product.image}`}
                  alt={product.name}
                  className="w-full h-auto object-cover transition duration-500 hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Product Info */}
            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
                  {product.name}
                </h1>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div
                  className="text-base sm:text-lg text-gray-600 tiptap-editor-content"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </motion.div>

              {/* Features */}
              {product.features && (
                <motion.div
                  variants={itemVariants}
                  className="bg-white p-5 sm:p-6 rounded-lg shadow-sm border border-gray-100"
                >
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Key Features
                  </h2>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="flex-shrink-0 h-5 w-5 text-[#00974A] mt-0.5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="ml-2 text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Specifications */}
              {product.specifications && (
                <motion.div
                  variants={itemVariants}
                  className="bg-white p-5 sm:p-6 rounded-lg shadow-sm border border-gray-100"
                >
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Technical Specifications
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <tbody className="bg-white divide-y divide-gray-200">
                        {Object.entries(product.specifications).map(
                          ([key, value], index) => (
                            <tr key={index}>
                              <td className="px-3 py-3 text-sm sm:px-4 sm:text-lg font-medium text-gray-700 bg-gray-50">
                                {key}
                              </td>
                              <td className="px-3 py-3 text-sm sm:px-4 sm:text-lg text-gray-600">
                                {value}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="flex-1 bg-[#00974A] hover:bg-[#00974A] text-white font-medium py-3 px-6 rounded-md transition duration-300 shadow-md hover:shadow-lg"
                >
                  Request Quote
                </button>
                <button
                  onClick={handleDownloadCatalog}
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-md transition duration-300 border border-gray-300 shadow-sm hover:shadow-md"
                >
                  Download Catalog
                </button>
              </motion.div>
            </div>
          </div>

          {/* Related Products Section */}
          <motion.div variants={itemVariants} className="mt-16">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((prod, index) => (
                <motion.div
                  key={prod._id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition duration-300"
                >
                  <a href={`/products/${prod.slug}`} className="block">
                    <img
                      src={
                        prod.image.startsWith("http")
                          ? prod.image
                          : `http://localhost:5001${prod.image}`
                      }
                      alt={prod.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {prod.name}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-lg line-clamp-2">
                        {prod.description}
                      </p>
                      <div className="mt-4 text-[#00974A] font-medium text-sm sm:text-lg">
                        Learn more →
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* REQUEST QUOTE MODAL */}
      {isQuoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-xl max-w-lg w-full p-5 sm:p-8 border border-gray-200 text-gray-800">
            <button
              onClick={() => {
                setIsQuoteOpen(false);
                setQuoteSuccess(false);
                setQuoteError("");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold p-1"
            >
              ✕
            </button>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Request a Quote
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Please fill out the form below to receive a custom quote for <strong>{product.name}</strong>.
            </p>

            {quoteSuccess ? (
              <div className="bg-[#00974A]/10 border border-[#00974A] text-[#00974A] p-6 rounded-lg text-center">
                <span className="text-3xl">✓</span>
                <h4 className="font-bold text-lg mt-2 mb-1">Request Submitted!</h4>
                <p className="text-sm">We have received your request and will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                {quoteError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
                    {quoteError}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={quoteForm.name}
                    onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Requirements Detail
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={quoteForm.message}
                    onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={quoteSubmitting}
                  className="w-full py-3 bg-[#00974A] hover:bg-[#00974A] text-white font-semibold rounded-lg text-sm transition disabled:opacity-50"
                >
                  {quoteSubmitting ? "Submitting Request..." : "Submit Quote Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export async function getStaticPaths() {
  try {
    const res = await fetch("http://localhost:5001/api/products");
    const data = await res.json();
    const paths = (data.products || []).map((prod) => ({
      params: { slug: prod.slug },
    }));
    return { paths, fallback: "blocking" };
  } catch (err) {
    console.error("Error in getStaticPaths:", err);
    return { paths: [], fallback: "blocking" };
  }
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`http://localhost:5001/api/products/${params.slug}`);
    const data = await res.json();
    if (!data.success) {
      return { notFound: true };
    }

    const allRes = await fetch("http://localhost:5001/api/products");
    const allData = await allRes.json();
    const related = (allData.products || [])
      .filter((p) => p.slug !== params.slug)
      .slice(0, 3);

    return {
      props: {
        product: data.product,
        related,
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("Error in getStaticProps:", err);
    return { notFound: true };
  }
}
