// AdminBookings.jsx - New page
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Admin/Layout";
import {
  FiCalendar,
  FiUser,
  FiMail,
  FiPhone,
  FiDollarSign,
  FiEye,
  FiTrash2,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiRefreshCw,
  FiSearch,
} from "react-icons/fi";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    paidBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/bookings/admin`);
      if (res.data.success) {
        setBookings(res.data.data.bookings);
        setStats(res.data.data.stats);
      }
    } catch (err) {
      toast.error("Failed to fetch bookings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(`${API}/bookings/admin/${id}/status`, {
        bookingStatus: status,
      });
      if (res.data.success) {
        toast.success("Booking status updated");
        fetchBookings();
      }
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      const res = await axios.delete(`${API}/bookings/admin/${id}`);
      if (res.data.success) {
        toast.success("Booking deleted");
        fetchBookings();
      }
    } catch (err) {
      toast.error("Failed to delete booking");
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-500/20 text-yellow-600",
      confirmed: "bg-blue-500/20 text-blue-600",
      completed: "bg-green-500/20 text-green-600",
      cancelled: "bg-red-500/20 text-red-600",
      expired: "bg-gray-500/20 text-gray-600",
    };
    return colors[status] || colors.pending;
  };

  const getPaymentStatusColor = (status) => {
    return status === "paid" 
      ? "bg-green-500/20 text-green-600" 
      : status === "processing"
      ? "bg-yellow-500/20 text-yellow-600"
      : "bg-red-500/20 text-red-600";
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchSearch = 
      booking.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      booking.customer.email.toLowerCase().includes(search.toLowerCase()) ||
      booking.customer.mobile.includes(search);
    const matchFilter = filter === "all" ? true : booking.bookingStatus === filter;
    return matchSearch && matchFilter;
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Loading bookings...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 dark:text-white">
              Bookings
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage all customer bookings and payments
            </p>
          </div>
          <button
            onClick={fetchBookings}
            className="mt-3 sm:mt-0 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-white transition hover:bg-cyan-600"
          >
            <FiRefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-5">
          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-xl bg-white p-4 shadow-lg dark:bg-[#0B1120]"
          >
            <p className="text-xs text-slate-500 dark:text-slate-400">Total</p>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              {stats.totalBookings}
            </h3>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-xl bg-white p-4 shadow-lg dark:bg-[#0B1120]"
          >
            <p className="text-xs text-slate-500 dark:text-slate-400">Revenue</p>
            <h3 className="text-xl font-bold text-green-600">
              ₹{stats.totalRevenue.toFixed(2)}
            </h3>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-xl bg-white p-4 shadow-lg dark:bg-[#0B1120]"
          >
            <p className="text-xs text-slate-500 dark:text-slate-400">Pending</p>
            <h3 className="text-xl font-bold text-yellow-600">
              {stats.pendingPayments}
            </h3>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-xl bg-white p-4 shadow-lg dark:bg-[#0B1120]"
          >
            <p className="text-xs text-slate-500 dark:text-slate-400">Paid</p>
            <h3 className="text-xl font-bold text-blue-600">
              {stats.paidBookings}
            </h3>
          </motion.div>
        </div>

        {/* Search & Filter */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email or mobile..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-[#0B1120] dark:text-white"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-[#0B1120] dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        {/* Bookings Table */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-[#0B1120]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">#</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Session</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Payment</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-12 text-center text-slate-500 dark:text-slate-400">
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking, index) => (
                    <motion.tr
                      key={booking._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900/50"
                    >
                      <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-slate-800 dark:text-white">
                            {booking.customer.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {booking.customer.email}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {booking.customer.mobile}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-slate-800 dark:text-white">
                          {formatDate(booking.session.date)}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {booking.session.time} ({booking.session.duration} min)
                        </p>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-800 dark:text-white">
                        ₹{booking.pricing.amount}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                          {booking.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={booking.bookingStatus}
                          onChange={(e) => updateStatus(booking._id, e.target.value)}
                          className={`rounded-full px-2.5 py-1 text-xs font-medium outline-none cursor-pointer ${getStatusColor(booking.bookingStatus)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="expired">Expired</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1.5">
                          <Link
                            to={`/admin/bookings/${booking._id}`}
                            className="rounded-lg bg-cyan-500/10 p-1.5 text-cyan-500 transition hover:bg-cyan-500 hover:text-white"
                          >
                            <FiEye size={16} />
                          </Link>
                          <button
                            onClick={() => deleteBooking(booking._id)}
                            className="rounded-lg bg-red-500/10 p-1.5 text-red-500 transition hover:bg-red-500 hover:text-white"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}

export default AdminBookings;