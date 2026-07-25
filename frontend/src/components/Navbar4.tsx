// @ts-nocheck
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChevronDown, FileText, Menu, Search, X } from "lucide-react";
import {
  FaFacebookF,
  FaGooglePlusG,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { apiGet } from "@/utils/api";

const brandGreen = "#00974A";
const brandBlack = "#020617";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "Industries", href: "/industries" },
  { label: "Services", href: "/services" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
];

const products = [
  "Spherical Roller Bearings",
  "Taper Roller Bearings",
  "Thrust Bearings",
];

const productRangeFallback = [
  {
    name: "Spherical Roller Bearings",
    slug: "spherical-roller-bearings",
    image: "/image/product-slider-img/shperical-newone.png",
  },
  {
    name: "Taper Roller Bearings",
    slug: "taper-roller-bearings",
    image:
      "https://t3.ftcdn.net/jpg/14/85/56/42/240_F_1485564273_CGlyVvIj9lZwjMuBaM0zSSgLl7ePYNjF.jpg",
  },
  {
    name: "Thrust Bearings",
    slug: "thrust-bearings",
    image:
      "https://t3.ftcdn.net/jpg/13/98/64/88/240_F_1398648863_FeFguQFsVwSbpD0p9ArojKMILj4zOCtC.jpg",
  },
  {
    name: "Multi Row Bearings",
    slug: "multi-row-bearings",
    image: "https://www.krw.de/fileadmin/_processed_/0/f/csm_Mehrreihig_Kerola_201910_5f327d1bda.png",
  },
  {
    name: "Pillow Block Bearing",
    slug: "pillow-block-bearing",
    image: "/image/product-slider-img/pillow-block-bearing.png",
  },
  {
    name: "Plummer Blocks",
    slug: "plummer-blocks",
    image: "/image/product-slider-img/Plummer-Blocks.png",
  },
  {
    name: "Roller Chains",
    slug: "roller-chains",
    image: "/image/product-slider-img/Roller-Chains.png",
  },
];

const getProductImage = (image) => {
  if (!image) return "/image/product-slider-img/shperical-newone.png";
  if (image.startsWith("http") || image.startsWith("/image/")) return image;
  return `http://localhost:5001${image}`;
};

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [productRange, setProductRange] = useState(productRangeFallback);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    message: "",
  });

  const currentPath = (router.asPath || router.pathname || "/").split("?")[0].split("#")[0];

  const isNavItemActive = useCallback((href) => {
    if (href === "/") return currentPath === "/";
    return currentPath === href || currentPath.startsWith(`${href}/`);
  }, [currentPath]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiGet("/products");
        setProductRange(data.products?.length ? data.products : productRangeFallback);
      } catch (error) {
        console.error("Failed to fetch navbar products:", error);
        setProductRange(productRangeFallback);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (isMenuOpen || isQuoteFormOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isQuoteFormOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      setIsMobileProductsOpen(isNavItemActive("/products"));
    }
  }, [isMenuOpen, currentPath, isNavItemActive]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s]+$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!formData.product) errors.product = "Please select a product";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5001/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "general_website",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Product: ${formData.product}\nMessage: ${formData.message}`,
        }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to submit form");
      toast.success("Quote submitted successfully! We'll contact you soon.");
      setFormData({ name: "", email: "", phone: "", product: "", message: "" });
      setIsQuoteFormOpen(false);
    } catch (error) {
      toast.error(error.message || "Failed to submit quote. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-40">
        <div
          className={`mx-auto hidden max-w-[1200px] items-center justify-between overflow-hidden px-4 text-sm transition-all duration-300 md:flex ${
            isScrolled
              ? "h-0 -translate-y-full opacity-0"
              : "h-12 translate-y-0 opacity-100"
          }`}
          style={{ color: brandBlack }}
        >
          <div className="flex items-center">
            <Link
              href="/gallery"
              className="whitespace-nowrap px-4 font-medium hover:opacity-75"
            >
              Gallery
            </Link>
            <Link
              href="/privacy-policy"
              className="whitespace-nowrap border-l px-4 font-medium hover:opacity-75"
              style={{ borderColor: "#d1d5db" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="whitespace-nowrap border-l px-4 font-medium hover:opacity-75"
              style={{ borderColor: "#d1d5db" }}
            >
              Help Desk
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <FaFacebookF />
            {/* <FaGooglePlusG /> */}
            {/* <FaTwitter /> */}
            {/* <FaInstagram /> */}
            <FaLinkedinIn />
            {/* <FaYoutube /> */}
          </div>
        </div>

        <div
          className={`mx-auto max-w-[1200px] px-3 transition-all duration-300 md:px-4 ${
            isScrolled ? "md:px-0" : ""
          }`}
        >
          <div
            className={`flex h-[70px] items-center bg-white transition-shadow duration-300 ${
              isScrolled ? "shadow-lg" : "shadow-sm"
            }`}
          >
            <Link
              href="/"
              className="flex h-full w-[180px] shrink-0 items-center px-4 sm:w-[210px] sm:px-6 xl:w-[235px]"
            >
              <Image
                src="/sro-newlogo.png"
                alt="SRO Bearings Logo"
                width={160}
                height={70}
                className="h-auto w-[130px] object-contain sm:w-[150px]"
                priority
              />
            </Link>

            <nav className="hidden h-full min-w-0 flex-1 items-center justify-center xl:flex">
              {navItems.map((item) =>
                item.label === "Products" ? (
                  <div key={item.label} className="group relative flex h-full items-center">
                    <Link
                      href={item.href}
                      className={`relative flex h-full items-center gap-1 whitespace-nowrap px-2.5 text-xs font-semibold uppercase transition hover:opacity-75 2xl:px-3 2xl:text-sm ${
                        isNavItemActive(item.href)
                          ? "after:absolute after:bottom-0 after:left-3 after:right-3 after:h-1 after:bg-[#00974A] after:content-['']"
                          : ""
                      }`}
                      style={{ color: brandBlack }}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        strokeWidth={3}
                        className="transition-transform duration-200 group-hover:rotate-180"
                      />
                    </Link>

                    <div className="invisible absolute left-1/2 top-full w-[760px] -translate-x-1/2 translate-y-3 border-t-4 border-[#00974A] bg-white p-6 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <Link
                        href="/products"
                        className="mb-3 block border-b border-slate-100 pb-3 text-xs font-bold uppercase tracking-[0.12em] hover:opacity-75"
                        style={{ color: brandBlack }}
                      >
                        All Products
                      </Link>
                      {productRange.length > 0 ? (
                        <div className="grid grid-cols-3 gap-4">
                        {productRange.map((product) => (
                          <Link
                            key={product._id || product.slug || product.name}
                            href={`/products/${product.slug}`}
                            className="flex items-center gap-3 border border-slate-100 bg-white p-3 transition hover:border-[#00974A] hover:shadow-sm"
                            style={{ color: brandBlack }}
                          >
                            <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden bg-slate-50">
                              <img
                                src={getProductImage(product.image)}
                                alt={product.name}
                                className="h-full w-full object-contain"
                                loading="lazy"
                              />
                            </span>
                            <span className="text-sm font-bold leading-snug">
                              {product.name}
                            </span>
                          </Link>
                        ))}
                        </div>
                      ) : (
                        <span className="block px-2 py-3 text-sm font-semibold text-slate-500">
                          Products loading...
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative flex h-full items-center gap-1 whitespace-nowrap px-2.5 text-xs font-semibold uppercase transition hover:opacity-75 2xl:px-3 2xl:text-sm ${
                      isNavItemActive(item.href)
                        ? "after:absolute after:bottom-0 after:left-3 after:right-3 after:h-1 after:bg-[#00974A] after:content-['']"
                        : ""
                    }`}
                    style={{ color: brandBlack }}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown size={14} strokeWidth={3} />
                    )}
                  </Link>
                )
              )}
            </nav>

            <button
              type="button"
              onClick={() => setIsQuoteFormOpen(true)}
              className="ml-auto hidden h-full min-w-[145px] px-6 text-sm font-extrabold uppercase text-white transition hover:opacity-90 xl:block"
              style={{
                backgroundColor: brandGreen,
                clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0 100%)",
              }}
            >
              Get a Quote
            </button>

            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="ml-auto mr-3 grid h-11 w-11 place-items-center xl:hidden"
              style={{ color: brandBlack }}
              aria-label="Open menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      {isQuoteFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            onClick={() => setIsQuoteFormOpen(false)}
            aria-label="Close quote form"
            type="button"
          />

          <div className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <h3 className="text-lg font-bold" style={{ color: brandGreen }}>
                Get a Quote
              </h3>
              <button
                onClick={() => setIsQuoteFormOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-md hover:bg-slate-100"
                aria-label="Close quote form"
                type="button"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              {["name", "email", "phone"].map((field) => (
                <div key={field}>
                  <label
                    className="block text-xs font-bold uppercase"
                    style={{ color: brandBlack }}
                  >
                    {field}
                  </label>
                  <input
                    name={field}
                    value={formData[field]}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded border px-3 py-2 text-sm outline-none"
                    style={{ borderColor: brandGreen }}
                  />
                  {formErrors[field] && (
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors[field]}
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label
                  className="block text-xs font-bold uppercase"
                  style={{ color: brandBlack }}
                >
                  Product
                </label>
                <select
                  name="product"
                  value={formData.product}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded border px-3 py-2 text-sm outline-none"
                  style={{ borderColor: brandGreen }}
                >
                  <option value="">Select product</option>
                  {products.map((product) => (
                    <option key={product} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
                {formErrors.product && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.product}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-xs font-bold uppercase"
                  style={{ color: brandBlack }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  rows={3}
                  className="mt-1 block w-full rounded border px-3 py-2 text-sm outline-none"
                  style={{ borderColor: brandGreen }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-5 py-3 text-sm font-bold uppercase text-white transition hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: brandGreen }}
              >
                {isSubmitting ? "Sending..." : "Send Quote"}
              </button>
            </form>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <button
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            type="button"
          />

          <aside className="relative h-full w-[320px] max-w-[86vw] overflow-y-auto bg-white shadow-2xl">
            <div className="flex h-[70px] items-center justify-between border-b border-slate-100 px-5">
              <Image
                src="/sro-newlogo.png"
                alt="SRO Bearings Logo"
                width={140}
                height={60}
                className="h-auto w-[130px] object-contain"
              />
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="grid h-10 w-10 place-items-center"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="border-b border-slate-100 p-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: brandBlack }}
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded border py-2 pl-10 pr-3 text-sm outline-none"
                  style={{ borderColor: brandGreen }}
                />
              </div>
            </div>

            <nav className="py-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.label === "Products" ? (
                    <button
                      type="button"
                      onClick={() =>
                        setIsMobileProductsOpen((current) => !current)
                      }
                      className="flex w-full items-center justify-between px-5 py-3 text-left text-sm font-bold uppercase hover:opacity-75"
                      style={{ color: brandBlack }}
                      aria-expanded={isMobileProductsOpen}
                    >
                      {item.label}
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-200 ${
                          isMobileProductsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between px-5 py-3 text-sm font-bold uppercase hover:opacity-75"
                      style={{ color: brandBlack }}
                    >
                      {item.label}
                    </Link>
                  )}

                  {item.label === "Products" && isMobileProductsOpen && (
                    <div className="border-y border-slate-100 bg-slate-50 py-2">
                      <Link
                        href="/products"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-8 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-[#00974A] hover:opacity-75"
                      >
                        All Products
                      </Link>
                      {productRange.map((product) => (
                        <Link
                          key={product._id || product.slug || product.name}
                          href={`/products/${product.slug}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 px-8 py-2.5 text-sm font-semibold hover:opacity-75"
                          style={{ color: brandBlack }}
                        >
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden bg-white">
                            <img
                              src={getProductImage(product.image)}
                              alt={product.name}
                              className="h-full w-full object-contain"
                              loading="lazy"
                            />
                          </span>
                          {product.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="p-5">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsQuoteFormOpen(true);
                }}
                className="flex w-full items-center justify-center px-4 py-3 text-sm font-bold uppercase text-white"
                style={{ backgroundColor: brandGreen }}
                type="button"
              >
                <FileText size={16} className="mr-2" /> Get a Quote
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Navbar;
