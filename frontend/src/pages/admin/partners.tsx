// @ts-nocheck
import { useEffect, useState } from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";
import { Save, Check, AlertCircle, Plus, Trash2, Edit2, Users, X } from "lucide-react";
import { apiGet, apiPut } from "@/utils/api";

export default function AdminPartners() {
  const [partnerData, setPartnerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [isEditingClient, setIsEditingClient] = useState(false);
  const [clientFormIndex, setClientFormIndex] = useState(-1);
  const [clientForm, setClientForm] = useState({
    name: "",
    logo: "",
    image: "",
    color: "from-gray-500 to-gray-600",
  });
  const [showClientForm, setShowClientForm] = useState(false);

  const fetchPartners = async () => {
    try {
      const data = await apiGet("/cms/partners");
      setPartnerData(data.partner);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleTextChange = (field, val) => {
    if (!partnerData) return;
    setPartnerData({
      ...partnerData,
      [field]: val,
    });
  };

  const handleOpenAddClient = () => {
    setClientForm({
      name: "",
      logo: "",
      image: "",
      color: "from-gray-500 to-gray-600",
    });
    setClientFormIndex(-1);
    setIsEditingClient(false);
    setShowClientForm(true);
  };

  const handleOpenEditClient = (idx, client) => {
    setClientForm({
      name: client.name,
      logo: client.logo || "",
      image: client.image || "",
      color: client.color || "from-gray-500 to-gray-600",
    });
    setClientFormIndex(idx);
    setIsEditingClient(true);
    setShowClientForm(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      alert("Logo image size should not exceed 1MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setClientForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveClientItem = (e) => {
    e.preventDefault();
    if (!partnerData) return;

    const clientsList = [...(partnerData.clients || [])];

    if (isEditingClient) {
      clientsList[clientFormIndex] = clientForm;
    } else {
      clientsList.push(clientForm);
    }

    setPartnerData({
      ...partnerData,
      clients: clientsList,
    });

    setShowClientForm(false);
  };

  const handleRemoveClient = (idx) => {
    if (!partnerData) return;
    const clientsList = (partnerData.clients || []).filter((_, i) => i !== idx);
    setPartnerData({
      ...partnerData,
      clients: clientsList,
    });
  };

  const handleSaveAll = async () => {
    setMessage({ type: "", text: "" });
    try {
      const data = await apiPut("/cms/partners", partnerData);
      setPartnerData(data.partner);
      setMessage({ type: "success", text: "Partners CMS updated successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-4 animate-pulse">
          <div className="h-40 bg-white rounded-xl"></div>
          <div className="h-40 bg-white rounded-xl"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!partnerData) {
    return (
      <AdminLayout>
        <p className="text-gray-500 text-sm">Partners schema load failure.</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Head>
        <title>Partners CMS | SRO Admin</title>
      </Head>

      <div className="space-y-8 font-sans">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Partners CMS Manager</h1>
          {!showClientForm && (
            <button
              onClick={handleSaveAll}
              className="flex items-center gap-2 py-2.5 px-6 bg-[#00974A] hover:bg-[#00974A] text-gray-900 font-bold rounded-lg text-sm shadow-md transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Save All Changes
            </button>
          )}
        </div>

        {message.text && (
          <div
            className={`p-4 rounded-lg flex items-start gap-3 border text-sm ${message.type === "success"
                ? "bg-[#00974A]/15 border-[#00974A]/20 text-[#00974A]"
                : "bg-red-500/15 border-red-500/20 text-red-400"
              }`}
          >
            <Check className="w-5 h-5 flex-shrink-0" />
            <span>{message.text}</span>
          </div>
        )}

        {showClientForm ? (
          /* Inline Client Edit Form */
          <div className="bg-white/40 border border-gray-200 rounded-xl p-8 shadow-md relative animate-fadeIn max-w-3xl">
            <button
              onClick={() => setShowClientForm(false)}
              className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 text-gray-700 rounded-lg transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#00974A]" />
              {isEditingClient ? "Edit Client Item" : "Add Client Partner"}
            </h3>

            <form onSubmit={handleSaveClientItem} className="space-y-6 max-w-xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={clientForm.name}
                  onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                  className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                  placeholder="E.g. TechCorp"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo Initials (Optional fallback, 2 letters max)
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={clientForm.logo}
                  onChange={(e) => setClientForm({ ...clientForm, logo: e.target.value.toUpperCase() })}
                  className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm font-mono"
                  placeholder="E.g. TC"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo Image (JPEG/PNG/WEBP, under 1MB)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-xs text-gray-650 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-800 hover:file:bg-slate-700 cursor-pointer"
                />
                {clientForm.image && (
                  <div className="mt-4 flex items-center gap-3">
                    <img src={clientForm.image} alt="Preview" className="w-12 h-12 object-contain border border-gray-200 rounded-lg p-1 bg-white" />
                    <button
                      type="button"
                      onClick={() => setClientForm({ ...clientForm, image: "" })}
                      className="text-xs text-red-650 hover:underline cursor-pointer"
                    >
                      Remove Logo Image
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visual Color Class (Tailwind gradient)
                </label>
                <input
                  type="text"
                  value={clientForm.color}
                  onChange={(e) => setClientForm({ ...clientForm, color: e.target.value })}
                  className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm font-mono"
                  placeholder="E.g. from-gray-500 to-gray-600"
                />
              </div>

              <div className="pt-4 border-t border-gray-200 flex gap-4">
                <button
                  type="submit"
                  className="py-2.5 px-8 bg-[#00974A] hover:bg-[#00974A] text-gray-900 font-bold rounded-lg text-sm transition cursor-pointer"
                >
                  Save Item
                </button>
                <button
                  type="button"
                  onClick={() => setShowClientForm(false)}
                  className="py-2.5 px-8 bg-gray-100 hover:bg-gray-200 text-gray-850 rounded-lg text-sm transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Normal grid layout */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
            {/* Left Columns - Text Content Settings */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/40 border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-gray-900 border-b border-gray-150 pb-3">
                  1. Text Headers & Paragraphs
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Badge Title
                    </label>
                    <input
                      type="text"
                      value={partnerData.badge || ""}
                      onChange={(e) => handleTextChange("badge", e.target.value)}
                      className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Main Title
                    </label>
                    <input
                      type="text"
                      value={partnerData.title || ""}
                      onChange={(e) => handleTextChange("title", e.target.value)}
                      className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Intro Description
                  </label>
                  <textarea
                    rows={3}
                    value={partnerData.description || ""}
                    onChange={(e) => handleTextChange("description", e.target.value)}
                    className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Client Items */}
            <div className="bg-white/40 border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-gray-150 pb-3">
                <h2 className="text-xl font-bold text-gray-900">
                  2. Client Brands
                </h2>
                <button
                  type="button"
                  onClick={handleOpenAddClient}
                  className="p-1.5 bg-[#00974A] hover:bg-[#00974A] text-gray-900 rounded-lg transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {(partnerData.clients || []).length === 0 ? (
                <p className="text-gray-500 text-sm italic">No client brands added yet.</p>
              ) : (
                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                  {(partnerData.clients || []).map((client, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 bg-white border border-gray-250 rounded-xl hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center font-bold text-sm shadow-sm border border-gray-200">
                          {client.image ? (
                            <img src={client.image} alt={client.name} className="w-full h-full object-contain" />
                          ) : (
                            <span className="w-full h-full bg-[#00974A] text-white flex items-center justify-center">{client.logo}</span>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{client.name}</p>
                          <p className="text-xs text-gray-500 font-mono">{client.color}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEditClient(idx, client)}
                          className="p-1.5 bg-white border border-gray-200 text-gray-600 hover:text-[#00974A] rounded-md transition cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveClient(idx)}
                          className="p-1.5 bg-white border border-gray-200 text-red-500 hover:text-red-700 rounded-md transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
