// @ts-nocheck
import { useEffect, useState } from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";
import { FolderPlus, Trash2, Edit2, AlertCircle, Check, Plus, X } from "lucide-react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/utils/api";
import TiptapMiniEditor from "@/components/TiptapMiniEditor";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    icon: "",
    caseStudy: "",
    fullDescription: "",
    benefits: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchServices = async () => {
    try {
      const data = await apiGet("/cms/services");
      setServices(data.services || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 100 * 1024 * 1024) {
      setMessage({ type: "error", text: "Service image exceeds 100MB limit!" });
      e.target.value = null;
      return;
    }

    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(selectedFile.type)) {
      setMessage({ type: "error", text: "Only JPG, PNG, WEBP, and GIF formats are supported!" });
      e.target.value = null;
      return;
    }

    setFile(selectedFile);
    setMessage({ type: "", text: "" });
  };

  const handleEdit = (service) => {
    setForm({
      id: service._id,
      title: service.title,
      description: service.description || "",
      icon: service.icon || "",
      caseStudy: service.caseStudy || "",
      fullDescription: Array.isArray(service.fullDescription) ? service.fullDescription.join("\n") : (service.fullDescription || ""),
      benefits: Array.isArray(service.benefits) ? service.benefits.join("\n") : (service.benefits || ""),
    });
    setFile(null);
    setIsEditing(true);
    setShowForm(true);
    setMessage({ type: "", text: "" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await apiDelete(`/cms/services/${id}`);
      setMessage({ type: "success", text: "Service deleted successfully!" });
      fetchServices();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("icon", form.icon);
    formData.append("caseStudy", form.caseStudy);

    const parsedFullDesc = [form.fullDescription];
    const parsedBenefits = form.benefits.split("\n").map(line => line.trim()).filter(Boolean);

    formData.append("fullDescription", JSON.stringify(parsedFullDesc));
    formData.append("benefits", JSON.stringify(parsedBenefits));

    if (file) {
      formData.append("image", file);
    }

    try {
      if (isEditing) {
        await apiPut(`/cms/services/${form.id}`, formData, true);
        setMessage({ type: "success", text: "Service updated successfully!" });
      } else {
        await apiPost("/cms/services", formData, true);
        setMessage({ type: "success", text: "Service created successfully!" });
      }

      setForm({
        id: "",
        title: "",
        description: "",
        icon: "",
        caseStudy: "",
        fullDescription: "",
        benefits: "",
      });
      setFile(null);
      setIsEditing(false);
      setShowForm(false);
      fetchServices();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Services CMS | SRO Admin</title>
      </Head>

      <div className="space-y-8 font-sans">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Services CMS Manager</h1>
          {!showForm && (
            <button
              onClick={() => {
                setForm({
                  id: "",
                  title: "",
                  description: "",
                  icon: "",
                  caseStudy: "",
                  fullDescription: "",
                  benefits: "",
                });
                setFile(null);
                setIsEditing(false);
                setShowForm(true);
                setMessage({ type: "", text: "" });
              }}
              className="flex items-center gap-2 py-2.5 px-6 bg-[#00974A] hover:bg-[#00974A] text-gray-900 font-bold rounded-lg text-sm shadow-md transition-all cursor-pointer animate-pulse"
            >
              <Plus className="w-4 h-4" />
              Create Service
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

        {showForm ? (
          /* Full Page Editor Form */
          <div className="bg-white/40 border border-gray-200 rounded-xl p-8 shadow-md relative animate-fadeIn">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 text-gray-700 rounded-lg transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <FolderPlus className="w-5 h-5 text-[#00974A]" />
              {isEditing ? "Edit Service Canvas" : "Add Service Canvas"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-5">
                {/* Row 1: Title + Icon */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 max-w-lg">
                    <label className="block text-sm font-medium text-gray-700">
                      Service Title
                    </label>
                    <input
                      type="text"
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                      placeholder="e.g. Oil Reconditioning"
                    />
                  </div>
                  <div className="w-full max-w-[160px]">
                    <label className="block text-sm font-medium text-gray-700">
                      Icon (Emoji or text)
                    </label>
                    <input
                      type="text"
                      required
                      value={form.icon}
                      onChange={(e) => setForm({ ...form, icon: e.target.value })}
                      className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                      placeholder="e.g. 🔄"
                    />
                  </div>
                </div>

                {/* Row 2: Short Description */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Short Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows="2"
                    className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                    placeholder="Short summary excerpt..."
                  />
                </div>

                {/* Row 3: Case Study */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Case Study
                  </label>
                  <textarea
                    value={form.caseStudy}
                    onChange={(e) => setForm({ ...form, caseStudy: e.target.value })}
                    rows="3"
                    className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                    placeholder="Success study details..."
                  />
                </div>

                {/* Row 4: Full Description Tiptap */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Description (Rich Text Editor)
                  </label>
                  <TiptapMiniEditor
                    value={form.fullDescription}
                    onChange={(val) => setForm({ ...form, fullDescription: val })}
                    placeholder="Provide a detailed full description of the service..."
                  />
                </div>

                {/* Row 5: Benefits */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Benefits List (One benefit per line)
                  </label>
                  <textarea
                    value={form.benefits}
                    onChange={(e) => setForm({ ...form, benefits: e.target.value })}
                    rows="4"
                    className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A]"
                    placeholder="Benefit 1...&#10;Benefit 2..."
                  />
                </div>

                {/* Row 6: Image Upload */}
                <div className="w-full max-w-md pt-4 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700">
                    Service Image (JPG, PNG, WEBP, GIF up to 100MB)
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="mt-1.5 block w-full text-xs text-gray-650 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-800 hover:file:bg-slate-700 cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 flex gap-4">
                <button
                  type="submit"
                  className="py-2.5 px-8 bg-[#00974A]/10 hover:bg-[#00974A] text-gray-900 font-bold rounded-lg text-sm shadow-md transition-all cursor-pointer"
                >
                  {isEditing ? "Save Changes" : "Publish Service"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForm({
                      id: "",
                      title: "",
                      description: "",
                      icon: "",
                      caseStudy: "",
                      fullDescription: "",
                      benefits: "",
                    });
                    setFile(null);
                    setIsEditing(false);
                    setShowForm(false);
                  }}
                  className="py-2.5 px-8 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Full Width List Table */
          <div className="bg-white/40 border border-gray-200 rounded-xl p-6 shadow-md overflow-x-auto animate-fadeIn">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Existing Services</h2>

            {loading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map((idx) => (
                  <div key={idx} className="h-16 bg-white rounded-lg"></div>
                ))}
              </div>
            ) : services.length === 0 ? (
              <p className="text-gray-500 text-sm">No services listed yet.</p>
            ) : (
              <table className="w-full text-left text-sm text-gray-700">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 uppercase text-xs">
                    <th className="py-3 px-4">Image</th>
                    <th className="py-3 px-4">Icon</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Slug</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {services.map((service) => (
                    <tr key={service._id} className="hover:bg-white/30 transition-all">
                      <td className="py-4 px-4">
                        {service.image ? (
                          <img
                            src={service.image.startsWith("http") ? service.image : `http://localhost:5001${service.image}`}
                            alt={service.title}
                            className="w-16 h-10 object-cover rounded-md border border-gray-200"
                          />
                        ) : (
                          <span className="text-xs text-slate-550 italic">None</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-2xl">{service.icon}</td>
                      <td className="py-4 px-4 font-semibold text-gray-900">{service.title}</td>
                      <td className="py-4 px-4 text-gray-650">{service.slug}</td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="p-2 bg-white border border-gray-200 text-gray-700 hover:text-[#00974A] hover:border-[#00974A]/20 rounded-md transition-all inline-flex cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(service._id)}
                          className="p-2 bg-white border border-gray-200 text-slate-355 hover:text-red-400 hover:border-red-500/20 rounded-md transition-all inline-flex cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
