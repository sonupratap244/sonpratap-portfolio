// AdminDashboard.jsx (Updated with API integration)
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Admin/Layout";
import {
  FiMail,
  FiUsers,
  FiMessageSquare,
  FiSearch,
  FiCheck,
  FiEye,
  FiTrash2,
  FiInbox,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, unread: 0, read: 0 });

  const perPage = 5;
  const API = import.meta.env.VITE_API_URL || "https://portfolio-backend-7e9e.onrender.com/api";

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/contact`);
      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (err) {
      console.log("Error fetching messages:", err);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API}/contact/stats`);
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.log("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchStats();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "read" ? "unread" : "read";
      const res = await axios.put(`${API}/contact/${id}`, { status: newStatus });
      if (res.data.success) {
        toast.success(`Message marked as ${newStatus}`);
        fetchMessages();
        fetchStats();
      }
    } catch (err) {
      console.log("Error updating status:", err);
      toast.error("Failed to update status");
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await axios.delete(`${API}/contact/${id}`);
      if (res.data.success) {
        toast.success("Message deleted successfully");
        fetchMessages();
        fetchStats();
      }
    } catch (err) {
      console.log("Error deleting message:", err);
      toast.error("Failed to delete message");
    }
  };

  const filteredMessages = messages.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filter === "all" ? true : item.status === filter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filteredMessages.length / perPage);
  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl px-4"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-800 dark:text-white">
            Messages
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage all your incoming messages and inquiries
          </p>
        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-3">
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-2xl bg-white p-6 shadow-xl transition-shadow hover:shadow-2xl dark:bg-[#0B1120]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Total Messages</p>
                <h3 className="mt-1 text-3xl font-bold text-slate-800 dark:text-white">
                  {stats.total}
                </h3>
              </div>
              <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-500">
                <FiMessageSquare size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-2xl bg-white p-6 shadow-xl transition-shadow hover:shadow-2xl dark:bg-[#0B1120]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Unread</p>
                <h3 className="mt-1 text-3xl font-bold text-amber-500">
                  {stats.unread}
                </h3>
              </div>
              <div className="rounded-xl bg-amber-500/10 p-3 text-amber-500">
                <FiClock size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-2xl bg-white p-6 shadow-xl transition-shadow hover:shadow-2xl dark:bg-[#0B1120]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Read</p>
                <h3 className="mt-1 text-3xl font-bold text-emerald-500">
                  {stats.read}
                </h3>
              </div>
              <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-500">
                <FiCheckCircle size={24} />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-xl dark:bg-[#0B1120] md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email or message..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setFilter("all");
                setCurrentPage(1);
              }}
              className={`rounded-xl px-4 py-2 transition ${
                filter === "all"
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => {
                setFilter("unread");
                setCurrentPage(1);
              }}
              className={`rounded-xl px-4 py-2 transition ${
                filter === "unread"
                  ? "bg-amber-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => {
                setFilter("read");
                setCurrentPage(1);
              }}
              className={`rounded-xl px-4 py-2 transition ${
                filter === "read"
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              Read
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-[#0B1120]">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <FiInbox className="text-6xl text-slate-300 dark:text-slate-600" />
              <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
                No messages found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                      Mobile
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                      Message
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600 dark:text-slate-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMessages.map((item, index) => (
                    <motion.tr
                      key={item._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900/50"
                    >
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                        {(currentPage - 1) * perPage + index + 1}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-800 dark:text-white">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                        {item.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                        {item.mobile}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                        <div className="max-w-xs truncate">{item.message}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                            item.status === "read"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          }`}
                        >
                          {item.status === "read" ? (
                            <FiCheck size={12} />
                          ) : (
                            <FiClock size={12} />
                          )}
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => toggleStatus(item._id, item.status)}
                            className="rounded-lg bg-cyan-500/10 p-2 text-cyan-500 transition hover:bg-cyan-500 hover:text-white"
                            title={
                              item.status === "read"
                                ? "Mark as unread"
                                : "Mark as read"
                            }
                          >
                            <FiEye size={18} />
                          </button>
                          <button
                            onClick={() => deleteMessage(item._id)}
                            className="rounded-lg bg-red-500/10 p-2 text-red-500 transition hover:bg-red-500 hover:text-white"
                            title="Delete"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`rounded-xl px-4 py-2 transition ${
                currentPage === 1
                  ? "cursor-not-allowed bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600"
                  : "bg-cyan-500 text-white hover:bg-cyan-600"
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`rounded-xl px-4 py-2 transition ${
                  currentPage === page
                    ? "bg-cyan-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`rounded-xl px-4 py-2 transition ${
                currentPage === totalPages
                  ? "cursor-not-allowed bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600"
                  : "bg-cyan-500 text-white hover:bg-cyan-600"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </motion.div>
    </Layout>
  );
}

export default AdminDashboard;