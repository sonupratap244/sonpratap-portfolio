import { motion } from "framer-motion";
import {
  FiMenu,
  FiBell,
  FiSearch,
  FiMoon,
  FiSun,
  FiUser,
} from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import AdminProfile from "../../assets/profile.jpg";

function Header({ toggleSidebar }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 px-2 sm:px-4 md:px-6 py-1.5 sm:py-3 md:py-4 shadow-lg backdrop-blur-xl dark:border-slate-700 dark:bg-[#08111f]/90"
    >
      <div className="flex items-center justify-between gap-1 sm:gap-3 md:gap-4">
        {/* Left */}
        <div className="flex items-center gap-1.5 sm:gap-3 md:gap-4 min-w-0">
          {/* <button
            onClick={toggleSidebar}
            className="rounded-xl bg-cyan-500 p-1.5 sm:p-2 md:p-3 text-white shadow-lg transition hover:scale-110 flex-shrink-0"
          >
            <FiMenu size={16} className="sm:w-[18px] sm:h-[18px] md:w-[22px] md:h-[22px]" />
          </button> */}

          <div className="min-w-0">
            <h2 className="text-xs sm:text-lg md:text-2xl font-black text-slate-800 dark:text-white truncate">
              Admin Dashboard
            </h2>
            <p className="hidden sm:block text-[10px] sm:text-xs md:text-sm text-slate-500 dark:text-slate-400 truncate">
              Welcome Back
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-0.5 sm:gap-2 md:gap-4 flex-shrink-0">
          {/* Search - Desktop */}
          <div className="relative hidden lg:block">
            <FiSearch
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-32 lg:w-48 xl:w-72 rounded-2xl border border-slate-300 bg-slate-100 py-1.5 sm:py-2 md:py-3 pl-8 md:pl-10 lg:pl-12 pr-3 md:pr-4 text-sm outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white placeholder:text-xs"
            />
          </div>

          {/* Search - Tablet */}
          <div className="relative hidden md:block lg:hidden">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={14}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-24 sm:w-32 rounded-2xl border border-slate-300 bg-slate-100 py-1.5 sm:py-2 pl-8 pr-3 text-xs outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white placeholder:text-[10px]"
            />
          </div>

          {/* Search - Mobile Icon */}
          <button className="md:hidden rounded-xl bg-slate-100 p-1.5 transition hover:bg-cyan-500 hover:text-white dark:bg-slate-800 dark:text-white">
            <FiSearch size={13} />
          </button>

          {/* Notification */}
          <button className="relative rounded-xl bg-slate-100 p-1.5 sm:p-2 md:p-3 transition hover:bg-cyan-500 hover:text-white dark:bg-slate-800 dark:text-white">
            <FiBell size={13} className="sm:w-[16px] sm:h-[16px] md:w-[20px] md:h-[20px]" />
            <span className="absolute right-0.5 sm:right-1 md:right-2 top-0.5 sm:top-1 md:top-2 h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-2.5 md:w-2.5 rounded-full bg-red-500"></span>
          </button>

          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="rounded-xl bg-slate-100 p-1.5 sm:p-2 md:p-3 transition hover:bg-cyan-500 hover:text-white dark:bg-slate-800 dark:text-white"
          >
            {theme === "dark" ? (
              <FiSun size={13} className="sm:w-[16px] sm:h-[16px] md:w-[20px] md:h-[20px]" />
            ) : (
              <FiMoon size={13} className="sm:w-[16px] sm:h-[16px] md:w-[20px] md:h-[20px]" />
            )}
          </button>

          {/* Profile */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 rounded-2xl border border-slate-200 bg-white px-1 sm:px-2 md:px-3 py-0.5 sm:py-1.5 md:py-2 shadow-md dark:border-slate-700 dark:bg-slate-900">
            <img
              src={AdminProfile}
              alt="Admin"
              className="h-5 w-5 sm:h-8 sm:w-8 md:h-11 md:w-11 rounded-full border-2 border-cyan-500 object-cover"
              onError={(e) => {
                e.target.src = "https://i.pravatar.cc/100";
              }}
            />

            <div className="hidden sm:block">
              <h4 className="text-xs sm:text-sm md:text-base font-bold text-slate-800 dark:text-white truncate max-w-[50px] sm:max-w-[70px] md:max-w-none">
                Son Pratap
              </h4>
              <p className="hidden md:block text-[8px] sm:text-[10px] md:text-xs text-slate-500 dark:text-slate-400">
                Administrator
              </p>
            </div>

            {/* Mobile only - show user icon instead of name */}
            <div className="sm:hidden">
              <FiUser className="text-slate-600 dark:text-slate-300" size={11} />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;