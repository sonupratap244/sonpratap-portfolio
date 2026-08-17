import { motion } from "framer-motion";
import { FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL || "https://portfolio-backend-7e9e.onrender.com/api";

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/experience`);
      if (res.data.success) {
        setExperiences(res.data.data);
      }
    } catch (err) {
      console.log("Error fetching experiences:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const sortedExperiences = [...experiences].sort((a, b) => {
    if (a.status === "Current" && b.status !== "Current") return -1;
    if (b.status === "Current" && a.status !== "Current") return 1;
    return new Date(b.startDate || b.createdAt) - new Date(a.startDate || a.createdAt);
  });

  return (
    <section className="min-h-screen bg-slate-50 py-16 sm:py-20 md:py-24 transition-all duration-500 dark:bg-[#030712]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-16 md:mb-20 text-center"
        >
          <span className="inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 sm:px-5 py-1.5 sm:py-2 text-sm font-semibold text-cyan-500">
            Experience
          </span>

          <h1 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
            My Professional{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Journey
            </span>
          </h1>

          <p className="mx-auto mt-4 sm:mt-5 max-w-3xl text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 px-4 sm:px-0">
            My professional journey includes Full Stack Development and building scalable enterprise applications.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500 dark:text-slate-400 text-lg">No experiences found</p>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-4 sm:left-5 top-0 h-full w-0.5 sm:w-1 rounded bg-gradient-to-b from-cyan-500 via-indigo-500 to-purple-500 md:left-1/2 md:-translate-x-1/2"></div>

            {sortedExperiences.map((exp, index) => (
              <motion.div
                key={exp._id || index}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: Math.min(index * 0.1, 0.5) }}
                className={`relative mb-12 sm:mb-16 flex w-full ${
                  index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                }`}
              >
                <div className="absolute left-4 sm:left-5 top-8 sm:top-10 z-20 flex h-8 w-8 sm:h-10 sm:w-10 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg md:left-1/2">
                  <FaBriefcase className="text-xs sm:text-sm" />
                </div>

                <div className={`ml-12 sm:ml-14 md:ml-0 w-full rounded-2xl sm:rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5 sm:p-7 md:p-8 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700 dark:bg-[#0B1120]/80 md:w-[45%] ${
                  index % 2 === 0 ? "md:mr-[5%]" : "md:ml-[5%]"
                }`}>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                      {exp.role}
                    </h2>
                    <span className={`shrink-0 rounded-full px-3 sm:px-4 py-1 text-xs font-bold ${
                      exp.status === "Current" 
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                    }`}>
                      {exp.status || "Completed"}
                    </span>
                  </div>

                  <h3 className="mt-1 sm:mt-2 text-base sm:text-lg font-semibold text-cyan-500">
                    {exp.company}
                  </h3>

                  <div className="mt-2 sm:mt-3 flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    <FaCalendarAlt className="text-cyan-500 shrink-0" />
                    <span>{exp.duration}</span>
                  </div>

                  <p className="mt-4 sm:mt-5 text-sm sm:text-base leading-6 sm:leading-7 md:leading-8 text-slate-600 dark:text-slate-400">
                    {exp.description}
                  </p>

                  {exp.skills && exp.skills.length > 0 && (
                    <div className="mt-4 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-cyan-500/10 px-2.5 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-sm font-medium text-cyan-500"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Experience;