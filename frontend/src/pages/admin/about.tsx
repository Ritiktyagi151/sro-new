// @ts-nocheck
import { useEffect, useState } from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";
import { Save, AlertCircle, Check, Plus, Trash2 } from "lucide-react";
import { apiGet, apiPut } from "@/utils/api";

export default function AdminAbout() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await apiGet("/cms/about");
        setAbout(data.about);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const handleTextChange = (field, val, isNested = null, subField = null) => {
    if (!about) return;
    if (isNested) {
      setAbout({
        ...about,
        [isNested]: {
          ...about[isNested],
          [subField]: val,
        },
      });
    } else {
      setAbout({ ...about, [field]: val });
    }
  };

  const handleAddMilestone = () => {
    if (!about) return;
    const timelineMilestones = [...(about.timelineMilestones || [])];
    timelineMilestones.push({ year: "", title: "", description: "" });
    setAbout({ ...about, timelineMilestones });
  };

  const handleMilestoneChange = (idx, field, val) => {
    if (!about) return;
    const timelineMilestones = [...about.timelineMilestones];
    timelineMilestones[idx][field] = val;
    setAbout({ ...about, timelineMilestones });
  };

  const handleRemoveMilestone = (idx) => {
    if (!about) return;
    const timelineMilestones = about.timelineMilestones.filter((_, i) => i !== idx);
    setAbout({ ...about, timelineMilestones });
  };

  const handleAddStat = () => {
    if (!about) return;
    const stats = [...(about.stats || [])];
    stats.push({ number: "", label: "", prefix: "" });
    setAbout({ ...about, stats });
  };

  const handleStatChange = (idx, field, val) => {
    if (!about) return;
    const stats = [...about.stats];
    stats[idx][field] = val;
    setAbout({ ...about, stats });
  };

  const handleRemoveStat = (idx) => {
    if (!about) return;
    const stats = about.stats.filter((_, i) => i !== idx);
    setAbout({ ...about, stats });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    try {
      const data = await apiPut("/cms/about", about);
      setAbout(data.about);
      setMessage({ type: "success", text: "About Us details updated successfully!" });
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

  return (
    <AdminLayout>
      <Head>
        <title>About Us CMS | SRO Admin</title>
      </Head>

      <div className="space-y-8 font-sans">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">About Us Section Editor</h1>
            <p className="text-sm text-gray-650 mt-1">
              Manage messages, statistics counters, and historical timeline events.
            </p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 py-2.5 px-6 bg-[#00974A] hover:bg-[#00974A] text-gray-900 font-bold rounded-lg text-sm shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            Save About Settings
          </button>
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

        <form onSubmit={handleSave} className="space-y-8">
          {/* Executive Messages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Chairman */}
            <div className="bg-white/40 border border-gray-200 rounded-xl p-6 shadow-md space-y-4">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">
                Chairman's Message
              </h3>
              <div>
                <label className="block text-xs font-semibold text-gray-600">Name</label>
                <input
                  type="text"
                  value={about.chairmanMessage?.name || ""}
                  onChange={(e) => handleTextChange(null, e.target.value, "chairmanMessage", "name")}
                  className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600">Designation Role</label>
                <input
                  type="text"
                  value={about.chairmanMessage?.role || ""}
                  onChange={(e) => handleTextChange(null, e.target.value, "chairmanMessage", "role")}
                  className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600">Quote / Philosophy Message</label>
                <textarea
                  value={about.chairmanMessage?.quote || ""}
                  onChange={(e) => handleTextChange(null, e.target.value, "chairmanMessage", "quote")}
                  rows="3"
                  className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A]"
                />
              </div>
            </div>

            {/* MD */}
            <div className="bg-white/40 border border-gray-200 rounded-xl p-6 shadow-md space-y-4">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">
                Managing Director's Message
              </h3>
              <div>
                <label className="block text-xs font-semibold text-gray-600">Name</label>
                <input
                  type="text"
                  value={about.mdMessage?.name || ""}
                  onChange={(e) => handleTextChange(null, e.target.value, "mdMessage", "name")}
                  className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600">Designation Role</label>
                <input
                  type="text"
                  value={about.mdMessage?.role || ""}
                  onChange={(e) => handleTextChange(null, e.target.value, "mdMessage", "role")}
                  className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600">Quote / Philosophy Message</label>
                <textarea
                  value={about.mdMessage?.quote || ""}
                  onChange={(e) => handleTextChange(null, e.target.value, "mdMessage", "quote")}
                  rows="3"
                  className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A]"
                />
              </div>
            </div>
          </div>

          {/* Stats Layout */}
          <div className="bg-white/40 border border-gray-200 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
              <h3 className="text-lg font-bold text-gray-900">Dynamic Statistics Counters</h3>
              <button
                type="button"
                onClick={handleAddStat}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00974A]/10 border border-[#00974A]/20 hover:bg-[#00974A]/20 text-[#00974A] rounded-lg text-xs font-bold transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Stat Counter
              </button>
            </div>

            <div className="space-y-4">
              {(about.stats || []).map((stat, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 items-end gap-4 bg-white/40 p-4 border border-gray-200 rounded-lg shadow-sm">
                  <div className="sm:col-span-2 w-full">
                    <label className="block text-xs font-semibold text-gray-600">Stat Prefix (e.g. &gt;)</label>
                    <input
                      type="text"
                      value={stat.prefix || ""}
                      onChange={(e) => handleStatChange(idx, "prefix", e.target.value)}
                      className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm font-mono text-center focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A]"
                    />
                  </div>
                  <div className="sm:col-span-3 w-full">
                    <label className="block text-xs font-semibold text-gray-600">Stat Number (e.g. 17 000)</label>
                    <input
                      type="text"
                      required
                      value={stat.number}
                      onChange={(e) => handleStatChange(idx, "number", e.target.value)}
                      className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm font-bold text-center focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A]"
                    />
                  </div>
                  <div className="sm:col-span-6 w-full">
                    <label className="block text-xs font-semibold text-gray-600">Stat Label Description (e.g. Distributors)</label>
                    <input
                      type="text"
                      required
                      value={stat.label}
                      onChange={(e) => handleStatChange(idx, "label", e.target.value)}
                      className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A]"
                    />
                  </div>
                  <div className="sm:col-span-1 w-full flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleRemoveStat(idx)}
                      className="p-3 bg-white border border-gray-200 text-red-500 hover:bg-red-50 hover:text-red-750 hover:border-red-500 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Timeline */}
          <div className="bg-white/40 border border-gray-200 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
              <h3 className="text-lg font-bold text-gray-900">Timeline & Milestones</h3>
              <button
                type="button"
                onClick={handleAddMilestone}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00974A]/10 border border-[#00974A]/20 hover:bg-[#00974A]/20 text-[#00974A] rounded-lg text-xs font-bold transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Milestone
              </button>
            </div>

            <div className="space-y-4">
              {(about.timelineMilestones || []).map((ms, idx) => (
                <div key={idx} className="flex flex-col gap-4 bg-white/40 p-4 border border-gray-200 rounded-lg relative group">
                  <button
                    type="button"
                    onClick={() => handleRemoveMilestone(idx)}
                    className="absolute top-4 right-4 p-1.5 bg-white border border-gray-200 text-red-450 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600">Milestone Year (e.g. 1990)</label>
                      <input
                        type="text"
                        required
                        value={ms.year}
                        onChange={(e) => handleMilestoneChange(idx, "year", e.target.value)}
                        className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-600">Milestone Title</label>
                      <input
                        type="text"
                        required
                        value={ms.title}
                        onChange={(e) => handleMilestoneChange(idx, "title", e.target.value)}
                        className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A]"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-xs font-semibold text-gray-600">Short Description</label>
                      <textarea
                        required
                        value={ms.description}
                        onChange={(e) => handleMilestoneChange(idx, "description", e.target.value)}
                        rows="2"
                        className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
