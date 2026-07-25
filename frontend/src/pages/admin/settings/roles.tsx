// @ts-nocheck
import { useEffect, useState } from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";
import { Save, AlertCircle, Check, Shield, Users, UserPlus, Trash2 } from "lucide-react";
import { apiGet, apiPut, apiPost, apiDelete } from "@/utils/api";

export default function AdminRoles() {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("permissions"); // "permissions" | "accounts"
  const [message, setMessage] = useState({ type: "", text: "" });
  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "",
    roleId: "",
  });

  const fetchRoles = async () => {
    try {
      const data = await apiGet("/settings/roles");
      setRoles(data.roles || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await apiGet("/settings/users");
      setUsers(data.users || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchRoles(), fetchUsers()]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePermissionChange = (roleId, moduleName, type) => {
    const updatedRoles = roles.map((role) => {
      if (role._id === roleId) {
        const modulePerms = { ...(role.permissions[moduleName] || {}) };
        modulePerms[type] = !modulePerms[type];
        return {
          ...role,
          permissions: {
            ...role.permissions,
            [moduleName]: modulePerms,
          },
        };
      }
      return role;
    });
    setRoles(updatedRoles);
  };

  const handleSave = async (role) => {
    setMessage({ type: "", text: "" });
    try {
      await apiPut(`/settings/roles/${role._id}`, { permissions: role.permissions });
      setMessage({ type: "success", text: `Permissions for ${role.name} updated successfully!` });
      fetchRoles();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    if (!userForm.roleId) {
      setMessage({ type: "error", text: "Please select a role for the new admin account." });
      return;
    }
    try {
      await apiPost("/settings/users", userForm);
      setMessage({ type: "success", text: `Admin user ${userForm.username} created successfully!` });
      setUserForm({ username: "", email: "", password: "", roleId: "" });
      fetchUsers();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this admin account?")) return;
    setMessage({ type: "", text: "" });
    try {
      await apiDelete(`/settings/users/${userId}`);
      setMessage({ type: "success", text: "Admin account deleted successfully!" });
      fetchUsers();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const modules = ["blogs", "products", "enquiries", "navbar", "settings"];
  const operations = ["read", "write", "delete"];

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
        <title>Role Permissions | SRO Admin</title>
      </Head>

      <div className="space-y-8 font-sans">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Access Control</h1>
          <p className="text-sm text-gray-650 mt-1">
            Manage admin users, distribute roles, and edit access rights across system modules.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-gray-200 gap-4">
          <button
            onClick={() => {
              setActiveTab("permissions");
              setMessage({ type: "", text: "" });
            }}
            className={`pb-3 px-2 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "permissions"
                ? "border-[#00974A] text-[#00974A] font-bold"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            <Shield className="w-4 h-4" />
            Role Access Rights
          </button>
          <button
            onClick={() => {
              setActiveTab("accounts");
              setMessage({ type: "", text: "" });
            }}
            className={`pb-3 px-2 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "accounts"
                ? "border-[#00974A] text-[#00974A] font-bold"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            <Users className="w-4 h-4" />
            Admin User Accounts
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

        {/* Tab 1: Permissions */}
        {activeTab === "permissions" && (
          <div className="space-y-8 animate-fadeIn">
            {roles.map((role) => (
              <div
                key={role._id}
                className="bg-white/40 border border-gray-200 rounded-xl p-6 shadow-md"
              >
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#00974A]" />
                    <span className="text-xl font-bold text-gray-900">{role.name}</span>
                  </div>
                  {role.name !== "Super Admin" ? (
                    <button
                      onClick={() => handleSave(role)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-[#00974A] hover:bg-[#00974A] text-gray-900 font-bold rounded-lg text-xs transition-all shadow"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save Role Permissions
                    </button>
                  ) : (
                    <span className="text-xs bg-gray-100 text-gray-650 border border-gray-300 px-3 py-1 rounded-full font-medium">
                      Fixed Absolute Access
                    </span>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-700">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-650 text-xs">
                        <th className="py-3 px-4">System Module</th>
                        <th className="py-3 px-4 text-center">Read</th>
                        <th className="py-3 px-4 text-center">Write (Create/Edit)</th>
                        <th className="py-3 px-4 text-center">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/10">
                      {modules.map((mod) => (
                        <tr key={mod} className="hover:bg-white/30">
                          <td className="py-4 px-4 font-semibold text-gray-800 capitalize">{mod}</td>
                          {operations.map((op) => (
                            <td key={op} className="py-4 px-4 text-center">
                              <input
                                type="checkbox"
                                disabled={role.name === "Super Admin"}
                                checked={role.permissions?.[mod]?.[op] === true}
                                onChange={() => handlePermissionChange(role._id, mod, op)}
                                className="w-4 h-4 rounded text-[#00974A] focus:ring-[#00974A] focus:ring-offset-white bg-white border-gray-300 cursor-pointer disabled:cursor-not-allowed"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: User Accounts */}
        {activeTab === "accounts" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
            {/* Create Account Form */}
            <div className="bg-white/40 border border-gray-200 rounded-xl p-6 shadow-md h-fit">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#00974A]" />
                Add Admin Account
              </h2>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Username</label>
                  <input
                    type="text"
                    required
                    value={userForm.username}
                    onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                    placeholder="e.g. jsmith_editor"
                    className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Email Address</label>
                  <input
                    type="email"
                    required
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    placeholder="e.g. smith@srobearing.com"
                    className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Password</label>
                  <input
                    type="password"
                    required
                    value={userForm.password}
                    onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                    placeholder="••••••••"
                    className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Account Access Role</label>
                  <select
                    value={userForm.roleId}
                    onChange={(e) => setUserForm({ ...userForm, roleId: e.target.value })}
                    className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#00974A] focus:border-[#00974A] text-sm"
                  >
                    <option value="">-- Choose Access Role --</option>
                    {roles.map((role) => (
                      <option key={role._id} value={role._id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 py-2.5 bg-[#00974A] hover:bg-[#00974A] text-gray-900 font-bold rounded-lg text-xs shadow-md transition-all uppercase tracking-wider"
                >
                  Create Admin Account
                </button>
              </form>
            </div>

            {/* User Accounts List Table */}
            <div className="lg:col-span-2 bg-white/40 border border-gray-200 rounded-xl p-6 shadow-md overflow-x-auto">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#00974A]" />
                Active Admin Profiles
              </h2>
              <table className="w-full text-left text-sm text-gray-700">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-650 text-xs">
                    <th className="py-3 px-4">Username</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/10">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-white/30 transition-all">
                      <td className="py-4 px-4 font-semibold text-gray-900">{u.username}</td>
                      <td className="py-4 px-4 text-gray-650">{u.email}</td>
                      <td className="py-4 px-4">
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-[#00974A]/10 text-[#00974A] border border-[#00974A]/20">
                          {u.role?.name || "N/A"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="p-2 bg-white border border-gray-200 text-slate-350 hover:text-red-400 hover:border-red-500/20 rounded-md transition-all inline-flex"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
