// @ts-nocheck
import React from "react";
import Image from "next/image"; // If using Next.js Image component

const CodeOfConduct = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Title Section */}
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          The SRO Code of Conduct outlines our most fundamental
          responsibilities.
        </h1>
      </div>

      {/* Grid Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Section 01 */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-start mb-6">
            <span className="text-5xl font-bold text-gray-300 mr-4">01</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              Responsibility towards customers, distribution and suppliers
            </h2>
          </div>
          <p className="text-gray-600">
            In further detail we obtained substantial staff in the Group when we
            are not actively participating in the work we operate. We have the
            business partners and employees fairly agree with respect, as well
            as adequate for a time and fair market.
          </p>
        </div>

        {/* Section 02 */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-start mb-6">
            <span className="text-5xl font-bold text-gray-300 mr-4">02</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              Responsibility towards employees
            </h2>
          </div>
          <p className="text-gray-600">
            We provide teams to develop and simplify our environment, where
            health and safety, wellbeing, and employee compliance are
            prioritised. Our employees are given equal opportunities to develop
            more skills and qualifications, such as the full of expertise.
          </p>
        </div>

        {/* Section 03 */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-start mb-6">
            <span className="text-5xl font-bold text-gray-300 mr-4">03</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              Responsibility towards security and key components
            </h2>
          </div>
          <p className="text-gray-600">
            Our people and environmental responsibility is based on an ethical
            way of daily deadlines, which ensures privacy protects human
            continuing to use local communities in which we operate, and to give
            real best of personal and patient care.
          </p>
        </div>

        {/* Section 04 */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-start mb-6">
            <span className="text-5xl font-bold text-gray-300 mr-4">04</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              Responsibility towards shareholders
            </h2>
          </div>
          <p className="text-gray-600">
            The National or our shareholders will contribute to the decisions
            made throughout the business. We strive to understand and improve
            right-of-use for our stakeholders, while promoting high customer
            standards for people and the planet.
          </p>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-gray-500 mb-16">On Code of Conduct</div>

      {/* History Section with Image */}
      <div className="border-t pt-12">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">
              History of relation
            </h3>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              A century of rotation
            </h2>
            <p className="text-gray-600 mb-8">
              For years, SRO can take a full of efforts to handle higher
              hurdles. Over the years, this has been very important and could
              lead to a crucial progress everywhere.
            </p>
            <h4 className="text-lg font-semibold text-gray-700">
              Custom consistency
            </h4>
          </div>

          <div className="md:w-1/2">
            <div className="bg-gray-200 rounded-lg overflow-hidden h-64 md:h-80 w-full">
              {/* You can uncomment this if using the Next.js Image component */}
              {/* <Image 
                src="/path-to-your-image.jpg" 
                alt="SRO History"
                width={500}
                height={400}
                className="object-cover w-full h-full"
              /> */}

              {/* Fallback img tag */}
              <img
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="SRO History"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeOfConduct;
