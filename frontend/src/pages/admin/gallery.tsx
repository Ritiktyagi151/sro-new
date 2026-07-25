// @ts-nocheck
import { useEffect, useState } from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";
import { FolderPlus, Trash2, AlertCircle, Check, ImageIcon, Film } from "lucide-react";
import { apiGet, apiPost, apiDelete } from "@/utils/api";

export default function AdminGallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "photo",
    src: "",
    poster: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchGallery = async () => {
    try {
      const data = await apiGet("/cms/gallery");
      setGalleryItems(data.gallery || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 100 * 1024 * 1024) {
      setMessage({ type: "error", text: "Media file exceeds 100MB limit!" });
      e.target.value = null;
      return;
    }

    const allowed = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
      "video/mp4",
      "video/webm",
      "video/quicktime",
    ];
    if (!allowed.includes(selectedFile.type)) {
      setMessage({ type: "error", text: "Only images (JPG, PNG, WEBP, GIF) and videos (MP4, WEBM) are supported!" });
      e.target.value = null;
      return;
    }

    setFile(selectedFile);
    setMessage({ type: "", text: "" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;
    try {
      await apiDelete(`/cms/gallery/${id}`);
      setMessage({ type: "success", text: "Gallery item deleted successfully!" });
      fetchGallery();
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
    formData.append("type", form.type);

    if (file) {
      formData.append("image", file);
      if (form.type === "video") {
        formData.append("poster", form.poster);
      }
    } else if (form.type === "video" && form.src) {
      formData.append("src", form.src);
      formData.append("poster", form.poster);
    } else {
      setMessage({ type: "error", text: `Please select a ${form.type === "video" ? "video" : "image"} file to upload!` });
      return;
    }

    try {
      await apiPost("/cms/gallery", formData, true);
      setMessage({ type: "success", text: "Gallery item uploaded successfully!" });

      setForm({ title: "", description: "", type: "photo", src: "", poster: "" });
      setFile(null);
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = null;
      fetchGallery();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Manage Media Gallery | SRO Admin</title>
      </Head>

      <div className="space-y-8 font-sans">
        <h1 className="text-3xl font-bold text-gray-900">Media Gallery CMS</h1>

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="bg-white/40 border border-gray-200 rounded-xl p-6 h-fit shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FolderPlus className="w-5 h-5 text-[#00974A]" />
              Add Media Item
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Media Title
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                  placeholder="e.g. Factory Layout"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Media Caption / Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows="2"
                  className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                  placeholder="Caption describing this media..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Media Type
                </label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                >
                  <option value="photo">Photo / Image</option>
                  <option value="video">Video URL</option>
                </select>
              </div>

              {form.type === "video" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Video MP4 URL
                    </label>
                    <input
                      type="text"
                      required
                      value={form.src}
                      onChange={(e) => setForm({ ...form, src: e.target.value })}
                      className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                      placeholder="e.g. https://domain.com/video.mp4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Video Poster Image URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={form.poster}
                      onChange={(e) => setForm({ ...form, poster: e.target.value })}
                      className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                      placeholder="e.g. https://domain.com/poster.jpg"
                    />
                  </div>
                </>
              ) : null}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Media File ({form.type === "video" ? "MP4, WEBM up to 100MB" : "JPG, PNG, WEBP, GIF up to 100MB"})
                </label>
                <input
                  type="file"
                  accept={form.type === "video" ? "video/*" : "image/*"}
                  onChange={handleFileChange}
                  className="mt-1.5 block w-full text-xs text-gray-650 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-800 hover:file:bg-slate-700 cursor-pointer"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#00974A] hover:bg-[#00974A] text-gray-900 font-bold rounded-lg text-sm shadow-md transition-all"
                >
                  Upload to Gallery
                </button>
              </div>
            </form>
          </div>

          {/* List Grid */}
          <div className="lg:col-span-2 bg-white/40 border border-gray-200 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Gallery Catalog</h2>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-pulse">
                {[1, 2, 3, 4].map((idx) => (
                  <div key={idx} className="h-40 bg-white rounded-xl"></div>
                ))}
              </div>
            ) : galleryItems.length === 0 ? (
              <p className="text-gray-500 text-sm">No items in the gallery.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {galleryItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white/60 border border-gray-200 rounded-xl overflow-hidden relative group"
                  >
                    <div className="h-40 relative">
                      {item.type === "video" ? (
                        <div className="w-full h-full bg-white flex items-center justify-center border-b border-gray-200 text-gray-500 relative">
                          <Film className="w-12 h-12 text-slate-700" />
                          <span className="absolute bottom-2 left-2 bg-[#00974A]/10 border border-[#00974A]/20 text-[#00974A] text-xs px-2 py-0.5 rounded font-mono">
                            Video
                          </span>
                        </div>
                      ) : (
                        <>
                          <img
                            src={item.src.startsWith("http") ? item.src : `http://localhost:5001${item.src}`}
                            alt={item.title}
                            className="w-full h-full object-cover border-b border-gray-200"
                          />
                          <span className="absolute bottom-2 left-2 bg-blue-500/15 border border-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded font-mono">
                            Photo
                          </span>
                        </>
                      )}

                      {/* Delete Overlay */}
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-lg text-white shadow-md opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-4">
                      <h4 className="font-bold text-gray-955 text-base">{item.title}</h4>
                      <p className="text-xs text-gray-650 mt-1 leading-relaxed">
                        {item.description || "No caption provided."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
