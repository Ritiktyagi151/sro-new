// @ts-nocheck
import { useEffect, useState } from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";
import { User, Save, Lock, Mail, AlertCircle, Check } from "lucide-react";
import { apiGet, apiPut } from "@/utils/api";

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiGet("/auth/me");
        setProfile({
          username: data.user.username,
          email: data.user.email,
          password: "",
          confirmPassword: "",
          profilePic: data.user.profilePic || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (selected.size > 100 * 1024 * 1024) {
      setMessage({ type: "error", text: "Profile image exceeds 100MB limit!" });
      e.target.value = null;
      return;
    }

    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(selected.type)) {
      setMessage({ type: "error", text: "Only JPG, PNG, WEBP, and GIF formats are supported!" });
      e.target.value = null;
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setMessage({ type: "", text: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (profile.password && profile.password !== profile.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", profile.username);
      formData.append("email", profile.email);
      if (profile.password) {
        formData.append("password", profile.password);
      }
      if (file) {
        formData.append("image", file);
      } else {
        formData.append("profilePic", profile.profilePic);
      }

      await apiPut("/auth/profile", formData, true);
      setMessage({ type: "success", text: "Profile details updated successfully!" });
      setProfile({ ...profile, password: "", confirmPassword: "" });
      setFile(null);
      // Reload window to update global AdminLayout navbar headers
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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
        <title>Admin Profile | SRO Admin</title>
      </Head>

      <div className="max-w-2xl mx-auto space-y-8 font-sans">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Profile Settings</h1>
          <p className="text-sm text-gray-650 mt-1">
            Update your personal login credentials, profile picture, and email settings.
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
             <div className="flex flex-col items-center gap-4 border-b border-gray-200 pb-6 mb-6">
              <img
                src={preview || (profile.profilePic ? (profile.profilePic.startsWith("http") ? profile.profilePic : `http://localhost:5001${profile.profilePic}`) : "https://picsum.photos/seed/avatar/150/150")}
                alt="Profile Avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
              />
              <div className="w-full flex flex-col items-center gap-2">
                <label className="block text-xs font-bold text-gray-705 text-center uppercase tracking-wider">
                  Upload Profile Photo
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="mt-1 block text-xs text-gray-650 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-800 hover:file:bg-slate-700 cursor-pointer"
                />
                <span className="text-[10px] text-gray-400">JPG, PNG, WEBP, or GIF up to 100MB</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <div className="mt-1.5 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  required
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-955 text-sm focus:outline-none focus:ring-1 focus:ring-[#00974A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="mt-1.5 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  required
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-955 text-sm focus:outline-none focus:ring-1 focus:ring-[#00974A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-200 pt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <div className="mt-1.5 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    value={profile.password}
                    onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                    className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-955 text-sm focus:outline-none focus:ring-1 focus:ring-[#00974A]"
                    placeholder="Leave blank to keep current"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="mt-1.5 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    value={profile.confirmPassword}
                    onChange={(e) => setProfile({ ...profile, confirmPassword: e.target.value })}
                    className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-955 text-sm focus:outline-none focus:ring-1 focus:ring-[#00974A]"
                    placeholder="Confirm new password"
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
                Save Profile Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
