import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [profileData, setProfileData] = useState({
    email: "",
    mobile: "",
    location: "",
    github: "",
    linkedin: "",
  });
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL || "https://portfolio-backend-7e9e.onrender.com/api";

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API}/profile`);
      if (res.data.success) {
        setProfileData(res.data.data);
      }
    } catch (err) {
      console.log("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.mobile || !form.message) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${API}/contact`, form);
      toast.success(res.data.message);
      setForm({
        name: "",
        email: "",
        mobile: "",
        message: "",
      });
    } catch (err) {
      console.log("Error sending message:", err);
      toast.error(err.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-white to-cyan-50 py-16 sm:py-20 md:py-24 lg:py-28 transition-all duration-700 dark:from-[#020617] dark:via-[#08111f] dark:to-black">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
          }}
          className="absolute -left-32 top-20 h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96 rounded-full bg-cyan-500/20 blur-[120px] sm:blur-[140px] md:blur-[160px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
          }}
          className="absolute right-0 top-32 h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] md:h-[420px] md:w-[420px] rounded-full bg-indigo-500/20 blur-[140px] sm:blur-[150px] md:blur-[170px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute bottom-0 left-1/2 h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px] -translate-x-1/2 rounded-full bg-purple-500/20 blur-[120px] sm:blur-[130px] md:blur-[150px]"
        />
      </div>

      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right,#94a3b8 1px,transparent 1px),linear-gradient(to bottom,#94a3b8 1px,transparent 1px)",
            backgroundSize: "30px 30px sm:40px 40px md:50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 text-center"
        >
          <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-bold uppercase tracking-[3px] sm:tracking-[4px] text-cyan-500">
            Contact
          </span>
          <h1 className="mt-6 sm:mt-8 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 bg-clip-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent">
            Let's Create
            <br className="sm:hidden" />
            <span className="hidden sm:inline"><br /></span>
            Something Amazing
          </h1>
          <p className="mx-auto mt-4 sm:mt-6 md:mt-8 max-w-3xl text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-9 text-slate-600 dark:text-slate-400 px-4 sm:px-0">
            Whether you have a startup, enterprise application or freelance
            project, I'd love to hear about it. Let's turn your ideas into
            beautiful digital experiences.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:gap-10 md:gap-12 lg:gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white text-center lg:text-left">
              Available For
              <span className="block bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                Freelance
              </span>
            </h2>
            <p className="mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-9 text-slate-600 dark:text-slate-400 text-center lg:text-left">
              I'm currently available for freelance work, full-stack development,
              React applications, backend APIs and premium UI/UX projects.
            </p>

            <div className="mt-8 sm:mt-10 md:mt-12 space-y-4 sm:space-y-5 md:space-y-6">
              <motion.div
                whileHover={{ y: -5, rotate: 0 }}
                className="group rounded-2xl sm:rounded-[28px] md:rounded-[32px] border border-white/20 bg-white/50 p-5 sm:p-6 md:p-8 shadow-xl backdrop-blur-xl transition-all dark:bg-white/5"
              >
                <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
                  <div className="flex h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-2xl sm:rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xl sm:text-2xl md:text-3xl text-white shadow-xl transition group-hover:rotate-12">
                    <FaEnvelope />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold dark:text-white">Email</h3>
                    <p className="mt-1 sm:mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 truncate">
                      {profileData.email || "sonpratap244@gmail.com"}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, rotate: 0 }}
                className="group rounded-2xl sm:rounded-[28px] md:rounded-[32px] border border-white/20 bg-white/50 p-5 sm:p-6 md:p-8 shadow-xl backdrop-blur-xl transition-all dark:bg-white/5"
              >
                <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
                  <div className="flex h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-2xl sm:rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 text-xl sm:text-2xl md:text-3xl text-white shadow-xl transition group-hover:rotate-12">
                    <FaPhoneAlt />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold dark:text-white">Phone</h3>
                    <p className="mt-1 sm:mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                      {profileData.mobile || "+91 8303255391"}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, rotate: 0 }}
                className="group rounded-2xl sm:rounded-[28px] md:rounded-[32px] border border-white/20 bg-white/50 p-5 sm:p-6 md:p-8 shadow-xl backdrop-blur-xl transition-all dark:bg-white/5"
              >
                <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
                  <div className="flex h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-2xl sm:rounded-3xl bg-gradient-to-r from-purple-500 to-pink-600 text-xl sm:text-2xl md:text-3xl text-white shadow-xl transition group-hover:rotate-12">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold dark:text-white">Location</h3>
                    <p className="mt-1 sm:mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                      {profileData.location || "Noida, Uttar Pradesh, India"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center lg:justify-start gap-4 sm:gap-5">
              <motion.a
                whileHover={{ y: -6, scale: 1.1 }}
                href={profileData.github || "https://github.com/sonpratap"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-white/20 bg-white/30 text-xl sm:text-2xl text-slate-700 shadow-xl backdrop-blur-xl transition dark:bg-white/10 dark:text-white"
              >
                <FaGithub />
              </motion.a>
              <motion.a
                whileHover={{ y: -6, scale: 1.1 }}
                href={profileData.linkedin || "https://linkedin.com/in/sonpratap"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-white/20 bg-gradient-to-r from-cyan-500 to-indigo-600 text-xl sm:text-2xl text-white shadow-xl"
              >
                <FaLinkedinIn />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 relative overflow-hidden rounded-3xl sm:rounded-[35px] md:rounded-[40px] border border-white/20 bg-white/40 p-6 sm:p-8 md:p-10 shadow-[0_15px_60px_rgba(0,0,0,.15)] backdrop-blur-2xl dark:bg-white/5"
          >
            <div className="absolute -right-20 -top-20 h-52 w-52 sm:h-60 sm:w-60 md:h-72 md:w-72 rounded-full bg-cyan-500/20 blur-[100px] sm:blur-[110px] md:blur-[120px]" />
            <div className="absolute -bottom-20 -left-20 h-52 w-52 sm:h-60 sm:w-60 md:h-72 md:w-72 rounded-full bg-purple-500/20 blur-[100px] sm:blur-[110px] md:blur-[120px]" />

            <h2 className="relative mb-6 sm:mb-8 md:mb-10 text-2xl sm:text-3xl md:text-4xl font-black dark:text-white text-center lg:text-left">
              Send Message
            </h2>

            <form onSubmit={handleSubmit} className="relative space-y-4 sm:space-y-5 md:space-y-6">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full rounded-xl sm:rounded-2xl border border-white/20 bg-white/40 px-4 sm:px-5 md:px-6 py-4 sm:py-5 text-base sm:text-lg shadow-lg backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-sm sm:placeholder:text-base placeholder:text-slate-500 focus:scale-[1.01] sm:focus:scale-[1.02] focus:border-cyan-500 dark:bg-white/5 dark:text-white"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full rounded-xl sm:rounded-2xl border border-white/20 bg-white/40 px-4 sm:px-5 md:px-6 py-4 sm:py-5 text-base sm:text-lg shadow-lg backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-sm sm:placeholder:text-base placeholder:text-slate-500 focus:scale-[1.01] sm:focus:scale-[1.02] focus:border-cyan-500 dark:bg-white/5 dark:text-white"
              />
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="w-full rounded-xl sm:rounded-2xl border border-white/20 bg-white/40 px-4 sm:px-5 md:px-6 py-4 sm:py-5 text-base sm:text-lg shadow-lg backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-sm sm:placeholder:text-base placeholder:text-slate-500 focus:scale-[1.01] sm:focus:scale-[1.02] focus:border-cyan-500 dark:bg-white/5 dark:text-white"
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                placeholder="Tell me about your project..."
                className="w-full rounded-xl sm:rounded-2xl border border-white/20 bg-white/40 px-4 sm:px-5 md:px-6 py-4 sm:py-5 text-base sm:text-lg shadow-lg backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-sm sm:placeholder:text-base placeholder:text-slate-500 focus:scale-[1.01] sm:focus:scale-[1.02] focus:border-cyan-500 dark:bg-white/5 dark:text-white"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 py-4 sm:py-5 text-base sm:text-lg md:text-xl font-bold text-white shadow-xl transition-all disabled:opacity-50"
              >
                <FaPaperPlane className="text-sm sm:text-base" />
                {loading ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;