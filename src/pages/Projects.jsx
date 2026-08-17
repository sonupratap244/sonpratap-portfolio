import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { useState, useEffect } from "react";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL || "https://portfolio-backend-7e9e.onrender.com/api";
  const BASE_URL = API.replace('/api', '');

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/project`);
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.log("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const getImageUrl = (filename) => {
    if (!filename) return null;
    return `${BASE_URL}/uploads/projects/${filename}`;
  };

  const defaultImage = "https://picsum.photos/900/600?random=";

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-cyan-50 py-20 dark:from-[#020617] dark:via-[#071426] dark:to-black">
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-purple-600/20 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10 sm:mb-12 md:mb-16 text-center"
        >
          <span className="inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 sm:px-5 py-1.5 sm:py-2 text-sm font-semibold text-cyan-500">
            My Projects
          </span>

          <h1 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white">
            Featured{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Work
            </span>
          </h1>

          <p className="mx-auto mt-4 sm:mt-6 max-w-3xl text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 text-slate-600 dark:text-slate-400 px-4 sm:px-0">
            A collection of premium full-stack applications built with modern
            technologies and scalable architecture.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500 dark:text-slate-400 text-lg">No projects found</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8 md:gap-10 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => {
              const imageUrl = project.image ? getImageUrl(project.image) : `${defaultImage}${index + 1}`;
              const techArray = project.tech ? (typeof project.tech === 'string' ? project.tech.split(',').map(t => t.trim()) : project.tech) : [];

              return (
                <motion.div
                  key={project._id || index}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 bg-white/70 shadow-[0_20px_50px_rgba(0,0,0,.10)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_30px_70px_rgba(0,0,0,.18)] dark:bg-[#08111f]/80 dark:border-slate-700"
                >
                  <div className="relative overflow-hidden h-48 sm:h-52 md:h-56 lg:h-60">
                    <img
                      src={imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = `${defaultImage}${index + 1}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                  </div>

                  <div className="p-5 sm:p-6 md:p-7">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      {project.title}
                    </h2>

                    <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-6 sm:leading-7 text-slate-600 dark:text-slate-400 line-clamp-3">
                      {project.description}
                    </p>

                    {techArray.length > 0 && (
                      <div className="mt-4 sm:mt-5 md:mt-6 flex flex-wrap gap-1.5 sm:gap-2">
                        {techArray.slice(0, 4).map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs md:text-sm font-semibold text-cyan-500"
                          >
                            {item}
                          </span>
                        ))}
                        {techArray.length > 4 && (
                          <span className="rounded-full border border-slate-300 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-slate-500 dark:border-slate-600 dark:text-slate-400">
                            +{techArray.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-5 sm:mt-6 md:mt-8 flex flex-wrap gap-2 sm:gap-3">
                      {project.live ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 sm:px-5 py-2 sm:py-3 text-sm font-bold text-white shadow-lg transition hover:scale-105"
                        >
                          Live
                          <FiExternalLink className="text-xs sm:text-sm" />
                        </a>
                      ) : (
                        <button
                          disabled
                          className="flex items-center gap-1.5 sm:gap-2 rounded-xl bg-slate-300 px-4 sm:px-5 py-2 sm:py-3 text-sm font-bold text-white cursor-not-allowed"
                        >
                          Live
                          <FiExternalLink className="text-xs sm:text-sm" />
                        </button>
                      )}

                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 sm:gap-2 rounded-xl border border-slate-300 px-4 sm:px-5 py-2 sm:py-3 text-sm font-bold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-500 dark:border-slate-700 dark:text-white"
                        >
                          Code
                          <FiGithub className="text-xs sm:text-sm" />
                        </a>
                      ) : (
                        <button
                          disabled
                          className="flex items-center gap-1.5 sm:gap-2 rounded-xl border border-slate-300 px-4 sm:px-5 py-2 sm:py-3 text-sm font-bold text-slate-400 cursor-not-allowed dark:border-slate-700 dark:text-slate-600"
                        >
                          Code
                          <FiGithub className="text-xs sm:text-sm" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;