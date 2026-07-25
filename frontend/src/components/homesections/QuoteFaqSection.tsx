// @ts-nocheck
import { useState } from "react";
import { ArrowRight, HelpCircle, Plus, Send } from "lucide-react";
import { apiPost } from "@/utils/api";

const faqs = [
  {
    question: "Where are you located?",
    answer:
      "SRO Bearings operates from Delhi, India and supports customers across industrial markets through direct enquiry and dispatch coordination.",
  },
  {
    question: "What are your hours?",
    answer:
      "You can send a quote request anytime. Our team will review your requirement and respond during business hours.",
  },
  {
    question: "What is your shipping turnaround time?",
    answer:
      "Turnaround depends on product availability, quantity, destination, and application requirements. Share your part number or product details for a faster estimate.",
  },
  {
    question: "Can you support custom bearing requirements?",
    answer:
      "Yes. Share your drawing, sample details, dimensions, load condition, or machine application and our team will guide the next step.",
  },
  {
    question: "I need a quote. Who can I talk to?",
    answer:
      "Submit the form here or visit the contact page. Our team will connect with you for product details, pricing, and availability.",
  },
];

const initialForm = {
  name: "",
  email: "",
  company: "",
  message: "",
};

const inputClass =
  "h-10 w-full border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-950 outline-none placeholder:text-slate-400 focus:border-slate-950";

export default function QuoteFaqSection() {
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    setSubmitting(true);

    try {
      await apiPost("/enquiries", {
        formType: "general_website",
        name: form.name,
        email: form.email,
        phone: "",
        message: `Company: ${form.company}\nMessage: ${form.message}`,
      });
      setForm(initialForm);
      setStatus("Quote request sent successfully.");
    } catch (error) {
      setStatus(error.message || "Unable to send request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-green-50 to-white px-4 py-10 text-slate-950 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="bg-slate-950 p-5 text-white md:p-7">
          <div className="flex h-10 w-10 items-center justify-center border border-white/25">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div className="mt-5 border-b border-white/15 pb-4">
            <p className="border-l-4 border-[#00974A] pl-3 text-xs font-black uppercase tracking-[0.28em] text-white/55">
              Support Desk
            </p>
            <h2 className="mt-3 text-2xl font-sans font-bold uppercase leading-tight md:text-3xl">
              Before You Request
            </h2>
          </div>
          <p className="mt-4 max-w-xl text-sm font-medium leading-6 text-white/70">
            Quick answers for common quote, location, shipping, and custom
            bearing questions.
          </p>

          <div className="mt-6 divide-y divide-white/12 border-y border-white/12">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center gap-3 py-3.5 text-left text-xs font-black uppercase transition hover:text-white/70"
                  >
                    <Plus
                      className={`h-4 w-4 shrink-0 transition ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                    {faq.question}
                  </button>
                  {isOpen && (
                    <p className="pb-4 pl-7 text-sm font-medium leading-6 text-white/65">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        <div className="border border-slate-200 bg-white p-5 shadow-sm md:p-7">
          <div className="border-b border-slate-200 pb-4">
            <p className="border-l-4 border-[#00974A] pl-3 text-xs font-black uppercase tracking-[0.28em] text-slate-500">
              Enquiry Form
            </p>
            <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h2 className="text-2xl font-sans font-bold uppercase leading-tight md:text-3xl">
                Request A Quote
              </h2>
              <p className="max-w-sm text-sm font-semibold leading-6 text-slate-600">
                Share your bearing requirement, part number, or machine
                application. Our team will respond with the next step.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-black uppercase tracking-[0.12em]">
                  Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-black uppercase tracking-[0.12em]">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-[0.12em]">
                Company Name
              </label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company Name"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-[0.12em]">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Message"
                className="w-full resize-none border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-950 outline-none placeholder:text-slate-400 focus:border-slate-950"
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-fit items-center justify-center bg-slate-950 px-6 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-slate-800 disabled:opacity-60"
              >
                <Send className="mr-2 h-4 w-4" />
                {submitting ? "Sending" : "Send Request"}
              </button>

              <span className="inline-flex items-center text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                Response within business hours
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </div>

            {status && (
              <p className="border-l-4 border-[#00974A] bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
