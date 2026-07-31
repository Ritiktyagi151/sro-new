// @ts-nocheck
import Image from "next/image";
import Link from "next/link";
import {
  Link as LinkIcon,
  Settings,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-gray-800 bg-cover bg-center bg-no-repeat text-[#00974A]"
      style={{ backgroundImage: "url('/image/srofooter.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #00974A 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #00974A 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-2 space-y-6 lg:col-span-1">
            <div className="mb-4">
              <Link href="/" className="inline-flex items-center">
                <Image
                  src="/sro-newlogo.png"
                  alt="SRO Bearings"
                  width={150}
                  height={60}
                  className="h-14 w-auto object-contain"
                />
              </Link>
            </div>
              <p className="text-gray-200 leading-relaxed text-sm lg:text-base">
              SRO Bearings understands the critical role bearings play in
              ensuring seamless operations across various industries with our
              unwavering focus on quality.
            </p>
            <p className="text-gray-200 leading-relaxed text-sm lg:text-base">
              Our commitment to excellence drives us to deliver high-performance
              bearings that meet the diverse needs of our clients, ensuring
              reliability and efficiency in every application.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center text-[#00974A] hover:text-[#00974A] font-medium text-sm transition-all duration-300 group lg:text-base"
            >
              Learn More
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-gray-400 to-[#00974A] rounded-full flex items-center justify-center">
                <LinkIcon className="text-gray-600 w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <h3 className="text-base font-semibold text-[#00974A] sm:text-xl">
                Quick Links
              </h3>
            </div>
            <nav className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Industries", href: "/industries" },
                { name: "Services", href: "/services" },
                { name: "Careers", href: "/careers" },
                { name: "Gallery", href: "/gallery" },
                { name: "Blogs", href: "/blogs" },
                { name: "Contact", href: "/contact" },
              ].map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-200 hover:text-[#00974A] transition-colors duration-300 text-sm py-1 hover:pl-2 transition-all lg:text-base"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Products */}
          <div className="space-y-5">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-gray-400 to-[#00974A] rounded-full flex items-center justify-center">
                <Settings className="text-gray-600 w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <h3 className="text-base font-semibold text-[#00974A] sm:text-xl">
                Our Products
              </h3>
            </div>
            <nav className="space-y-2 ">
              {[
                "Spherical Roller Bearings",
                "Taper Roller Bearings",
                "Thrust Bearings",
                "Multi Row Bearings",
                "Pillow Block Bearing",
                "Plummer Blocks",
                "Roller Chains",
              ].map((product, index) => (
                <Link
                  key={product}
                  href={`/products/${product
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z-]/g, "")}`}
                  className="block text-gray-200 hover:text-[#00974A] transition-colors duration-300 text-sm py-1 hover:pl-2 transition-all lg:text-base"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {product}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 space-y-6 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-[#00974A] rounded-full flex items-center justify-center">
                <Mail className="text-gray-600 w-4 h-4" />
              </div>
              <h3 className="text-xl font-semibold text-[#00974A]">
                Get In Touch
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="mt-1 text-gray-200 group-hover:text-gray-300 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>

                <p className="text-gray-200 text-sm leading-relaxed lg:text-base">
                  <span className="font-semibold">SRO Bearings</span> Marketing
                  office :
                  <br />
                  91, Mausam Vihar, Near Preeti Vihar Metro
                  <br />
                  Station, Delhi-110051, INDIA.
                </p>
              </div>

              <div className="flex items-center space-x-3 group">
                <div className="text-gray-200 group-hover:text-gray-300 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <a
                  href="tel:+919873334405"
                  className="text-gray-200 hover:text-gray-400 transition-colors text-sm lg:text-base"
                >
                  +91 - 9873334405
                </a>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-3 group">
                  <div className="text-gray-200 group-hover:text-gray-300 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a
                    href="mailto:srobearings@outlook.com"
                    className="text-gray-200 hover:text-gray-400 transition-colors text-sm lg:text-base"
                  >
                    srobearings@outlook.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="text-gray-200 group-hover:text-gray-300 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a
                    href="mailto:srobearings@outlook.com"
                    className="text-gray-200 hover:text-gray-400 transition-colors text-sm lg:text-base"
                  >
                    info@srobearings.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center ">
          <h4 className="text-lg font-semibold mb-4 text-gray-200">
            Follow Us
          </h4>
          <div className="flex justify-center space-x-4">
            {[
              {
                icon: FaFacebookF,
                href: "https://www.facebook.com/profile.php?id=61578079778501",
                label: "Facebook",
                className: "bg-[#1877F2] text-white hover:bg-[#166FE5]",
              },

              {
                icon: FaLinkedinIn,
                href: "https://www.linkedin.com/company/srobharat/?originalSubdomain=io",
                label: "LinkedIn",
                className: "bg-[#0A66C2] text-white hover:bg-[#0958A8]",
              },
              // { icon: Instagram, href: "#" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.className}`}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/15 bg-gray-900/85">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-200 text-sm lg:text-base">
              © {new Date().getFullYear()} SRO Bearing. All rights reserved.
            </p>
            <p className="text-gray-300 text-sm lg:text-base">
              Design and Developed By{" "}
              <Link
                href="https://jaikvik.com/"
                className="text-[#00974A] hover:text-[#00974A] transition-colors duration-300 font-medium"
              >
                Jaikvik Technology India Pvt Ltd
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
