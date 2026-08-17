import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaArrowUp,
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaGlobe,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

function Footer() {
  const year = new Date().getFullYear();
  const [profileData, setProfileData] = useState({
    name: "Son Pratap",
    github: "",
    linkedin: "",
    instagram: "",
    twitter: "",
    facebook: "",
    youtube: "",
    website: "",
    portfolio: "",
  });
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL || "https://portfolio-backend-7e9e.onrender.com/api";

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/profile`);
      if (res.data.success) {
        setProfileData(res.data.data);
      }
    } catch (err) {
      console.log("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      href: profileData.github,
      label: "GitHub",
      bg: "bg-slate-900",
      hover: "hover:bg-cyan-500",
    },
    {
      icon: FaLinkedinIn,
      href: profileData.linkedin,
      label: "LinkedIn",
      bg: "bg-blue-600",
      hover: "hover:bg-cyan-500",
    },
    {
      icon: FaInstagram,
      href: profileData.instagram,
      label: "Instagram",
      bg: "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500",
      hover: "hover:scale-110",
    },
    {
      icon: FaTwitter,
      href: profileData.twitter,
      label: "Twitter",
      bg: "bg-sky-500",
      hover: "hover:bg-sky-600",
    },
    {
      icon: FaFacebook,
      href: profileData.facebook,
      label: "Facebook",
      bg: "bg-blue-700",
      hover: "hover:bg-blue-800",
    },
    {
      icon: FaYoutube,
      href: profileData.youtube,
      label: "YouTube",
      bg: "bg-red-600",
      hover: "hover:bg-red-700",
    },
    {
      icon: FaInstagram,
      href: profileData.website || profileData.portfolio,
      label: "Website",
      bg: "bg-emerald-600",
      hover: "hover:bg-emerald-700",
    },
  ];

  const activeSocialLinks = socialLinks.filter((item) => item.href);

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900 transition-all duration-500 dark:border-slate-800 dark:from-[#020617] dark:via-[#08111f] dark:to-black dark:text-white">

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-10 h-64 w-64 rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-purple-500/20 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-5 py-10 sm:py-12">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">

          <div className="rounded-3xl border border-slate-200 bg-white/60 p-5 sm:p-6 shadow-xl backdrop-blur-xl dark:border-slate-700 dark:bg-white/5">
            <div className="flex items-center gap-3 sm:gap-4">
              <img
                src={Logo}
                alt="Logo"
                className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl border-2 border-cyan-400 object-cover shadow-[0_0_25px_rgba(6,182,212,.5)]"
              />
              <div>
                <h2 className="bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 bg-clip-text text-xl sm:text-2xl font-black text-transparent">
                  {profileData.name || "Son Pratap"}
                </h2>
                <p className="text-[10px] sm:text-xs uppercase tracking-[2px] text-slate-500 dark:text-slate-400">
                  Developer
                </p>
              </div>
            </div>
            <p className="mt-4 sm:mt-5 text-sm leading-6 sm:leading-7 text-slate-600 dark:text-slate-400">
              Full Stack Developer creating modern, scalable and premium web experiences
              using React, Node.js and latest technologies.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/60 p-5 sm:p-6 shadow-xl backdrop-blur-xl dark:border-slate-700 dark:bg-white/5">
            <h3 className="mb-4 sm:mb-5 text-lg sm:text-xl font-bold">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {links.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-600 transition-all duration-300 hover:bg-cyan-500/10 hover:translate-x-1 hover:text-cyan-500 dark:text-slate-400 dark:hover:text-cyan-400"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/60 p-5 sm:p-6 shadow-xl backdrop-blur-xl dark:border-slate-700 dark:bg-white/5">
            <h3 className="mb-4 sm:mb-5 text-lg sm:text-xl font-bold">Connect</h3>
            <p className="mb-4 sm:mb-6 text-sm text-slate-600 dark:text-slate-400">
              Let's connect and build something amazing together.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              {activeSocialLinks.length > 0 ? (
                activeSocialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl ${social.bg} text-white shadow-lg transition duration-300 hover:-translate-y-2 ${social.hover}`}
                    aria-label={social.label}
                  >
                    <social.icon className="text-base sm:text-lg" />
                  </a>
                ))
              ) : (
                <p className="text-sm text-slate-400 dark:text-slate-500">
                  No social links available
                </p>
              )}
            </div>

            {(profileData.website || profileData.portfolio) && (
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                <a
                  href={profileData.website || profileData.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cyan-500 hover:underline flex items-center gap-2"
                >
                  <FaInstagram className="text-sm" />
                  {profileData.website || profileData.portfolio}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 sm:mt-10 flex flex-col items-center justify-between gap-4 sm:gap-5 border-t border-slate-200 pt-5 sm:pt-6 dark:border-slate-800 md:flex-row">
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
            © {year} {profileData.name || "Son Pratap"}. All Rights Reserved.
          </p>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="group flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-xl transition duration-300 hover:scale-110"
          >
            <FaArrowUp className="transition group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;