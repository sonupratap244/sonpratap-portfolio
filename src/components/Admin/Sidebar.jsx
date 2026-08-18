import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiGrid,
  FiFolder,
  FiCode,
  FiBriefcase,
  FiFileText,
  FiMail,
  FiSettings,
  FiUser,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
  FiX,
} from "react-icons/fi";

import Logo from "../../assets/logo.png";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const navigate = useNavigate();

  const [collapse, setCollapse] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    {
      title: "Dashboard",
      icon: <FiGrid size={20} />,
      path: "/admin/dashboard",
    },
    {
      title: "Projects",
      icon: <FiFolder size={20} />,
      path: "/admin/projects",
    },
    // {
    //   title: "Skills",
    //   icon: <FiCode size={20} />,
    //   path: "/admin/skills",
    // },
    {
      title: "Experience",
      icon: <FiBriefcase size={20} />,
      path: "/admin/experience",
    },
    // {
    //   title: "Resume",
    //   icon: <FiFileText size={20} />,
    //   path: "/admin/resume",
    // },
    // {
    //   title: "Messages",
    //   icon: <FiMail size={20} />,
    //   path: "/admin/messages",
    // },
    {
      title: "Profile",
      icon: <FiUser size={20} />,
      path: "/admin/profile",
    },
    {
      title: "Settings",
      icon: <FiSettings size={20} />,
      path: "/admin/settings",
    },
  ];

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-5 top-5 z-[999] rounded-xl bg-cyan-500 p-3 text-white shadow-xl lg:hidden"
      >
        <FiMenu size={22} />
      </button>

      {/* Desktop Sidebar */}
      <motion.aside
        animate={{
          width: collapse ? 95 : 280,
        }}
        transition={{
          duration: 0.3,
        }}
        className="fixed left-0 top-0 z-50 hidden h-screen flex-col border-r border-white/10 bg-[#08111f] text-white lg:flex"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <img
              src={Logo}
              alt="logo"
              className="h-12 w-12 rounded-xl border-2 border-cyan-500 object-cover"
            />

            {!collapse && (
              <div>
                <h2 className="text-xl font-black">Son Pratap</h2>

                <p className="text-xs text-cyan-400">
                  Portfolio Admin
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => setCollapse(!collapse)}
            className="rounded-lg bg-slate-800 p-2 hover:bg-cyan-500"
          >
            {collapse ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-6">
          <p
            className={`mb-4 text-xs uppercase tracking-widest text-slate-400 ${
              collapse && "hidden"
            }`}
          >
            Main Menu
          </p>

          <div className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    isActive
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  } ${collapse ? "justify-center" : ""}`
                }
              >
                {item.icon}
                {!collapse && <span>{item.title}</span>}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-4">
          <button
            onClick={logout}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/10 ${
              collapse ? "justify-center" : ""
            }`}
          >
            <FiLogOut size={20} />
            {!collapse && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 z-50 h-screen w-[280px] bg-[#08111f] text-white lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 p-5">
                <div className="flex items-center gap-3">
                  <img
                    src={Logo}
                    alt="logo"
                    className="h-12 w-12 rounded-xl border-2 border-cyan-500 object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-black">Son Pratap</h2>
                    <p className="text-xs text-cyan-400">Portfolio Admin</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg bg-slate-800 p-2 hover:bg-cyan-500"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-3 py-6">
                <p className="mb-4 text-xs uppercase tracking-widest text-slate-400">
                  Main Menu
                </p>
                <div className="space-y-2">
                  {menuItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                          isActive
                            ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`
                      }
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </NavLink>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 p-4">
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/10"
                >
                  <FiLogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;