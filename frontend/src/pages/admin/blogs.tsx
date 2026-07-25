// @ts-nocheck
import { useEffect, useState } from "react";
import Head from "next/head";
import TiptapMiniEditor from "@/components/TiptapMiniEditor";
import AdminLayout from "@/components/AdminLayout";
import { BookOpen, Plus, Trash2, Edit2, AlertCircle, Check, X } from "lucide-react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/utils/api";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [form, setForm] = useState({
    id: "",
    title: "",
    excerpt: "",
    content: "",
    category: "Maintenance",
    readTime: "5 min read",
    date: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    canonicalUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const fetchBlogs = async () => {
    try {
      const data = await apiGet("/blogs");
      setBlogs(data.blogs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 100 * 1024 * 1024) {
      setMessage({ type: "error", text: "Blog image exceeds 100MB limit!" });
      e.target.value = null;
      return;
    }

    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      setMessage({ type: "error", text: "Only JPG, PNG, WEBP, and GIF formats are supported!" });
      e.target.value = null;
      return;
    }

    setImageFile(file);
    setMessage({ type: "", text: "" });
  };

  const handleEdit = (blog) => {
    setForm({
      id: blog._id,
      title: blog.title,
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      category: blog.category || "Maintenance",
      readTime: blog.readTime || "5 min read",
      date: blog.date ? new Date(blog.date).toISOString().substring(0, 10) : "",
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      metaKeywords: blog.metaKeywords || "",
      canonicalUrl: blog.canonicalUrl || "",
    });
    setIsEditing(true);
    setShowForm(true);
    setMessage({ type: "", text: "" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await apiDelete(`/blogs/${id}`);
      setMessage({ type: "success", text: "Blog post deleted successfully!" });
      fetchBlogs();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("excerpt", form.excerpt);
    formData.append("content", form.content);
    formData.append("category", form.category);
    formData.append("readTime", form.readTime);
    formData.append("date", form.date);
    formData.append("metaTitle", form.metaTitle);
    formData.append("metaDescription", form.metaDescription);
    formData.append("metaKeywords", form.metaKeywords);
    formData.append("canonicalUrl", form.canonicalUrl);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (isEditing) {
        await apiPut(`/blogs/${form.id}`, formData, true);
        setMessage({ type: "success", text: "Blog updated successfully!" });
      } else {
        await apiPost("/blogs", formData, true);
        setMessage({ type: "success", text: "Blog published successfully!" });
      }

      // Reset
      setForm({
        id: "",
        title: "",
        excerpt: "",
        content: "",
        category: "Maintenance",
        readTime: "5 min read",
        date: "",
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        canonicalUrl: "",
      });
      setImageFile(null);
      setShowForm(false);
      setIsEditing(false);
      fetchBlogs();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Manage Blogs | SRO Admin</title>
      </Head>

      <div className="space-y-8 font-sans">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          {!showForm && (
            <button
              onClick={() => {
                setForm({
                  id: "",
                  title: "",
                  excerpt: "",
                  content: "",
                  category: "Maintenance",
                  readTime: "5 min read",
                  date: "",
                  metaTitle: "",
                  metaDescription: "",
                  metaKeywords: "",
                  canonicalUrl: "",
                });
                setImageFile(null);
                setIsEditing(false);
                setShowForm(true);
                setMessage({ type: "", text: "" });
              }}
              className="flex items-center gap-2 py-2.5 px-6 bg-[#00974A] hover:bg-[#00974A] text-gray-900 font-bold rounded-lg text-sm shadow-md transition-all animate-pulse"
            >
              <Plus className="w-4 h-4" />
              Write New Blog
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
            {message.type === "success" ? (
              <Check className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {showForm ? (
          <div className="bg-white/40 border border-gray-200 rounded-xl p-6 shadow-md relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-6 right-6 p-2 bg-slate-905 border border-gray-200 text-gray-650 hover:text-white rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#00974A]" />
              {isEditing ? "Edit Blog Post" : "Write Blog Post"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                    placeholder="e.g. 5 Maintenance Tips"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                    placeholder="e.g. Maintenance, Guide"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                    placeholder="e.g. 5 min read"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Publication Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image (JPG, PNG, WEBP, GIF up to 100MB)
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="mt-1.5 block w-full text-xs text-gray-650 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-800 hover:file:bg-slate-700 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Excerpt / Brief Summary
                </label>
                <textarea
                  required
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  rows="2"
                  className="block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                  placeholder="Provide a short summary that will appear on index cards..."
                />
              </div>

              {/* Rich Text Editor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Description (Rich Text Editor)
                </label>
                <TiptapMiniEditor
                  value={form.content}
                  onChange={(val) => setForm({ ...form, content: val })}
                  placeholder="Write your main article description here..."
                  editorClass="min-h-[500px] max-h-[800px]"
                />
              </div>

              {/* SEO Configurations */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">SEO & Metadata Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-350">Meta Title</label>
                    <input
                      type="text"
                      value={form.metaTitle}
                      onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                      className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-xs"
                      placeholder="Title tag for search engines"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-350">Canonical URL</label>
                    <input
                      type="text"
                      value={form.canonicalUrl}
                      onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
                      className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-xs"
                      placeholder="e.g. https://www.srobearings.com/blogs/..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-350">Meta Description</label>
                    <textarea
                      value={form.metaDescription}
                      onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                      rows="2"
                      className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-xs"
                      placeholder="Short description for search result snippet"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-350">Meta Keywords</label>
                    <input
                      type="text"
                      value={form.metaKeywords}
                      onChange={(e) => setForm({ ...form, metaKeywords: e.target.value })}
                      className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-xs"
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="py-3 px-8 bg-[#00974A] hover:bg-[#00974A] text-gray-900 font-bold rounded-lg text-sm shadow-md transition-all"
                >
                  {isEditing ? "Save Changes" : "Publish Article"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="py-3 px-8 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white/40 border border-gray-200 rounded-xl p-6 shadow-md overflow-x-auto">
            {loading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map((idx) => (
                  <div key={idx} className="h-16 bg-white rounded-lg"></div>
                ))}
              </div>
            ) : blogs.length === 0 ? (
              <p className="text-gray-500 text-sm">No blog posts available.</p>
            ) : (
              <table className="w-full text-left text-sm text-gray-700">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 uppercase text-xs">
                    <th className="py-3 px-4">Image</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {blogs.map((blog) => (
                    <tr key={blog._id} className="hover:bg-white/30 transition-all">
                      <td className="py-4 px-4">
                        {blog.image ? (
                          <img
                            src={blog.image.startsWith("http") ? blog.image : `http://localhost:5001${blog.image}`}
                            alt={blog.title}
                            className="w-16 h-10 object-cover rounded-md border border-gray-200"
                          />
                        ) : (
                          <span className="text-xs text-slate-550 italic">No image</span>
                        )}
                      </td>
                      <td className="py-4 px-4 font-semibold text-gray-900">
                        <div>{blog.title}</div>
                        <div className="text-xs text-gray-500 font-normal mt-0.5">{blog.slug}</div>
                      </td>
                      <td className="py-4 px-4 text-gray-650">
                        <span className="bg-gray-100 text-[#00974A] text-xs px-2.5 py-1 rounded border border-gray-300">
                          {blog.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-mono text-xs text-gray-500">
                        {new Date(blog.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="p-2 bg-white border border-gray-200 text-gray-700 hover:text-[#00974A] hover:border-[#00974A]/20 rounded-md transition-all inline-flex"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="p-2 bg-white border border-gray-200 text-slate-350 hover:text-red-400 hover:border-red-500/20 rounded-md transition-all inline-flex"
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
