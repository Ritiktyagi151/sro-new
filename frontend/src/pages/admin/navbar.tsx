// @ts-nocheck
import { useEffect, useState } from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";
import { Save, AlertCircle, Check, HelpCircle, ToggleLeft, ToggleRight } from "lucide-react";
import { apiGet, apiPut } from "@/utils/api";

export default function AdminNavbar() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await apiGet("/navbar");
        setSettings(data.settings);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleModeToggle = (id, newMode) => {
    if (!settings) return;
    const updatedDropdowns = settings.dropdowns.map((drop) => {
      if (drop.id === id) {
        return { ...drop, displayMode: newMode };
      }
      return drop;
    });
    setSettings({ ...settings, dropdowns: updatedDropdowns });
  };

  const handleEnabledToggle = (id) => {
    if (!settings) return;
    const updatedDropdowns = settings.dropdowns.map((drop) => {
      if (drop.id === id) {
        return { ...drop, enabled: !drop.enabled };
      }
      return drop;
    });
    setSettings({ ...settings, dropdowns: updatedDropdowns });
  };

  const handleOrderChange = (id, val) => {
    if (!settings) return;
    const updatedDropdowns = settings.dropdowns.map((drop) => {
      if (drop.id === id) {
        return { ...drop, order: parseInt(val) || 0 };
      }
      return drop;
    });
    setSettings({ ...settings, dropdowns: updatedDropdowns });
  };

  const handleSave = async () => {
    setMessage({ type: "", text: "" });
    try {
      const data = await apiPut("/navbar", { dropdowns: settings.dropdowns });
      setSettings(data.settings);
      setMessage({ type: "success", text: "Navbar settings saved successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Dynamic Navbar Management | SRO Admin</title>
      </Head>

      <div className="space-y-8 font-sans">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dynamic Navbar Management</h1>
            <p className="text-sm text-gray-650 mt-1">
              Control dropdown displays, modes, and sorting without frontend edits.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 py-2.5 px-6 bg-[#00974A] hover:bg-[#00974A] disabled:opacity-50 text-gray-900 font-bold rounded-lg text-sm shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            Save Navbar Settings
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

        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-32 bg-white rounded-xl"></div>
            <div className="h-32 bg-white rounded-xl"></div>
          </div>
        ) : !settings || settings.dropdowns.length === 0 ? (
          <p className="text-gray-500">No navigation configurations defined.</p>
        ) : (
          <div className="space-y-6">
            {settings.dropdowns
              .sort((a, b) => a.order - b.order)
              .map((drop) => (
                <div
                  key={drop.id}
                  className="bg-white/40 border border-gray-200 rounded-xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-slate-750 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-gray-900">{drop.title}</h3>
                      <span className="text-xs text-gray-500 font-mono">ID: {drop.id}</span>
                    </div>
                    <p className="text-sm text-gray-650 leading-relaxed max-w-xl">
                      Display type is set to{" "}
                      <span className="text-[#00974A] font-semibold uppercase">
                        {drop.displayMode}
                      </span>
                      . Toggling this switches the dropdown content between displaying product
                      categories vs. individual catalog products.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    {/* Display Mode Selection */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-gray-650">Display Mode</span>
                      <div className="inline-flex p-1 bg-white border border-gray-200 rounded-lg">
                        <button
                          type="button"
                          onClick={() => handleModeToggle(drop.id, "category")}
                          className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
                            drop.displayMode === "category"
                              ? "bg-[#00974A] text-gray-900 font-bold"
                              : "text-gray-650 hover:text-gray-800"
                          }`}
                        >
                          Show Categories
                        </button>
                        <button
                          type="button"
                          onClick={() => handleModeToggle(drop.id, "product")}
                          className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
                            drop.displayMode === "product"
                              ? "bg-[#00974A] text-gray-900 font-bold"
                              : "text-gray-650 hover:text-gray-800"
                          }`}
                        >
                          Show Products
                        </button>
                      </div>
                    </div>

                    {/* Enable Toggle */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-gray-650">Menu Status</span>
                      <button
                        type="button"
                        onClick={() => handleEnabledToggle(drop.id)}
                        className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-xs font-medium transition-all ${
                          drop.enabled
                            ? "bg-[#00974A]/10 border-[#00974A]/20 text-[#00974A]"
                            : "bg-white border-gray-200 text-gray-500"
                        }`}
                      >
                        {drop.enabled ? (
                          <>
                            <ToggleRight className="w-5 h-5 text-[#00974A]" />
                            <span>Enabled</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-5 h-5 text-gray-500" />
                            <span>Disabled</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Ordering Index */}
                    <div className="flex flex-col gap-1.5 w-24">
                      <span className="text-xs font-semibold text-gray-650">Menu Order</span>
                      <input
                        type="number"
                        value={drop.order}
                        onChange={(e) => handleOrderChange(drop.id, e.target.value)}
                        className="p-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-center focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
