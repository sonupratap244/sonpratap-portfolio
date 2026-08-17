import { motion } from "framer-motion";
import { FaCode, FaLaptopCode, FaRocket } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import AboutImage from "../assets/about.jpg";

function About() {
  const [profileData, setProfileData] = useState({
    aboutImage: "",
    aboutDescription: "",
    name: "",
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
    return `${BASE_URL}/uploads/about/${filename}`;
  };

  const aboutImage = profileData.aboutImage ? getImageUrl(profileData.aboutImage) : AboutImage;

  return (
    <section className="min-h-screen bg-white px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-28 transition-all duration-500 dark:bg-[#030712]">
      <div className="mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12 md:mb-16 text-center"
        >
          <p className="mb-3 text-cyan-500 font-semibold uppercase tracking-widest text-sm sm:text-base">
            About Me
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
            Passionate Full Stack Developer
          </h1>

          <p className="mx-auto mt-4 sm:mt-6 max-w-3xl text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 text-slate-600 dark:text-slate-400 px-4 sm:px-0">
            {profileData.aboutDescription || 
              "I build fast, scalable and beautiful web applications using modern technologies like React, Node.js, Express and MySQL. My goal is to create premium digital experiences with clean UI and high performance."}
          </p>
        </motion.div>

        <div className="grid items-center gap-8 md:gap-12 lg:gap-16 lg:grid-cols-2">

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 p-1 shadow-[0_15px_60px_rgba(6,182,212,.30)] sm:shadow-[0_20px_80px_rgba(6,182,212,.35)]">
              <div className="rounded-2xl sm:rounded-3xl bg-white p-2 sm:p-3 md:p-4 dark:bg-[#0B1120]">
                <img
                  src={aboutImage}
                  alt={profileData.name || "Son Pratap"}
                  className="h-[300px] sm:h-[380px] md:h-[440px] lg:h-[480px] xl:h-[520px] w-full rounded-2xl sm:rounded-3xl object-cover transition-all duration-700 hover:scale-105"
                  onError={(e) => {
                    e.target.src = AboutImage;
                  }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center lg:text-left">
              Who Am I?
            </h2>

            <p className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 text-slate-600 dark:text-slate-400 text-center lg:text-left">
              I'm a Full Stack Developer who enjoys building modern,
              responsive and user-friendly web applications. I love solving
              real-world problems with clean code and beautiful interfaces.
            </p>

            <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-5 md:gap-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 md:p-6 shadow-lg transition hover:-translate-y-2 dark:border-slate-700 dark:bg-slate-900">
                <FaCode className="mb-2 sm:mb-3 text-3xl sm:text-4xl text-cyan-500" />
                <h3 className="text-lg sm:text-xl font-bold dark:text-white">
                  Clean Code
                </h3>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  Writing scalable and maintainable applications.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 md:p-6 shadow-lg transition hover:-translate-y-2 dark:border-slate-700 dark:bg-slate-900">
                <FaLaptopCode className="mb-2 sm:mb-3 text-3xl sm:text-4xl text-indigo-500" />
                <h3 className="text-lg sm:text-xl font-bold dark:text-white">
                  Modern UI
                </h3>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  Creating premium responsive interfaces.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 md:p-6 shadow-lg transition hover:-translate-y-2 dark:border-slate-700 dark:bg-slate-900">
                <FaRocket className="mb-2 sm:mb-3 text-3xl sm:text-4xl text-purple-500" />
                <h3 className="text-lg sm:text-xl font-bold dark:text-white">
                  Fast Performance
                </h3>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  Optimized websites with smooth user experience.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default About;