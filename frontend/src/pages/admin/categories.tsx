// @ts-nocheck
import { useEffect, useState } from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";
import { FolderPlus, Trash2, Edit2, AlertCircle, Check, X, Plus } from "lucide-react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/utils/api";
import TiptapMiniEditor from "@/components/TiptapMiniEditor";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    id: "",
    name: "",
    slug: "",
    description: "",
    bannerHeight: "450px",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchCategories = async () => {
    try {
      const data = await apiGet("/categories");
      setCategories(data.categories || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 100 * 1024 * 1024) {
      setMessage({
        type: "error",
        text: `Category banner image exceeds 100MB limit!`,
      });
      e.target.value = null;
      return;
    }

    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(selectedFile.type)) {
      setMessage({
        type: "error",
        text: `Only JPG, PNG, WEBP, and GIF image formats are supported!`,
      });
      e.target.value = null;
      return;
    }

    setFile(selectedFile);
    setMessage({ type: "", text: "" });
  };

  const handleEdit = (cat) => {
    setForm({
      id: cat._id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      bannerHeight: cat.bannerHeight || "450px",
    });
    setFile(null);
    setIsEditing(true);
    setShowForm(true);
    setMessage({ type: "", text: "" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await apiDelete(`/categories/${id}`);
      setMessage({ type: "success", text: "Category deleted successfully!" });
      fetchCategories();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("slug", form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
    formData.append("description", form.description);
    formData.append("bannerHeight", form.bannerHeight);

    if (file) {
      formData.append("image", file);
    }

    try {
      if (isEditing) {
        await apiPut(`/categories/${form.id}`, formData, true);
        setMessage({ type: "success", text: "Category updated successfully!" });
      } else {
        await apiPost("/categories", formData, true);
        setMessage({ type: "success", text: "Category created successfully!" });
      }

      setForm({ id: "", name: "", slug: "", description: "", bannerHeight: "450px" });
      setFile(null);
      setIsEditing(false);
      setShowForm(false);
      fetchCategories();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Manage Categories | SRO Admin</title>
      </Head>

      <div className="space-y-8 font-sans">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Product Categories</h1>
          {!showForm && (
            <button
              onClick={() => {
                setForm({ id: "", name: "", slug: "", description: "", bannerHeight: "450px" });
                setFile(null);
                setIsEditing(false);
                setShowForm(true);
                setMessage({ type: "", text: "" });
              }}
              className="flex items-center gap-2 py-2.5 px-6 bg-[#00974A] hover:bg-[#00974A] text-gray-900 font-bold rounded-lg text-sm shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Create Category
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
              {isEditing ? "Edit Category Canvas" : "Add Category Canvas"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 max-w-lg">
                    <label className="block text-sm font-medium text-gray-700">
                      Category Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                      placeholder="e.g. Roller Bearings"
                    />
                  </div>

                  <div className="flex-1 max-w-md">
                    <label className="block text-sm font-medium text-gray-700">
                      Category Slug (URL)
                    </label>
                    <input
                      type="text"
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                      className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                      placeholder="e.g. roller-bearings"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full max-w-xs">
                    <label className="block text-sm font-medium text-gray-700">
                      Banner Height
                    </label>
                    <input
                      type="text"
                      value={form.bannerHeight}
                      onChange={(e) => setForm({ ...form, bannerHeight: e.target.value })}
                      className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-slate-655 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                      placeholder="e.g. 450px, 60vh"
                    />
                  </div>

                  <div className="flex-1 max-w-md">
                    <label className="block text-sm font-medium text-gray-700">
                      Category Banner Image (JPG, PNG, WEBP, GIF up to 100MB)
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="mt-1.5 block w-full text-xs text-gray-650 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-800 hover:file:bg-slate-700 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Description
                  </label>
                  <TiptapMiniEditor
                    value={form.description}
                    onChange={(val) => setForm({ ...form, description: val })}
                    placeholder="Provide a detailed overview of the category offerings..."
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 flex gap-4">
                <button
                  type="submit"
                  className="py-2.5 px-8 bg-[#00974A] hover:bg-[#00974A] text-gray-900 font-bold rounded-lg text-sm shadow-md transition-all cursor-pointer"
                >
                  {isEditing ? "Save Changes" : "Publish Category"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForm({ id: "", name: "", slug: "", description: "", bannerHeight: "450px" });
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
            <h2 className="text-xl font-bold text-gray-900 mb-6">Existing Categories</h2>

            {loading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map((idx) => (
                  <div key={idx} className="h-16 bg-white rounded-lg"></div>
                ))}
              </div>
            ) : categories.length === 0 ? (
              <p className="text-gray-500 text-sm">No categories defined yet.</p>
            ) : (
              <table className="w-full text-left text-sm text-gray-700">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 uppercase text-xs">
                    <th className="py-3 px-4">Image</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Slug</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {categories.map((cat) => (
                    <tr key={cat._id} className="hover:bg-white/30 transition-all">
                      <td className="py-4 px-4">
                        {cat.desktopBanner ? (
                          <img
                            src={cat.desktopBanner.startsWith("http") ? cat.desktopBanner : `http://localhost:5001${cat.desktopBanner}`}
                            alt={cat.name}
                            className="w-16 h-10 object-cover rounded-md border border-gray-200"
                          />
                        ) : (
                          <span className="text-xs text-slate-550 italic">None</span>
                        )}
                      </td>
                      <td className="py-4 px-4 font-semibold text-gray-900">{cat.name}</td>
                      <td className="py-4 px-4 text-gray-650">{cat.slug}</td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(cat)}
                          className="p-2 bg-white border border-gray-200 text-gray-700 hover:text-[#00974A] hover:border-[#00974A]/20 rounded-md transition-all inline-flex cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat._id)}
                          className="p-2 bg-white border border-gray-200 text-slate-350 hover:text-red-400 hover:border-red-500/20 rounded-md transition-all inline-flex cursor-pointer"
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
