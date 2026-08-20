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
  FiChevronLeft,
  FiChevronRight,
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
      item.message.toLowerCase().includes(search.toLowerCase()) ||
      item.mobile?.toLowerCase().includes(search.toLowerCase());
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

  // Mobile Card View Component
  const MobileMessageCard = ({ item, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg dark:border-slate-700 dark:bg-[#0B1120]"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-800 dark:text-white truncate">
            {item.name}
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
            {item.email}
          </p>
          {item.mobile && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              📱 {item.mobile}
            </p>
          )}
        </div>
        <span
          className={`ml-2 flex-shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            item.status === "read"
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
              : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
          }`}
        >
          {item.status === "read" ? (
            <FiCheck size={10} />
          ) : (
            <FiClock size={10} />
          )}
          {item.status}
        </span>
      </div>

      <div className="mb-3">
        <p className="text-sm text-slate-600 dark:text-slate-300 break-words line-clamp-3">
          {item.message}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {formatDate(item.createdAt)}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => toggleStatus(item._id, item.status)}
            className="rounded-lg bg-cyan-500/10 p-2 text-cyan-500 transition hover:bg-cyan-500 hover:text-white"
            title={item.status === "read" ? "Mark as unread" : "Mark as read"}
          >
            <FiEye size={16} />
          </button>
          <button
            onClick={() => deleteMessage(item._id)}
            className="rounded-lg bg-red-500/10 p-2 text-red-500 transition hover:bg-red-500 hover:text-white"
            title="Delete"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6"
      >
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 dark:text-white">
            Messages
          </h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-slate-500 dark:text-slate-400">
            Manage all your incoming messages and inquiries
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-4 sm:mb-6 md:mb-8 grid grid-cols-3 gap-2 sm:gap-3 md:gap-5">
          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 md:p-6 shadow-lg transition-shadow hover:shadow-xl dark:bg-[#0B1120]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs md:text-sm text-slate-500 dark:text-slate-400">Total</p>
                <h3 className="mt-0.5 sm:mt-1 text-lg sm:text-xl md:text-3xl font-bold text-slate-800 dark:text-white">
                  {stats.total}
                </h3>
              </div>
              <div className="rounded-xl bg-cyan-500/10 p-2 sm:p-3 text-cyan-500">
                <FiMessageSquare size={16} className="sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px]" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 md:p-6 shadow-lg transition-shadow hover:shadow-xl dark:bg-[#0B1120]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs md:text-sm text-slate-500 dark:text-slate-400">Unread</p>
                <h3 className="mt-0.5 sm:mt-1 text-lg sm:text-xl md:text-3xl font-bold text-amber-500">
                  {stats.unread}
                </h3>
              </div>
              <div className="rounded-xl bg-amber-500/10 p-2 sm:p-3 text-amber-500">
                <FiClock size={16} className="sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px]" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 md:p-6 shadow-lg transition-shadow hover:shadow-xl dark:bg-[#0B1120]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs md:text-sm text-slate-500 dark:text-slate-400">Read</p>
                <h3 className="mt-0.5 sm:mt-1 text-lg sm:text-xl md:text-3xl font-bold text-emerald-500">
                  {stats.read}
                </h3>
              </div>
              <div className="rounded-xl bg-emerald-500/10 p-2 sm:p-3 text-emerald-500">
                <FiCheckCircle size={16} className="sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px]" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search & Filter */}
        <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl bg-white p-3 sm:p-4 md:p-5 shadow-lg dark:bg-[#0B1120]">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search by name, email or message..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 sm:py-3 pl-9 sm:pl-12 pr-3 sm:pr-4 text-sm outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white placeholder:text-xs sm:placeholder:text-sm"
            />
          </div>

          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
            <button
              onClick={() => { setFilter("all"); setCurrentPage(1); }}
              className={`flex-shrink-0 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition ${
                filter === "all"
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => { setFilter("unread"); setCurrentPage(1); }}
              className={`flex-shrink-0 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition ${
                filter === "unread"
                  ? "bg-amber-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => { setFilter("read"); setCurrentPage(1); }}
              className={`flex-shrink-0 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition ${
                filter === "read"
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              Read
            </button>
          </div>
        </div>

        {/* Messages Table/View */}
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-lg dark:bg-[#0B1120]">
          {loading ? (
            <div className="flex items-center justify-center py-12 sm:py-16">
              <div className="h-6 w-6 sm:h-8 sm:w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16">
              <FiInbox className="text-4xl sm:text-6xl text-slate-300 dark:text-slate-600" />
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400">
                No messages found
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table View - Hidden on mobile */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">#</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Mobile</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Message</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Status</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-300">Actions</th>
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
                        <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
                          {(currentPage - 1) * perPage + index + 1}
                        </td>
                        <td className="px-4 py-3 font-medium text-sm text-slate-800 dark:text-white">
                          {item.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                          {item.email}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                          {item.mobile || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                          <div className="max-w-[150px] lg:max-w-[200px] truncate">{item.message}</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {formatDate(item.createdAt)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                              item.status === "read"
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            }`}
                          >
                            {item.status === "read" ? <FiCheck size={10} /> : <FiClock size={10} />}
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => toggleStatus(item._id, item.status)}
                              className="rounded-lg bg-cyan-500/10 p-1.5 sm:p-2 text-cyan-500 transition hover:bg-cyan-500 hover:text-white"
                              title={item.status === "read" ? "Mark as unread" : "Mark as read"}
                            >
                              <FiEye size={16} className="sm:w-[18px] sm:h-[18px]" />
                            </button>
                            <button
                              onClick={() => deleteMessage(item._id)}
                              className="rounded-lg bg-red-500/10 p-1.5 sm:p-2 text-red-500 transition hover:bg-red-500 hover:text-white"
                              title="Delete"
                            >
                              <FiTrash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View - Visible only on mobile */}
              <div className="md:hidden p-3 sm:p-4 max-h-[500px] overflow-y-auto">
                {paginatedMessages.map((item, index) => (
                  <MobileMessageCard key={item._id} item={item} index={index} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition flex items-center gap-1 ${
                currentPage === 1
                  ? "cursor-not-allowed bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600"
                  : "bg-cyan-500 text-white hover:bg-cyan-600"
              }`}
            >
              <FiChevronLeft size={14} />
              Prev
            </button>
            
            <div className="flex gap-1 sm:gap-2 overflow-x-auto max-w-[200px] sm:max-w-[300px] md:max-w-none pb-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex-shrink-0 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition ${
                    currentPage === page
                      ? "bg-cyan-500 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition flex items-center gap-1 ${
                currentPage === totalPages
                  ? "cursor-not-allowed bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600"
                  : "bg-cyan-500 text-white hover:bg-cyan-600"
              }`}
            >
              Next
              <FiChevronRight size={14} />
            </button>
          </div>
        )}
      </motion.div>
    </Layout>
  );
}

export default AdminDashboard;