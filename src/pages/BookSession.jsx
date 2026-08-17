// pages/BookSession.jsx
import { motion } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaVideo,
  FaPhone,
  FaUser,
  FaEnvelope,
  FaComment,
  FaArrowLeft,
  FaCheckCircle,
  FaClock as FaClockIcon,
  FaRupeeSign,
  FaCreditCard,
  FaLock,
  FaShieldAlt,
  FaWhatsapp,
  FaGoogle,
  FaApple,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function BookSession() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    date: "",
    time: "",
    duration: "30",
    mode: "video",
    message: "",
  });
  const [selectedPayment, setSelectedPayment] = useState("card");

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    alert("Payment gateway coming soon!");
  }, []);

  const today = new Date().toISOString().split('T')[0];

  const getPrice = useCallback((duration) => {
    const prices = {
      "30": 499,
      "45": 699,
      "60": 999,
    };
    return prices[duration] || 499;
  }, []);

  const formatPrice = useCallback((amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }, []);

  const price = useMemo(() => getPrice(form.duration), [form.duration, getPrice]);

  const selectOptions = useMemo(() => ({
    duration: [
      { value: "30", label: "30 minutes - ₹499" },
      { value: "45", label: "45 minutes - ₹699" },
      { value: "60", label: "60 minutes - ₹999" },
    ],
    mode: [
      { value: "video", label: "Video Call" },
      { value: "phone", label: "Phone Call" },
      { value: "in-person", label: "In Person" },
    ],
  }), []);

  const paymentMethods = useMemo(() => [
    {
      id: "card",
      label: "Credit / Debit Card",
      sub: "Visa, Mastercard, RuPay",
      icon: FaCreditCard,
      gradient: "from-cyan-500 to-indigo-600"
    },
    {
      id: "upi",
      label: "UPI",
      sub: "Google Pay, PhonePe, Paytm",
      icon: FaPhone,
      gradient: "from-green-500 to-emerald-600"
    },
  ], []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-white to-cyan-50 py-8 sm:py-12 md:py-16 lg:py-20 transition-colors duration-300 dark:from-[#020617] dark:via-[#08111f] dark:to-[#030712]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-20 h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 top-32 h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] md:h-[420px] md:w-[420px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/2 h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px] -translate-x-1/2 rounded-full bg-purple-500/10 dark:bg-purple-500/20 blur-[120px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10 md:mb-12 text-center"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-500 transition-colors duration-200 mb-4 dark:text-slate-400 dark:hover:text-cyan-400"
          >
            <FaArrowLeft /> Back to Home
          </Link>
          <span className="block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-bold uppercase tracking-[3px] sm:tracking-[4px] text-cyan-600 dark:text-cyan-400">
            Book a Session
          </span>
          <h1 className="mt-6 sm:mt-8 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 bg-clip-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent">
            Let's Connect
          </h1>
          <p className="mx-auto mt-4 sm:mt-6 max-w-3xl text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-9 text-slate-600 dark:text-slate-400 px-4 sm:px-0">
            Book a 1-on-1 session with me. Discuss your project, ideas or
            any technical challenges you're facing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 relative overflow-hidden rounded-3xl sm:rounded-[35px] md:rounded-[40px] border border-slate-200/50 dark:border-white/10 bg-white/60 dark:bg-white/5 p-6 sm:p-8 md:p-10 shadow-[0_15px_60px_rgba(0,0,0,.08)] dark:shadow-[0_15px_60px_rgba(0,0,0,.3)] backdrop-blur-xl"
          >
            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <FaVideo className="text-cyan-600 dark:text-cyan-400 text-lg sm:text-xl" />
                  <div>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Mode</p>
                    <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-white">Video Meet</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  <FaClockIcon className="text-indigo-600 dark:text-indigo-400 text-lg sm:text-xl" />
                  <div>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Duration</p>
                    <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-white">30-60 min</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <FaCalendarAlt className="text-purple-600 dark:text-purple-400 text-lg sm:text-xl" />
                  <div>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Availability</p>
                    <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-white">Sat-Sun, 10AM-9PM</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-800/50 pl-9 sm:pl-11 pr-4 py-3 sm:py-4 text-sm sm:text-base text-slate-800 dark:text-white shadow-sm backdrop-blur-sm outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-800/50 pl-9 sm:pl-11 pr-4 py-3 sm:py-4 text-sm sm:text-base text-slate-800 dark:text-white shadow-sm backdrop-blur-sm outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                      type="tel"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-800/50 pl-9 sm:pl-11 pr-4 py-3 sm:py-4 text-sm sm:text-base text-slate-800 dark:text-white shadow-sm backdrop-blur-sm outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Date *
                    </label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        min={today}
                        required
                        className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-800/50 pl-9 sm:pl-11 pr-4 py-3 sm:py-4 text-sm sm:text-base text-slate-800 dark:text-white shadow-sm backdrop-blur-sm outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Time *
                    </label>
                    <div className="relative">
                      <FaClock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                      <input
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-800/50 pl-9 sm:pl-11 pr-4 py-3 sm:py-4 text-sm sm:text-base text-slate-800 dark:text-white shadow-sm backdrop-blur-sm outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Duration
                    </label>
                    <select
                      name="duration"
                      value={form.duration}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-800/50 px-4 py-3 sm:py-4 text-sm sm:text-base text-slate-800 dark:text-white shadow-sm backdrop-blur-sm outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                    >
                      {selectOptions.duration.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Session Mode
                    </label>
                    <select
                      name="mode"
                      value={form.mode}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-800/50 px-4 py-3 sm:py-4 text-sm sm:text-base text-slate-800 dark:text-white shadow-sm backdrop-blur-sm outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                    >
                      {selectOptions.mode.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Message (Optional)
                  </label>
                  <div className="relative">
                    <FaComment className="absolute left-3 sm:left-4 top-4 text-slate-400 text-sm" />
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Tell me what you'd like to discuss..."
                      className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-800/50 pl-9 sm:pl-11 pr-4 py-3 sm:py-4 text-sm sm:text-base text-slate-800 dark:text-white shadow-sm backdrop-blur-sm outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5 sm:space-y-6"
          >
            {/* Pricing Card */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/50 dark:border-white/10 bg-gradient-to-br from-cyan-500/5 via-indigo-500/5 to-purple-500/5 dark:from-cyan-500/10 dark:via-indigo-500/10 dark:to-purple-500/10 p-6 sm:p-8 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <FaRupeeSign className="text-cyan-600 dark:text-cyan-400" />
                Pricing
              </h3>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm">
                  <span className="text-sm text-slate-700 dark:text-slate-300">30 min Session</span>
                  <span className="text-lg font-bold text-cyan-600 dark:text-cyan-400">₹99</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm">
                  <span className="text-sm text-slate-700 dark:text-slate-300">45 min Session</span>
                  <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">₹199</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-purple-500/30">
                  <span className="text-sm text-slate-700 dark:text-slate-300">60 min Session</span>
                  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">₹299</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/50 dark:border-white/10 bg-white/60 dark:bg-white/5 p-6 sm:p-8 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
                <FaCreditCard className="text-indigo-600 dark:text-indigo-400" />
                Payment Method
              </h3>
              <div className="space-y-3">
                {paymentMethods.map(method => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                      selectedPayment === method.id
                        ? "border-cyan-500 bg-cyan-500/10 dark:bg-cyan-500/20"
                        : "border-slate-200 dark:border-white/10 hover:border-cyan-500/50"
                    }`}
                  >
                    <div className={`h-10 w-10 rounded-full bg-gradient-to-r ${method.gradient} flex items-center justify-center text-white shrink-0`}>
                      <method.icon />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm sm:text-base text-slate-800 dark:text-white">{method.label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{method.sub}</p>
                    </div>
                    {selectedPayment === method.id && (
                      <FaCheckCircle className="text-cyan-500 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/50 dark:border-white/10 bg-gradient-to-br from-cyan-500/5 via-indigo-500/5 to-purple-500/5 dark:from-cyan-500/10 dark:via-indigo-500/10 dark:to-purple-500/10 p-6 sm:p-8 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Summary
              </h3>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Duration</span>
                  <span className="font-semibold text-slate-800 dark:text-white">{form.duration} min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Date</span>
                  <span className="font-semibold text-slate-800 dark:text-white">{form.date || "Not selected"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Time</span>
                  <span className="font-semibold text-slate-800 dark:text-white">{form.time || "Not selected"}</span>
                </div>
                <div className="border-t border-slate-200 dark:border-white/10 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-slate-800 dark:text-white">Total</span>
                    <span className="text-2xl font-black bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                      {formatPrice(price)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="mt-6 w-full flex items-center justify-center gap-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 py-4 sm:py-5 text-base sm:text-lg md:text-xl font-bold text-white shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <FaLock />
                Pay & Book Session
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <FaShieldAlt className="text-green-500" />
                Secure Payment • 100% Protected
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-center gap-4 py-2">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <FaGoogle className="text-blue-500" />
                <span>Google</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <FaApple className="text-slate-700 dark:text-white" />
                <span>Apple</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <FaWhatsapp className="text-green-500" />
                <span>WhatsApp</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
        >
          <div className="text-center p-4 sm:p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-slate-200/50 dark:border-white/10">
            <div className="flex justify-center mb-3">
              <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <FaCheckCircle className="text-cyan-600 dark:text-cyan-400 text-xl" />
              </div>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-white">Easy Booking</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Simple and quick session booking</p>
          </div>
          <div className="text-center p-4 sm:p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-slate-200/50 dark:border-white/10">
            <div className="flex justify-center mb-3">
              <div className="h-12 w-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <FaClockIcon className="text-indigo-600 dark:text-indigo-400 text-xl" />
              </div>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-white">Flexible Timing</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Choose your preferred time slot</p>
          </div>
          <div className="text-center p-4 sm:p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-slate-200/50 dark:border-white/10">
            <div className="flex justify-center mb-3">
              <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <FaLock className="text-purple-600 dark:text-purple-400 text-xl" />
              </div>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-white">Secure Payment</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">100% protected transactions</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default BookSession;