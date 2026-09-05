// AdminBookingDetails.jsx - Make sure you have export default at the end
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Admin/Layout";
import {
  FaArrowLeft,
  FaCalendar,
  FaClock,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaRupeeSign,
  FaCreditCard,
  FaCheckCircle,
  FaTimesCircle,
  FaClock as FaClockIcon,
  FaSpinner,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function AdminBookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchBookingDetails();
  }, [id]);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/bookings/admin/${id}`);
      if (res.data.success) {
        setBooking(res.data.data);
        
        try {
          const paymentRes = await axios.get(`${API}/bookings/admin/${id}/payment`);
          if (paymentRes.data.success) {
            setPayment(paymentRes.data.data);
          }
        } catch (err) {
          console.log("No payment found for this booking");
        }
      }
    } catch (err) {
      toast.error("Failed to fetch booking details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status) => {
    if (!window.confirm(`Are you sure you want to change status to "${status}"?`)) return;
    try {
      setUpdating(true);
      const res = await axios.put(`${API}/bookings/admin/${id}/status`, {
        bookingStatus: status,
      });
      if (res.data.success) {
        toast.success(`Booking status updated to ${status}`);
        fetchBookingDetails();
      }
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const deleteBooking = async () => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      const res = await axios.delete(`${API}/bookings/admin/${id}`);
      if (res.data.success) {
        toast.success("Booking deleted successfully");
        navigate("/admin/bookings");
      }
    } catch (err) {
      toast.error("Failed to delete booking");
      console.error(err);
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: { color: "bg-yellow-500/20 text-yellow-600", icon: FaClockIcon },
      confirmed: { color: "bg-blue-500/20 text-blue-600", icon: FaCheckCircle },
      completed: { color: "bg-green-500/20 text-green-600", icon: FaCheckCircle },
      cancelled: { color: "bg-red-500/20 text-red-600", icon: FaTimesCircle },
      expired: { color: "bg-gray-500/20 text-gray-600", icon: FaTimesCircle },
    };
    const { color, icon: Icon } = config[status] || config.pending;
    return { color, Icon };
  };

  const getPaymentBadge = (status) => {
    const config = {
      paid: { color: "bg-green-500/20 text-green-600", icon: FaCheckCircle },
      processing: { color: "bg-yellow-500/20 text-yellow-600", icon: FaSpinner },
      pending: { color: "bg-red-500/20 text-red-600", icon: FaClockIcon },
    };
    const { color, icon: Icon } = config[status] || config.pending;
    return { color, Icon };
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Loading booking details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!booking) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-xl text-slate-600 dark:text-slate-400">Booking not found</p>
          <Link to="/admin/bookings" className="mt-4 text-cyan-500 hover:underline">
            Back to Bookings
          </Link>
        </div>
      </Layout>
    );
  }

  const statusConfig = getStatusBadge(booking.bookingStatus);
  const paymentConfig = getPaymentBadge(booking.paymentStatus);
  const StatusIcon = statusConfig.Icon;
  const PaymentIcon = paymentConfig.Icon;

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-5xl px-3 sm:px-4 md:px-6"
      >
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/admin/bookings"
            className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-600 transition"
          >
            <FaArrowLeft /> Back to Bookings
          </Link>
          <div className="flex gap-2">
            <button
              onClick={deleteBooking}
              className="inline-flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-red-500 transition hover:bg-red-500 hover:text-white"
            >
              <FaTrash size={14} /> Delete
            </button>
          </div>
        </div>

        {/* Header Card */}
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 p-6 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm opacity-80">Booking ID</p>
              <h2 className="text-xl font-bold">{booking._id}</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${statusConfig.color} bg-white/20 backdrop-blur`}>
                <StatusIcon size={16} />
                {booking.bookingStatus.toUpperCase()}
              </span>
              <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${paymentConfig.color} bg-white/20 backdrop-blur`}>
                <PaymentIcon size={16} />
                {booking.paymentStatus.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Customer Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-white p-6 shadow-lg dark:bg-[#0B1120]"
          >
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white">
              <FaUser className="text-cyan-500" /> Customer Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Name</p>
                <p className="font-semibold text-slate-800 dark:text-white">
                  {booking.customer.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                <p className="flex items-center gap-2 text-slate-800 dark:text-white">
                  <FaEnvelope className="text-cyan-500" size={14} />
                  {booking.customer.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Mobile</p>
                <p className="flex items-center gap-2 text-slate-800 dark:text-white">
                  <FaPhone className="text-cyan-500" size={14} />
                  {booking.customer.mobile}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Session Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-white p-6 shadow-lg dark:bg-[#0B1120]"
          >
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white">
              <FaCalendar className="text-cyan-500" /> Session Details
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Date</p>
                <p className="font-semibold text-slate-800 dark:text-white">
                  {formatDate(booking.session.date)}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Time</p>
                <p className="flex items-center gap-2 text-slate-800 dark:text-white">
                  <FaClock className="text-cyan-500" size={14} />
                  {booking.session.time}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Duration</p>
                <p className="font-semibold text-slate-800 dark:text-white">
                  {booking.session.duration} minutes
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Mode</p>
                <p className="font-semibold text-slate-800 dark:text-white">
                  {booking.session.mode}
                </p>
              </div>
              {booking.session.message && (
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Message</p>
                  <p className="rounded-lg bg-slate-100 p-3 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                    {booking.session.message}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Pricing & Payment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 grid gap-6 md:grid-cols-2"
        >
          <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-[#0B1120]">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white">
              <FaRupeeSign className="text-cyan-500" /> Pricing
            </h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Amount</p>
                <p className="text-3xl font-bold text-slate-800 dark:text-white">
                  ₹{booking.pricing.amount}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Currency</p>
                <p className="font-semibold text-slate-800 dark:text-white">
                  {booking.pricing.currency}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-[#0B1120]">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white">
              <FaCreditCard className="text-cyan-500" /> Payment Details
            </h3>
            {payment ? (
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Order ID</p>
                  <p className="font-mono text-sm text-slate-800 dark:text-white">
                    {payment.gatewayOrderId}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Gateway</p>
                  <p className="font-semibold text-slate-800 dark:text-white">
                    {payment.gateway}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Status</p>
                  <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${paymentConfig.color}`}>
                    <PaymentIcon size={14} />
                    {payment.status}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-slate-500 dark:text-slate-400">No payment record found</p>
            )}
          </div>
        </motion.div>

        {/* Status Update */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 rounded-2xl bg-white p-6 shadow-lg dark:bg-[#0B1120]"
        >
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white">
            <FaEdit className="text-cyan-500" /> Update Status
          </h3>
          <div className="flex flex-wrap gap-3">
            {["pending", "confirmed", "completed", "cancelled", "expired"].map((status) => (
              <button
                key={status}
                onClick={() => updateStatus(status)}
                disabled={updating || booking.bookingStatus === status}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  booking.bookingStatus === status
                    ? "bg-cyan-500 text-white cursor-default"
                    : "bg-slate-100 text-slate-600 hover:bg-cyan-500 hover:text-white dark:bg-slate-800 dark:text-slate-300"
                } ${updating ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          {booking.expiresAt && (
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Expires: {new Date(booking.expiresAt).toLocaleString()}
            </p>
          )}
        </motion.div>
      </motion.div>
    </Layout>
  );
}

export default AdminBookingDetails;