import { motion } from "framer-motion";
import { FiArrowRight, FiDownload, FiCalendar } from "react-icons/fi";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Profile from "../../assets/profile.jpg";

function Hero() {
  const [profileData, setProfileData] = useState({
    profileImage: "",
    resume: "",
    name: "",
    designation: "",
    shortDescription: "",
  });
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL || "https://portfolio-backend-7e9e.onrender.com/api";
  const BASE_URL = API.replace('/api', '');

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

  const getImageUrl = (filename) => {
    if (!filename) return null;
    return `${BASE_URL}/uploads/profile/${filename}`;
  };

  const getResumeUrl = (filename) => {
    if (!filename) return null;
    return `${BASE_URL}/uploads/resume/${filename}`;
  };

  const profileImage = profileData.profileImage ? getImageUrl(profileData.profileImage) : Profile;
  const resumeUrl = getResumeUrl(profileData.resume);

  const handleBookSession = () => {
    toast.success("📅 Session booking link coming soon!");
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-slate-50 to-cyan-50 py-8 sm:py-12 md:py-16 lg:py-20 dark:from-[#020617] dark:via-[#071426] dark:to-[#030712]"
    >
      <div className="absolute left-10 top-20 h-60 w-60 md:h-80 md:w-80 rounded-full bg-cyan-500/20 blur-[120px] md:blur-[150px]" />
      <div className="absolute bottom-0 right-10 h-60 w-60 md:h-96 md:w-96 rounded-full bg-purple-600/20 blur-[120px] md:blur-[150px]" />

      <div className="mx-auto flex min-h-[85vh] max-w-7xl items-center px-4 sm:px-6">
        <div className="grid w-full items-center gap-8 md:gap-12 lg:gap-16 lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-cyan-500">
              Welcome To My Portfolio
            </span>

            <h1 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-slate-900 dark:text-white">
              Hi, I'm
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                {profileData.name || "Son Pratap"}
              </span>
            </h1>

            <div className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold text-cyan-500">
              <TypeAnimation
                sequence={[
                  profileData.designation || "Full Stack Developer",
                  2000,
                  "React Developer",
                  2000,
                  "Node.js Developer",
                  2000,
                  "UI/UX Enthusiast",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>

            <p className="mt-4 sm:mt-6 max-w-xl mx-auto lg:mx-0 text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 text-slate-600 dark:text-slate-300">
              {profileData.shortDescription ||
                "I create modern, scalable and premium web applications using React, Node.js and latest technologies."}
            </p>

            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link
                to="/contact"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white shadow-xl transition hover:scale-105"
              >
                Hire Me
                {/* <FiArrowRight className="text-sm sm:text-base" /> */}
              </Link>

              {resumeUrl ? (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-slate-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-500 dark:border-slate-700 dark:text-white"
                >
                  Resume
                  {/* <FiDownload className="text-sm sm:text-base" /> */}
                </a>
              ) : (
                <button
                  disabled
                  className="flex items-center gap-2 rounded-full border border-slate-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-slate-400 cursor-not-allowed dark:border-slate-700 dark:text-slate-600"
                >
                  Resume
                  <FiDownload className="text-sm sm:text-base" />
                </button>
              )}

              <button
                onClick={() => window.location.href = '/book-session'}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 px-4 sm:px-6 py-2 sm:py-3 text-sm font-bold text-white shadow-xl transition hover:scale-105"
              >
                Book Session

              </button>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 flex justify-center [perspective:1200px]"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative"
            >
              <motion.div
                animate={{
                  rotateY: [0, 6, 0],
                  rotateX: [0, -4, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity
                }}
                className="relative h-[220px] w-[220px] sm:h-[280px] sm:w-[280px] md:h-[320px] md:w-[320px] lg:h-[350px] lg:w-[350px] xl:h-[380px] xl:w-[380px] rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 p-1 shadow-[0_20px_60px_rgba(6,182,212,.35)] md:shadow-[0_30px_100px_rgba(6,182,212,.45)]"
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-[#08111f]">
                  <img
                    src={profileImage}
                    alt={profileData.name || "Son Pratap"}
                    className="h-[190px] w-[190px] sm:h-[250px] sm:w-[250px] md:h-[290px] md:w-[290px] lg:h-[320px] lg:w-[320px] xl:h-[350px] xl:w-[350px] rounded-full object-cover shadow-2xl transition duration-500 hover:scale-105"
                    onError={(e) => {
                      e.target.src = Profile;
                    }}
                  />
                </div>
              </motion.div>

              {/* Experience Card - Mobile Adjusted */}
              <motion.div
                animate={{ rotate: [0, 4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -left-4 sm:-left-6 md:-left-8 lg:-left-10 top-10 sm:top-14 md:top-16 lg:top-20 rounded-2xl sm:rounded-3xl border border-white/20 bg-white/80 px-3 sm:px-5 md:px-6 py-2 sm:py-3 md:py-4 shadow-2xl backdrop-blur-xl dark:bg-[#111827]/80"
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-cyan-500">1+</h3>
                <p className="text-[10px] sm:text-xs md:text-sm dark:text-white">Years Exp.</p>
              </motion.div>

              {/* Project Card - Mobile Adjusted */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 lg:-bottom-5 -right-2 sm:-right-3 md:-right-4 lg:-right-5 rounded-2xl sm:rounded-3xl border border-white/20 bg-white/80 px-3 sm:px-5 md:px-6 py-2 sm:py-3 md:py-4 shadow-2xl backdrop-blur-xl dark:bg-[#111827]/80"
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-purple-500">5+</h3>
                <p className="text-[10px] sm:text-xs md:text-sm dark:text-white">Projects</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;