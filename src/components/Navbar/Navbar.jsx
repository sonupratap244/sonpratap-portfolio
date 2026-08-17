import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { FiMoon, FiSun } from "react-icons/fi";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const navItems = [
        "Home",
        "About",
        "Skills",
        "Projects",
        "Experience",
        "Contact",
    ];

    return (
        <header className="fixed top-0 left-0 z-50 w-full">
            <div className="mx-auto mt-5 flex w-[95%] max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-6 py-4 shadow-2xl backdrop-blur-xl dark:bg-white/5">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">

                    <div className="relative">

                        <img
                            src={Logo}
                            alt="Son Pratap"
                            className="h-14 w-14 rounded-2xl object-cover border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                        />

                        <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500 dark:border-[#08111f]"></span>

                    </div>

                    <div>

                        <h2 className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-2xl font-black tracking-wide text-transparent">
                            Son Pratap
                        </h2>

                        <p className="text-xs font-medium tracking-[3px] uppercase text-slate-500 dark:text-slate-400">
                            Full Stack Developer
                        </p>

                    </div>

                </Link>

                {/* Desktop Menu */}
                <nav className="hidden items-center gap-8 lg:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item}
                            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                            className="relative text-sm font-medium text-gray-700 transition duration-300 hover:text-cyan-500 dark:text-gray-200"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* Right Side */}
                <div className="hidden items-center gap-4 lg:flex">


                    <button
                        onClick={toggleTheme}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-500/30 bg-white/10 text-xl text-cyan-500 backdrop-blur-lg transition hover:scale-110 hover:bg-cyan-500 hover:text-white"
                    >
                        {theme === "dark" ? <FiSun /> : <FiMoon />}
                    </button>

                    <button
                        onClick={() => navigate("/contact")}
                        className="rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40"
                    >
                        Hire Me
                    </button>


                </div>

                {/* Mobile Icon */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-3xl lg:hidden"
                >
                    {menuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
                </button>
            </div>


            {/* Premium Mobile Menu */}
            {menuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[999] bg-white/70 backdrop-blur-xl dark:bg-black/70 lg:hidden"
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="absolute right-5 top-5 z-[100] flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 shadow-lg transition-all duration-300 hover:rotate-90 hover:bg-cyan-500 hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    >
                        <HiX size={22} />
                    </button>

                    {/* Menu Card */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.3,
                            type: "spring",
                            stiffness: 130,
                        }}
                        className="absolute left-1/2 top-1/2 z-10 w-[88%] max-w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-slate-200 bg-white/95 px-6 py-4 shadow-[0_15px_45px_rgba(0,0,0,.12)] backdrop-blur-2xl dark:border-slate-700 dark:bg-[#08111f]/95"
                    >
                        {/* Logo */}
                        <div className="mb-3 flex flex-col items-center">
                            <img
                                src={Logo}
                                alt="Logo"
                                className="h-14 w-14 rounded-full border-2 border-cyan-400 object-cover shadow-[0_0_20px_rgba(6,182,212,.6)]"
                            />

                            <h2 className="mt-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-lg font-bold text-transparent">
                                Son Pratap
                            </h2>

                            <p className="mt-1 text-[10px] uppercase tracking-[2px] text-slate-500 dark:text-slate-400">
                                Full Stack Developer
                            </p>
                        </div>

                        {/* Navigation */}
                        <div className="flex flex-col items-center gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item}
                                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                    onClick={() => setMenuOpen(false)}
                                    className="w-full rounded-xl py-1.5 text-center text-base font-semibold text-slate-800 transition-all duration-300 hover:bg-cyan-500/10 hover:text-cyan-600 dark:text-white dark:hover:bg-cyan-500/20 dark:hover:text-cyan-400"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>

                        {/* Bottom Buttons */}
                        <div className="mt-3 flex items-center justify-center gap-3">
                            <button
                                onClick={toggleTheme}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/30 bg-slate-100 text-cyan-600 transition-all duration-300 hover:scale-110 hover:bg-cyan-500 hover:text-white dark:bg-slate-800 dark:text-cyan-400"
                            >
                                {theme === "dark" ? (
                                    <FiSun size={18} />
                                ) : (
                                    <FiMoon size={18} />
                                )}
                            </button>

                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    navigate("/contact");
                                }}
                                className="rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40"
                            >
                                Hire Me
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </header>
    );
}

export default Navbar;