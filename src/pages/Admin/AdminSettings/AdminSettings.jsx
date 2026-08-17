import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../../../components/Admin/Layout";
import {
  FiSettings,
  FiMoon,
  FiMail,
  FiLock,
  FiSave,
} from "react-icons/fi";

function AdminSettings() {
  const [darkMode, setDarkMode] = useState(true);
  const [portfolioPublic, setPortfolioPublic] = useState(true);
  const [contactForm, setContactForm] = useState(true);
  const [emailNotification, setEmailNotification] = useState(true);
  const [autoReply, setAutoReply] = useState(false);

  return (
    <Layout>
      <div className="mx-auto max-w-7xl">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-black text-slate-800 dark:text-white">
            Settings
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage your portfolio settings.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid gap-6 lg:grid-cols-2">

          {/* General */}

          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-3xl bg-white p-8 shadow-xl dark:bg-[#0B1120]"
          >
            <div className="mb-6 flex items-center gap-3">
              <FiSettings className="text-3xl text-cyan-500" />
              <h2 className="text-2xl font-bold dark:text-white">
                General Settings
              </h2>
            </div>

            <div className="space-y-5">

              <div className="flex items-center justify-between">
                <span className="dark:text-white">Dark Mode</span>

                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className="h-5 w-5"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="dark:text-white">
                  Portfolio Public
                </span>

                <input
                  type="checkbox"
                  checked={portfolioPublic}
                  onChange={() =>
                    setPortfolioPublic(!portfolioPublic)
                  }
                  className="h-5 w-5"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="dark:text-white">
                  Contact Form
                </span>

                <input
                  type="checkbox"
                  checked={contactForm}
                  onChange={() => setContactForm(!contactForm)}
                  className="h-5 w-5"
                />
              </div>

            </div>

          </motion.div>

          {/* Notifications */}

          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-3xl bg-white p-8 shadow-xl dark:bg-[#0B1120]"
          >
            <div className="mb-6 flex items-center gap-3">
              <FiMail className="text-3xl text-indigo-500" />
              <h2 className="text-2xl font-bold dark:text-white">
                Notifications
              </h2>
            </div>

            <div className="space-y-5">

              <div className="flex items-center justify-between">
                <span className="dark:text-white">
                  Email Notification
                </span>

                <input
                  type="checkbox"
                  checked={emailNotification}
                  onChange={() =>
                    setEmailNotification(!emailNotification)
                  }
                  className="h-5 w-5"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="dark:text-white">
                  Auto Reply
                </span>

                <input
                  type="checkbox"
                  checked={autoReply}
                  onChange={() => setAutoReply(!autoReply)}
                  className="h-5 w-5"
                />
              </div>

            </div>

          </motion.div>

          {/* Change Email */}

          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-3xl bg-white p-8 shadow-xl dark:bg-[#0B1120]"
          >
            <h2 className="mb-6 text-2xl font-bold dark:text-white">
              Change Email
            </h2>

            <input
              placeholder="Admin Email"
              className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </motion.div>

          {/* Change Password */}

          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-3xl bg-white p-8 shadow-xl dark:bg-[#0B1120]"
          >
            <div className="mb-6 flex items-center gap-3">
              <FiLock className="text-3xl text-red-500" />

              <h2 className="text-2xl font-bold dark:text-white">
                Change Password
              </h2>
            </div>

            <div className="space-y-4">

              <input
                type="password"
                placeholder="Current Password"
                className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />

              <input
                type="password"
                placeholder="New Password"
                className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />

            </div>
          </motion.div>

        </div>

        {/* Save Button */}

        <div className="mt-10 flex justify-end">

          <button className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-8 py-4 font-bold text-white shadow-xl transition hover:scale-105">

            <FiSave />

            Save Settings

          </button>

        </div>

      </div>
    </Layout>
  );
}

export default AdminSettings;