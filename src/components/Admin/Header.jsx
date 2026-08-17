import { motion } from "framer-motion";
import {
  FiMenu,
  FiBell,
  FiSearch,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

function Header({ toggleSidebar }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 px-6 py-4 shadow-lg backdrop-blur-xl dark:border-slate-700 dark:bg-[#08111f]/90"
    >
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* <button
            onClick={toggleSidebar}
            className="rounded-xl bg-cyan-500 p-3 text-white shadow-lg transition hover:scale-110"
          >
            <FiMenu size={22} />
          </button> */}

          <div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white">
              Admin Dashboard
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Welcome Back 
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-72 rounded-2xl border border-slate-300 bg-slate-100 py-3 pl-12 pr-4 outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          {/* Notification */}
          <button className="relative rounded-xl bg-slate-100 p-3 transition hover:bg-cyan-500 hover:text-white dark:bg-slate-800 dark:text-white">
            <FiBell size={20} />

            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>
          </button>

          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="rounded-xl bg-slate-100 p-3 transition hover:bg-cyan-500 hover:text-white dark:bg-slate-800 dark:text-white"
          >
            {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-md dark:border-slate-700 dark:bg-slate-900">
            <img
              src="https://i.pravatar.cc/100"
              alt="Admin"
              className="h-11 w-11 rounded-full border-2 border-cyan-500 object-cover"
            />

            <div className="hidden md:block">
              <h4 className="font-bold text-slate-800 dark:text-white">
                Son Pratap
              </h4>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;