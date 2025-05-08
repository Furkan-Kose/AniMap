"use client";

import { FaHome, FaUser, FaCog, FaDog, FaArrowLeft, FaBullhorn } from "react-icons/fa";

const Sidebar = ({ isCollapsed, setIsCollapsed }: any) => {
  const menuItems = [
    { label: "Anasayfa", icon: <FaHome />, href: "/admin" },
    { label: "Kullanıcılar", icon: <FaUser />, href: "/admin/users" },
    { label: "Hayvanlar", icon: <FaDog />, href: "/admin/animals" },
    { label: "Kampanyalar", icon: <FaBullhorn />, href: "/admin/campaigns" },
    { label: "Ayarlar", icon: <FaCog />, href: "/admin/settings" },
    { label: "Siteye Dön", icon: <FaArrowLeft />, href: "/" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gray-800 text-white flex flex-col transition-all ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <h1
          className={`text-xl font-bold transition-opacity ${
            isCollapsed ? "opacity-0 hidden" : "block"
          }`}
        >
          Admin Panel
        </h1>
        <button
          className="text-gray-400 hover:text-white"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? ">" : "<"}
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-1">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center gap-4 px-4 py-3 hover:bg-gray-700 transition-colors"
          >
            <span className="text-lg">{item.icon}</span>
            <span
              className={`text-base font-medium transition-all ${
                isCollapsed ? "hidden" : "block"
              }`}
            >
              {item.label}
            </span>
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-4 text-sm text-gray-400">
        <p className={`${isCollapsed ? "hidden" : "block"}`}>© 2025 Admin Panel</p>
      </div>
    </div>
  );
};

export default Sidebar;
