// @ts-nocheck
// components/SROBearingsSection.jsx
import Image from "next/image";
import { Factory, MapPin, PackageCheck, ShieldCheck } from "lucide-react";

const companyDetails = [
  {
    icon: Factory,
    label: "Industrial Focus",
    value: "Bearing solutions for heavy-duty applications",
  },
  {
    icon: PackageCheck,
    label: "Product Range",
    value: "Bearings, plummer blocks, pillow blocks and roller chains",
  },
  {
    icon: MapPin,
    label: "Marketing Office",
    value: "Delhi, India",
  },
];

const SROBearingsSection = ({ about = {} }) => {
  return (
    <div>
      <div className="h-[85px] w-full bg-gray-600"></div>
      <section className="w-full bg-gray-100 px-4 py-12 sm:px-6 md:px-12 md:py-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Text Section - updated to match SKF style */}
          <div className="w-full lg:w-1/2">
            <p className="text-sm text-[#00974A] font-semibold mb-4">
              About SRO Bearings
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#00974A] leading-tight tracking-tight">
              {about.greetingsTitle || (
                <>
                  Trusted bearing
                  <br />
                  partner for
                  <br />
                  industrial motion
                </>
              )}
            </h2>
            <div className="mt-6 sm:mt-8">
              <p className="text-gray-700 text-base sm:text-lg max-w-xl leading-8">
                {about.greetingsContent ||
                  "SRO Bearings supplies reliable bearing products for industries where uptime, load capacity, and long service life matter. We support customers with a practical product range, application-focused selection, and quality-driven service."}
              </p>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {companyDetails.map((item) => (
                <div
                  key={item.label}
                  className="border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <item.icon className="h-6 w-6 text-[#00974A]" />
                  <p className="mt-3 text-[11px] font-black uppercase tracking-[0.16em] text-gray-500">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-5 text-gray-800">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 border-l-4 border-[#00974A] bg-white px-4 py-4 shadow-sm">
              <ShieldCheck className="mt-1 h-5 w-5 flex-shrink-0 text-[#00974A]" />
              <p className="text-sm font-medium leading-6 text-gray-700">
                Serving key sectors including steel, cement, automotive,
                mining, packaging, agriculture and material handling.
              </p>
            </div>
          </div>

          {/* Images Section */}
          <div className="w-full lg:w-1/2 relative flex justify-center items-center lg:top-10">
            {/* Front Image */}
            <div className="relative z-10 w-full max-w-[420px] lg:left-[-130px] lg:w-[50%]">
              <Image
                src="https://images.unsplash.com/photo-1732791547509-f257f062eeb4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVhcmluZ3xlbnwwfHwwfHx8MA%3D%3D"
                alt="Spherical roller bearing"
                width={600}
                height={400}
                className="rounded-md shadow-md w-full h-auto object-cover"
              />
            </div>

            {/* Back Image */}
            <div className="absolute top-[-40px] right-0 z-0 hidden w-[55%] md:block lg:right-[-50px] lg:w-[60%]">
              <Image
                src="https://images.unsplash.com/photo-1712045348056-773b912e8f7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVhcmluZ3N8ZW58MHx8MHx8fDA%3D"
                alt="Heavy machinery"
                width={800}
                height={600}
                className="rounded-md shadow-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SROBearingsSection;
