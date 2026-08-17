import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGitAlt,
  FaBootstrap,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiRedux,
  SiPostman,
} from "react-icons/si";

const skillGroups = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 95, icon: <FaReact className="text-cyan-500" /> },
      { name: "JavaScript", level: 90, icon: <FaJs className="text-yellow-400" /> },
      { name: "HTML", level: 95, icon: <FaHtml5 className="text-orange-500" /> },
      { name: "CSS", level: 90, icon: <FaCss3Alt className="text-blue-500" /> },
      { name: "Tailwind", level: 92, icon: <SiTailwindcss className="text-cyan-400" /> },
      { name: "Bootstrap", level: 90, icon: <FaBootstrap className="text-purple-500" /> },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 90, icon: <FaNodeJs className="text-green-500" /> },
      { name: "Express.js", level: 88, icon: <SiExpress /> },
      { name: "Redux", level: 90, icon: <SiRedux className="text-purple-500" /> },
      { name: "MySQL", level: 90, icon: <SiMysql className="text-blue-500" /> },
      { name: "MongoDB", level: 80, icon: <SiMongodb className="text-green-600" /> },
      { name: "Git", level: 92, icon: <FaGitAlt className="text-orange-500" /> },
    ],
  },
];

function Skills() {
  return (
    <section className="min-h-screen bg-slate-50 py-24 transition-all duration-500 dark:bg-[#030712]">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          className="mb-20 text-center"
        >
          <span className="rounded-full bg-cyan-500/10 px-5 py-2 text-cyan-500 font-semibold">
            My Skills
          </span>

          <h1 className="mt-6 text-5xl font-black text-slate-900 dark:text-white">
            Technologies I Work With
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600 dark:text-slate-400">
            I specialize in building modern full-stack web applications
            with scalable architecture and premium user experiences.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-10 lg:grid-cols-2">

          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: .6, delay: index * .2 }}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition-all hover:-translate-y-2 dark:border-slate-800 dark:bg-[#0B1120]"
            >

              <h2 className="mb-8 text-3xl font-bold text-cyan-500">
                {group.title}
              </h2>

              <div className="space-y-6">

                {group.skills.map((skill) => (
                  <div key={skill.name}>

                    <div className="mb-2 flex items-center justify-between">

                      <div className="flex items-center gap-3 text-lg font-semibold dark:text-white">
                        {skill.icon}
                        {skill.name}
                      </div>

                      <span className="text-cyan-500">
                        {skill.level}%
                      </span>

                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1 }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600"
                      />

                    </div>

                  </div>
                ))}

              </div>

            </motion.div>
          ))}

        </div>

        {/* Bottom Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          className="mt-20 rounded-3xl bg-gradient-to-r from-cyan-500 to-indigo-600 p-10 text-center text-white shadow-2xl"
        >
          <h2 className="text-4xl font-black">
            Always Learning 
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg">
            Technology evolves every day, and I'm constantly learning new
            frameworks, tools, and best practices to build better products.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

export default Skills;