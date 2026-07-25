// @ts-nocheck
import { useEffect, useState } from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";
import { Save, AlertCircle, Check, Phone, Mail, MapPin, Globe } from "lucide-react";
import { apiGet, apiPut } from "@/utils/api";

export default function AdminContactSettings() {
  const [contact, setContact] = useState({
    phone1: "",
    phone2: "",
    email: "",
    email2: "",
    whatsapp: "",
    address: "",
    facebook: "",
    linkedin: "",
    youtube: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await apiGet("/cms/contact");
        setContact(data.contact);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    try {
      const data = await apiPut("/cms/contact", contact);
      setContact(data.contact);
      setMessage({ type: "success", text: "Contact details updated successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-64 bg-white animate-pulse rounded-xl"></div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Head>
        <title>Contact Settings | SRO Admin</title>
      </Head>

      <div className="max-w-3xl mx-auto space-y-8 font-sans">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Info Details</h1>
          <p className="text-sm text-gray-650 mt-1">
            Update site-wide contact credentials, email address links, WhatsApp, and social profiles.
          </p>
        </div>

        {message.text && (
          <div
            className={`p-4 rounded-lg flex items-start gap-3 border text-sm ${
              message.type === "success"
                ? "bg-[#00974A]/15 border-[#00974A]/20 text-[#00974A]"
                : "bg-red-500/15 border-red-500/20 text-red-400"
            }`}
          >
            {message.type === "success" ? (
              <Check className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <div className="bg-white/40 border border-gray-200 rounded-xl p-8 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone & Whatsapp */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#00974A]" />
                Phone & Instant Messaging
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-650">Primary Phone</label>
                  <input
                    type="text"
                    value={contact.phone1 || ""}
                    onChange={(e) => setContact({ ...contact, phone1: e.target.value })}
                    className="mt-1.5 block w-full p-2.5 bg-white border border-gray-200 rounded-lg text-gray-955 text-sm"
                    placeholder="+91-..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-650">Secondary Phone</label>
                  <input
                    type="text"
                    value={contact.phone2 || ""}
                    onChange={(e) => setContact({ ...contact, phone2: e.target.value })}
                    className="mt-1.5 block w-full p-2.5 bg-white border border-gray-200 rounded-lg text-gray-955 text-sm"
                    placeholder="+91-..."
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-650">WhatsApp Contact Number</label>
                  <input
                    type="text"
                    value={contact.whatsapp || ""}
                    onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                    className="mt-1.5 block w-full p-2.5 bg-white border border-gray-200 rounded-lg text-gray-955 text-sm"
                    placeholder="+91..."
                  />
                </div>
              </div>
            </div>

            {/* Email Addresses */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#00974A]" />
                Email Settings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-650">Primary Email</label>
                  <input
                    type="email"
                    value={contact.email || ""}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className="mt-1.5 block w-full p-2.5 bg-white border border-gray-200 rounded-lg text-gray-955 text-sm"
                    placeholder="email@..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-650">Alternative Email</label>
                  <input
                    type="email"
                    value={contact.email2 || ""}
                    onChange={(e) => setContact({ ...contact, email2: e.target.value })}
                    className="mt-1.5 block w-full p-2.5 bg-white border border-gray-200 rounded-lg text-gray-955 text-sm"
                    placeholder="email2@..."
                  />
                </div>
              </div>
            </div>

            {/* Office Address */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#00974A]" />
                Office Locations & Addresses
              </h3>
              <div>
                <label className="block text-xs font-semibold text-gray-650">Postal Address</label>
                <textarea
                  value={contact.address || ""}
                  onChange={(e) => setContact({ ...contact, address: e.target.value })}
                  rows="3"
                  className="mt-1.5 block w-full p-2.5 bg-white border border-gray-200 rounded-lg text-gray-955 text-sm leading-relaxed"
                  placeholder="Official office street address..."
                />
              </div>
            </div>

            {/* Social Media Links */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#00974A]" />
                Social Profiles Links
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-650">Facebook URL</label>
                  <input
                    type="text"
                    value={contact.facebook || ""}
                    onChange={(e) => setContact({ ...contact, facebook: e.target.value })}
                    className="mt-1.5 block w-full p-2.5 bg-white border border-gray-200 rounded-lg text-gray-955 text-sm"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-650">LinkedIn URL</label>
                  <input
                    type="text"
                    value={contact.linkedin || ""}
                    onChange={(e) => setContact({ ...contact, linkedin: e.target.value })}
                    className="mt-1.5 block w-full p-2.5 bg-white border border-gray-200 rounded-lg text-gray-955 text-sm"
                    placeholder="https://linkedin.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-650">YouTube Channel URL</label>
                  <input
                    type="text"
                    value={contact.youtube || ""}
                    onChange={(e) => setContact({ ...contact, youtube: e.target.value })}
                    className="mt-1.5 block w-full p-2.5 bg-white border border-gray-200 rounded-lg text-gray-955 text-sm"
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-gray-900 bg-[#00974A] hover:bg-[#00974A] transition-all"
              >
                <Save className="w-4 h-4" />
                Save Contact Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
