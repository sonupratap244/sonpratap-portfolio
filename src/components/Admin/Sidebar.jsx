import { useState, useEffect } from "react";
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
  FiHome,
  FiMessageSquare,
  FiStar,
} from "react-icons/fi";

import Logo from "../../assets/logo.png";
import { useTheme } from "../../context/ThemeContext";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [collapse, setCollapse] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    {
      title: "Experience",
      icon: <FiBriefcase size={20} />,
      path: "/admin/experience",
    },
    {
      title: "Messages",
      icon: <FiMessageSquare size={20} />,
      path: "/admin/messages",
    },
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

  // Sidebar background based on theme
  const sidebarBg = theme === "dark" 
    ? "bg-[#08111f] border-white/10" 
    : "bg-white border-slate-200";

  const textColor = theme === "dark" ? "text-white" : "text-slate-800";
  const textMuted = theme === "dark" ? "text-slate-400" : "text-slate-500";
  const hoverBg = theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100";
  const activeBg = "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20";

  return (
    <>
      {/* Mobile Menu Button - Floating */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 sm:left-5 top-4 sm:top-5 z-[999] rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 p-3 text-white shadow-2xl shadow-cyan-500/30 lg:hidden transition-all duration-300 hover:shadow-cyan-500/50"
      >
        <FiMenu size={22} />
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400 border-2 border-white animate-pulse"></span>
      </motion.button>

      {/* Desktop Sidebar */}
      <motion.aside
        animate={{
          width: collapse ? 80 : 280,
        }}
        transition={{
          duration: 0.4,
          type: "spring",
          stiffness: 200,
          damping: 25,
        }}
        className={`fixed left-0 top-0 z-50 hidden h-screen flex-col border-r shadow-2xl backdrop-blur-xl lg:flex ${sidebarBg}`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between border-b p-4 ${theme === "dark" ? "border-white/10" : "border-slate-200"}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative flex-shrink-0"
            >
              <img
                src={Logo}
                alt="logo"
                className="h-12 w-12 rounded-2xl border-2 border-cyan-500 object-cover shadow-lg shadow-cyan-500/20"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></span>
            </motion.div>

            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: collapse ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="whitespace-nowrap"
            >
              <h2 className={`text-lg font-black ${textColor}`}>
                Son Pratap
              </h2>
              <p className="text-[10px] font-semibold uppercase tracking-[2px] text-cyan-400">
                Admin Panel
              </p>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCollapse(!collapse)}
            className={`rounded-xl p-2 transition-all duration-300 ${
              theme === "dark" ? "bg-slate-800 hover:bg-cyan-500" : "bg-slate-100 hover:bg-cyan-500 hover:text-white"
            }`}
          >
            {collapse ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
          </motion.button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-6 scrollbar-thin scrollbar-thumb-cyan-500/20">
          <motion.p
            animate={{ opacity: collapse ? 0 : 1 }}
            className={`mb-4 text-[10px] font-semibold uppercase tracking-[3px] ${textMuted}`}
          >
            Main Menu
          </motion.p>

          <div className="space-y-1.5">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? activeBg
                        : `${textColor} ${hoverBg} hover:translate-x-1`
                    } ${collapse ? "justify-center" : ""}`
                  }
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapse && <span>{item.title}</span>}
                  
                  {/* Active Indicator */}
                  <span className="absolute -right-1 top-1/2 -translate-y-1/2 h-8 w-1 rounded-full bg-cyan-400 opacity-0 group-[.active]:opacity-100 transition-opacity duration-300"></span>
                </NavLink>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`border-t p-4 ${theme === "dark" ? "border-white/10" : "border-slate-200"}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-red-400 transition-all duration-300 hover:bg-red-500/10 hover:text-red-500 ${
              collapse ? "justify-center" : ""
            }`}
          >
            <FiLogOut size={20} className="group-hover:rotate-12 transition-transform duration-300" />
            {!collapse && <span>Logout</span>}
          </motion.button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar - Premium */}
      <AnimatePresence mode="wait">
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ 
                type: "spring", 
                damping: 30, 
                stiffness: 250,
                mass: 0.8
              }}
              className={`fixed left-0 top-0 z-50 h-screen w-[85%] max-w-[320px] ${sidebarBg} shadow-2xl shadow-black/20 lg:hidden`}
            >
              <div className={`flex items-center justify-between border-b p-5 ${theme === "dark" ? "border-white/10" : "border-slate-200"}`}>
                <div className="flex items-center gap-3">
                  <motion.img
                    whileHover={{ rotate: 10, scale: 1.05 }}
                    src={Logo}
                    alt="logo"
                    className="h-14 w-14 rounded-2xl border-2 border-cyan-500 object-cover shadow-lg shadow-cyan-500/20"
                  />
                  <div>
                    <h2 className={`text-xl font-black ${textColor}`}>
                      Son Pratap
                    </h2>
                    <p className="text-[10px] font-semibold uppercase tracking-[2px] text-cyan-400">
                      Admin Panel
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-xl p-2 ${
                    theme === "dark" ? "bg-slate-800 hover:bg-cyan-500" : "bg-slate-100 hover:bg-cyan-500 hover:text-white"
                  } transition-all duration-300`}
                >
                  <FiX size={22} />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-6">
                <p className={`mb-4 text-[10px] font-semibold uppercase tracking-[3px] ${textMuted}`}>
                  Main Menu
                </p>
                <div className="space-y-1.5">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.06 }}
                    >
                      <NavLink
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                            isActive
                              ? activeBg
                              : `${textColor} ${hoverBg} hover:translate-x-1`
                          }`
                        }
                      >
                        <span className="flex-shrink-0">{item.icon}</span>
                        <span>{item.title}</span>
                      </NavLink>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className={`border-t p-4 ${theme === "dark" ? "border-white/10" : "border-slate-200"}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-red-400 transition-all duration-300 hover:bg-red-500/10 hover:text-red-500"
                >
                  <FiLogOut size={20} />
                  <span>Logout</span>
                </motion.button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;