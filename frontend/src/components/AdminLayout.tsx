// @ts-nocheck
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderOpen,
  Briefcase,
  Menu as MenuIcon,
  BookOpen,
  Mail,
  Settings,
  User,
  ShieldAlert,
  Image as ImageIcon,
  Info,
  Phone,
  Compass,
  LogOut,
  ChevronDown,
  Wrench,
  Globe,
  Users,
} from "lucide-react";
import { apiGet, setAuthToken } from "@/utils/api";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [enquiriesOpen, setEnquiriesOpen] = useState(false);
  const [cmsOpen, setCmsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await apiGet("/auth/me");
        setUser(data.user);
        setLoading(false);
      } catch (err) {
        setAuthToken(null);
        router.push("/admin/login");
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = () => {
    setAuthToken(null);
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#00974A] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium">Verifying Session...</p>
        </div>
      </div>
    );
  }

  const hasPermission = (moduleName, type = "read") => {
    if (!user) return false;
    if (user.role === "Super Admin") return true;
    return user.permissions?.[moduleName]?.[type] === true;
  };

  const getRequiredPermission = (path) => {
    if (path.startsWith("/admin/categories")) return { module: "products", type: "read" };
    if (path.startsWith("/admin/products")) return { module: "products", type: "read" };
    if (path.startsWith("/admin/blogs")) return { module: "blogs", type: "read" };
    if (path.startsWith("/admin/navbar")) return { module: "navbar", type: "read" };
    if (path.startsWith("/admin/enquiries")) return { module: "enquiries", type: "read" };
    if (path.startsWith("/admin/gallery")) return { module: "settings", type: "read" };
    if (path.startsWith("/admin/about")) return { module: "settings", type: "read" };
    if (path.startsWith("/admin/services")) return { module: "settings", type: "read" };
    if (path.startsWith("/admin/industries")) return { module: "settings", type: "read" };
    if (path.startsWith("/admin/partners")) return { module: "settings", type: "read" };
    if (path.startsWith("/admin/settings")) return { module: "settings", type: "read" };
    return null;
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
      show: true,
    },
    {
      name: "Product Categories",
      path: "/admin/categories",
      icon: FolderOpen,
      show: hasPermission("products"),
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: Briefcase,
      show: hasPermission("products"),
    },
    {
      name: "Blogs",
      path: "/admin/blogs",
      icon: BookOpen,
      show: hasPermission("blogs"),
    },
    {
      name: "Partners CMS",
      path: "/admin/partners",
      icon: Users,
      show: hasPermission("settings"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex font-sans">
      {/* Sidebar Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 bg-white text-gray-800 rounded-lg shadow-lg border border-gray-200"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Header */}
          <div className="h-20 flex items-center justify-center border-b border-gray-150 px-6">
            <span className="text-xl font-extrabold text-[#00974A] tracking-wider">
              SRO ADMIN
            </span>
          </div>

          {/* User Profile Info */}
          <div className="p-4 border-b border-gray-150 flex items-center gap-3">
            <img
              src={user.profilePic ? (user.profilePic.startsWith("http") ? user.profilePic : `http://localhost:5001${user.profilePic}`) : "https://picsum.photos/seed/avatar/80/80"}
              alt={user.username}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#00974A]"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">
                {user.username}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {user.role}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems
              .filter((item) => item.show)
              .map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${router.pathname === item.path
                      ? "bg-[#00974A]/10 text-[#00974A] border border-[#00974A]/60 font-semibold"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent"
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}

            {/* Enquiries Submenu */}
            {hasPermission("enquiries") && (
              <div>
                <button
                  onClick={() => setEnquiriesOpen(!enquiriesOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" />
                    <span>Enquiries</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${enquiriesOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {enquiriesOpen && (
                  <div className="mt-1 pl-10 space-y-1">
                    <Link
                      href="/admin/enquiries/contact"
                      className={`block px-4 py-2 rounded-lg text-xs font-medium transition-all ${router.pathname === "/admin/enquiries/contact"
                          ? "text-[#00974A] bg-[#00974A]/10 font-semibold"
                          : "text-gray-600 hover:text-gray-900"
                        }`}
                    >
                      Contact Us Form
                    </Link>
                    <Link
                      href="/admin/enquiries/website"
                      className={`block px-4 py-2 rounded-lg text-xs font-medium transition-all ${router.pathname === "/admin/enquiries/website"
                          ? "text-[#00974A] bg-[#00974A]/10 font-semibold"
                          : "text-gray-600 hover:text-gray-900"
                        }`}
                    >
                      Website Forms
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* CMS Gated sections */}
            {hasPermission("settings") && (
              <div>
                <button
                  onClick={() => setCmsOpen(!cmsOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5" />
                    <span>Website CMS</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${cmsOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {cmsOpen && (
                  <div className="mt-1 pl-10 space-y-1">
                    <Link
                      href="/admin/gallery"
                      className={`block px-4 py-2 rounded-lg text-xs font-medium transition-all ${router.pathname === "/admin/gallery"
                          ? "text-[#00974A] bg-[#00974A]/10 font-semibold"
                          : "text-gray-600 hover:text-gray-900"
                        }`}
                    >
                      Media Gallery
                    </Link>
                    <Link
                      href="/admin/about"
                      className={`block px-4 py-2 rounded-lg text-xs font-medium transition-all ${router.pathname === "/admin/about"
                          ? "text-[#00974A] bg-[#00974A]/10 font-semibold"
                          : "text-gray-600 hover:text-gray-900"
                        }`}
                    >
                      About Us Section
                    </Link>
                    <Link
                      href="/admin/services"
                      className={`block px-4 py-2 rounded-lg text-xs font-medium transition-all ${router.pathname === "/admin/services"
                          ? "text-[#00974A] bg-[#00974A]/10 font-semibold"
                          : "text-gray-600 hover:text-gray-900"
                        }`}
                    >
                      Services CMS
                    </Link>
                    <Link
                      href="/admin/industries"
                      className={`block px-4 py-2 rounded-lg text-xs font-medium transition-all ${router.pathname === "/admin/industries"
                          ? "text-[#00974A] bg-[#00974A]/10 font-semibold"
                          : "text-gray-600 hover:text-gray-900"
                        }`}
                    >
                      Industries CMS
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Settings Submenu */}
            {hasPermission("settings") && (
              <div>
                <button
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${settingsOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {settingsOpen && (
                  <div className="mt-1 pl-10 space-y-1">
                    <Link
                      href="/admin/settings/profile"
                      className={`block px-4 py-2 rounded-lg text-xs font-medium transition-all ${router.pathname === "/admin/settings/profile"
                          ? "text-[#00974A] bg-[#00974A]/10 font-semibold"
                          : "text-gray-600 hover:text-gray-900"
                        }`}
                    >
                      Admin Profile
                    </Link>
                    <Link
                      href="/admin/settings/roles"
                      className={`block px-4 py-2 rounded-lg text-xs font-medium transition-all ${router.pathname === "/admin/settings/roles"
                          ? "text-[#00974A] bg-[#00974A]/10 font-semibold"
                          : "text-gray-600 hover:text-gray-900"
                        }`}
                    >
                      Role Permissions
                    </Link>
                    <Link
                      href="/admin/settings/contact"
                      className={`block px-4 py-2 rounded-lg text-xs font-medium transition-all ${router.pathname === "/admin/settings/contact"
                          ? "text-[#00974A] bg-[#00974A]/10 font-semibold"
                          : "text-gray-600 hover:text-gray-900"
                        }`}
                    >
                      Contact Info Details
                    </Link>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>

        {/* Footer Logout Button */}
        <div className="p-4 border-t border-gray-150">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">

        <main className="flex-1 p-4 pt-20 sm:p-6 sm:pt-20 md:p-8 lg:pt-8 overflow-y-auto max-w-7xl w-full mx-auto text-gray-800">
          {(() => {
            const reqPerm = getRequiredPermission(router.pathname);
            const authorized = !reqPerm || hasPermission(reqPerm.module, reqPerm.type);
            if (authorized) {
              return children;
            }
            return (
              <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-2xl mx-auto mt-12 shadow-sm text-gray-800">
                <ShieldAlert className="w-16 h-16 text-red-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
                <p className="text-gray-605 mb-6">
                  Your role (<strong>{user.role}</strong>) does not have permission to view this module.
                </p>
                <Link
                  href="/admin"
                  className="inline-block py-2.5 px-6 bg-[#00974A] hover:bg-[#00974A] text-white font-semibold rounded-lg text-sm shadow transition-all"
                >
                  Return to Dashboard
                </Link>
              </div>
            );
          })()}
        </main>
      </div>
    </div>
  );
}
