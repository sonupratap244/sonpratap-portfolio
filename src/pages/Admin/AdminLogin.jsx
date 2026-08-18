// AdminLogin.jsx - Updated with API integration
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL || "https://portfolio-backend-7e9e.onrender.com/api";

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API}/admin/login`, { email, password });

      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("adminData", JSON.stringify(res.data.data));
        toast.success(res.data.message);
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.log("Login error:", err);
      toast.error(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-purple-100 dark:from-[#020617] dark:via-[#071426] dark:to-black">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/30 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-600/30 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-[360px] rounded-[28px] border border-white/40 bg-white/70 p-7 shadow-2xl backdrop-blur-2xl dark:border-slate-700 dark:bg-[#08111f]/80"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-3xl text-white shadow-lg">
          <FiLock />
        </div>

        <h1 className="mt-5 text-center text-3xl font-black text-slate-900 dark:text-white">
          Admin Login
        </h1>
        <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
          Manage Portfolio Dashboard
        </p>

        <form onSubmit={login} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="admin@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white/60 px-4 py-3 outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white/60 px-4 py-3 pr-12 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 py-3 font-bold text-white shadow-lg transition hover:scale-[1.03] disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login Dashboard"}
          </button>
        </form>

       
      </motion.div>
    </div>
  );
}

export default AdminLogin;