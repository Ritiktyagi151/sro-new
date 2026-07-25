// @ts-nocheck
import Head from "next/head";
import Link from "next/link";

const sections = [
  {
    title: "Information We Collect",
    body: [
      "We may collect your name, email address, phone number, company details, product requirements, and messages when you submit a contact form, enquiry form, quote request, or communicate with SRO Bearings.",
      "We may also collect basic technical information such as browser type, device information, IP address, and pages visited to improve website performance and security.",
    ],
  },
  {
    title: "How We Use Your Information",
    body: [
      "We use your information to respond to enquiries, process quote requests, provide product or service information, improve our website, maintain business records, and support customer communication.",
      "We do not sell your personal information. Your details are used only for legitimate business communication and service-related purposes.",
    ],
  },
  {
    title: "Data Sharing",
    body: [
      "We may share information with trusted service providers only when required to operate the website, manage enquiries, deliver services, or comply with applicable legal obligations.",
      "Any third party involved is expected to protect your information and use it only for the purpose for which it was shared.",
    ],
  },
  {
    title: "Cookies And Website Analytics",
    body: [
      "Our website may use cookies or similar technologies to improve browsing experience, understand visitor behavior, and keep the website reliable.",
      "You can control cookies through your browser settings, though some website features may not work as expected if cookies are disabled.",
    ],
  },
  {
    title: "Data Security",
    body: [
      "We use reasonable administrative and technical safeguards to protect submitted information from unauthorized access, misuse, alteration, or disclosure.",
      "No online transmission is completely secure, so we encourage users to avoid submitting highly sensitive information through general website forms.",
    ],
  },
  {
    title: "Your Choices",
    body: [
      "You may request access, correction, or deletion of your personal information by contacting us through the details available on our Contact page.",
      "You can also ask us to stop using your information for marketing or non-essential communication.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | SRO Bearings</title>
        <meta
          name="description"
          content="Read the SRO Bearings privacy policy and learn how we collect, use, protect, and manage website enquiry information."
        />
      </Head>

      <main className="bg-white text-slate-950">
        <section className="relative overflow-hidden bg-[#eef8f2] px-6 pb-16 pt-44 md:pt-52">
          <div className="absolute inset-x-0 top-0 h-1 bg-[#00974A]" />
          <div className="mx-auto max-w-[1100px]">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#00974A]">
              SRO Bearings
            </p>
            <h1 className="mt-4 text-4xl font-black uppercase leading-tight text-slate-950 sm:text-5xl md:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-700 md:text-lg">
              This Privacy Policy explains how SRO Bearings collects, uses, and protects information submitted through our website and customer enquiry channels.
            </p>
            <p className="mt-4 text-sm font-semibold text-slate-600">
              Last updated: July 22, 2026
            </p>
          </div>
        </section>

        <section className="px-6 py-14 md:py-20">
          <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[260px_1fr]">
            <aside className="h-fit border-l-4 border-[#00974A] bg-white p-5 shadow-sm">
              <h2 className="text-sm font-black uppercase tracking-[0.18em] text-slate-950">
                Quick Links
              </h2>
              <div className="mt-5 space-y-3 text-sm font-semibold text-slate-700">
                {sections.map((section) => (
                  <a
                    key={section.title}
                    href={`#${section.title.toLowerCase().replaceAll(" ", "-")}`}
                    className="block hover:text-[#00974A]"
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </aside>

            <div className="space-y-8">
              {sections.map((section) => (
                <article
                  key={section.title}
                  id={section.title.toLowerCase().replaceAll(" ", "-")}
                  className="border border-slate-100 bg-white p-6 shadow-sm md:p-8"
                >
                  <h2 className="text-2xl font-black text-slate-950">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}

              <article className="bg-[#00974A] p-6 text-white shadow-sm md:p-8">
                <h2 className="text-2xl font-black">Contact Us</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/90">
                  For privacy-related requests or questions, please contact our team through the website contact page.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-[#00974A] transition hover:opacity-90"
                >
                  Contact Us
                </Link>
              </article>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
