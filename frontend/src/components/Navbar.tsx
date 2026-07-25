// @ts-nocheck
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Menu, Search, X, ChevronDown, FileText } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openCategory, setOpenCategory] = useState(null);
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    message: "",
  });

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect to handle body overflow when menu or modal is open
  useEffect(() => {
    if (isMenuOpen || isQuoteFormOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isMenuOpen, isQuoteFormOpen]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Product", href: "/products" },
    { label: "Industries", href: "/industries" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "/contact" },
  ];

  const productCategories = [
    {
      name: "Bearings",
      icon: <ChevronDown size={16} />,
      subcategories: [
        {
          label: "Spherical Roller Bearings",
          href: "/products/spherical-roller-bearings",
        },
        {
          label: "Taper Roller Bearings",
          href: "/products/taper-roller-bearings",
        },
        { label: "Thrust Bearings", href: "/products/thrust-bearings" },
        { label: "Multi Row Bearings", href: "/products/multi-row-bearings" },
        {
          label: "Pillow Block Bearing",
          href: "/products/pillow-block-bearing",
        },
        { label: "Plummer Blocks", href: "/products/plummer-blocks" },
        { label: "Roller Chains", href: "/products/roller-chains" },
      ],
    },
  ];

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^[0-9+\-\s]+$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    if (!formData.product) {
      errors.product = "Please select a product";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/info@srobearings.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...formData,
            _subject: `New Quote Request for ${formData.product}`,
            _template: "table",
            _autoresponse: `Thank you for your quote request regarding ${formData.product}. We'll contact you within 24 hours.`,
            _captcha: "false",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit form");
      }

      toast.success("Quote submitted successfully! We'll contact you soon.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        product: "",
        message: "",
      });
      setIsQuoteFormOpen(false);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error.message || "Failed to submit quote. Please try again.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header
        className={`w-full fixed top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white backdrop-blur-sm shadow-md border-b border-gray-100"
            : "bg-white"
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Navbar */}
          <div className="relative flex h-20 items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center space-x-6">
              <button
                className={`p-2 rounded-lg transition-colors ${
                  isScrolled ? "hover:bg-gray-100" : "hover:bg-white/20"
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X
                    size={24}
                    className={isScrolled ? "text-gray-700" : "text-white"}
                  />
                ) : (
                  <Menu
                    size={24}
                    className={isScrolled ? "text-gray-700" : "text-white"}
                  />
                )}
              </button>

              <Link
                href="/products"
                className={`hidden md:inline-block text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-gray-600"
                    : "text-white/90 hover:text-white"
                }`}
              >
                Products
              </Link>

              <Link
                href="/services"
                className={`hidden md:inline-block text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-gray-600"
                    : "text-white/90 hover:text-white"
                }`}
              >
                Services
              </Link>
              <Link
                href="/about"
                className={`hidden md:inline-block text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white/90 hover:text-white"
                }`}
              >
                About
              </Link>
            </div>

            {/* Center - Logo */}
            <div className="absolute transform left-[17px] lg:left-[60px] w-[120px] h-[60px] relative">
              <Link href="/">
                <Image
                  src="/sro-newlogo.png"
                  alt="SRO Bearings Logo"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 120px, 160px"
                />
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              {/* Desktop Search */}
              {!isMenuOpen && (
                <div className="relative hidden md:block">
                  <Search
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      isScrolled ? "text-gray-400" : "text-white/80"
                    }`}
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 w-48 lg:w-64 rounded-lg text-sm py-2 px-3 outline-none transition ${
                      isScrolled
                        ? "bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                        : "bg-white/20 border border-white/30 focus:bg-white/30 focus:ring-2 focus:ring-white/50 text-white placeholder-white/70"
                    }`}
                  />
                </div>
              )}

              <button
                className={`hidden md:inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  isScrolled
                    ? "bg-gray-600 text-white hover:bg-gray-700 shadow-md"
                    : "bg-gray-100 text-gray-900 hover:bg-white/90 shadow-lg"
                }`}
                onClick={() => {
                  console.log(
                    "Opening Quote Form, isQuoteFormOpen:",
                    isQuoteFormOpen
                  );
                  setIsQuoteFormOpen(true);
                }}
              >
                Get a Quote
              </button>

              <button
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-gray-600 hover:bg-gray-100"
                    : "text-white hover:bg-white/20"
                }`}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Sidebar */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-40 flex">
              <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={() => setIsMenuOpen(false)}
              ></div>
              <div className="relative bg-gray-100 w-full max-w-xs h-full overflow-y-auto shadow-xl">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <Link href="/" className="text-xl font-bold text-gray-900">
                    SRO
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>

                <div className="p-4 border-b border-gray-200">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full bg-gray-50 border border-gray-200 rounded-lg text-sm py-2.5 px-3 outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    />
                  </div>
                </div>

                <nav className="divide-y divide-gray-100">
                  <div className="py-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center py-3 px-4 text-gray-700 hover:text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="py-2">
                    <h3 className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Product Categories
                    </h3>
                    {productCategories.map((category) => (
                      <div key={category.name}>
                        <button
                          className="flex items-center justify-between w-full py-3 px-4 text-left text-sm font-medium text-gray-700 hover:text-gray-600 hover:bg-gray-50"
                          onClick={() => toggleCategory(category.name)}
                        >
                          <span>{category.name}</span>
                          <span
                            className={`transition-transform duration-200 ${
                              openCategory === category.name ? "rotate-180" : ""
                            }`}
                          >
                            {category.icon}
                          </span>
                        </button>

                        {openCategory === category.name && (
                          <div className="bg-gray-50 pl-6">
                            {category.subcategories.map((subcategory) => (
                              <Link
                                key={subcategory.label}
                                href={subcategory.href}
                                className="flex items-center py-2.5 px-4 text-sm text-gray-600 hover:text-gray-600 hover:bg-gray-100"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subcategory.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </nav>

                <div className="p-4 border-t border-gray-200 mt-auto">
                  <button
                    onClick={() => {
                      console.log(
                        "Mobile Quote Form, isQuoteFormOpen:",
                        isQuoteFormOpen
                      );
                      setIsMenuOpen(false);
                      setIsQuoteFormOpen(true);
                    }}
                    className="w-full flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition shadow-md"
                  >
                    <FileText size={16} className="mr-2" />
                    Get a Quote
                  </button>

                  <div className="mt-6 text-xs text-gray-500 text-center">
                    <p>
                      © {new Date().getFullYear()} SRO Group. All rights
                      reserved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Quote Form Modal */}
      {isQuoteFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-[100]"
            onClick={() => setIsQuoteFormOpen(false)}
          ></div>

          <div className="relative bg-gray-100 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto z-[100]">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Request a Quote
                </h3>
                <button
                  onClick={() => setIsQuoteFormOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className={`w-full px-3 py-2.5 border ${
                        formErrors.name ? "border-red-500" : "border-gray-300"
                      } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500`}
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className={`w-full px-3 py-2.5 border ${
                        formErrors.email ? "border-red-500" : "border-gray-300"
                      } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500`}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                      className={`w-full px-3 py-2.5 border ${
                        formErrors.phone ? "border-red-500" : "border-gray-300"
                      } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500`}
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="product"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Product of Interest *
                    </label>
                    <select
                      id="product"
                      name="product"
                      value={formData.product}
                      onChange={handleFormChange}
                      className={`w-full px-3 py-2.5 border ${
                        formErrors.product
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500`}
                      required
                    >
                      <option value="">Select a product</option>
                      {productCategories[0].subcategories.map((subcategory) => (
                        <option
                          key={subcategory.label}
                          value={subcategory.label}
                        >
                          {subcategory.label}
                        </option>
                      ))}
                    </select>
                    {formErrors.product && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.product}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Additional Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    ></textarea>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
