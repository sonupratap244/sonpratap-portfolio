import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../../components/Admin/Layout";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiBriefcase,
  FiCalendar,
  FiAward,
  FiX,
  FiSave,
} from "react-icons/fi";

function AdminExperience() {
  const [experiences, setExperiences] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [modalMode, setModalMode] = useState("add");

  const API = import.meta.env.VITE_API_URL || "https://portfolio-backend-7e9e.onrender.com/api";

  const [formData, setFormData] = useState({
    role: "",
    company: "",
    duration: "",
    status: "Completed",
    description: "",
    skills: "",
    startDate: "",
    endDate: "",
  });

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/experience`);
      if (res.data.success) {
        setExperiences(res.data.data);
      }
    } catch (err) {
      console.log("Error fetching experiences:", err);
      toast.error("Failed to load experiences");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredExperiences = experiences.filter(
    (item) =>
      item.role.toLowerCase().includes(search.toLowerCase()) ||
      item.company.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      role: "",
      company: "",
      duration: "",
      status: "Completed",
      description: "",
      skills: "",
      startDate: "",
      endDate: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (experience) => {
    setModalMode("edit");
    setSelectedExperience(experience);
    setFormData({
      role: experience.role,
      company: experience.company,
      duration: experience.duration,
      status: experience.status,
      description: experience.description,
      skills: experience.skills.join(", "),
      startDate: experience.startDate ? experience.startDate.split("T")[0] : "",
      endDate: experience.endDate ? experience.endDate.split("T")[0] : "",
    });
    setIsModalOpen(true);
  };

  const openViewModal = (experience) => {
    setSelectedExperience(experience);
    setIsViewModalOpen(true);
  };

  const openDeleteModal = (experience) => {
    setSelectedExperience(experience);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExperience(null);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedExperience(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedExperience(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const skillsArray = formData.skills
        ? formData.skills.split(",").map((s) => s.trim())
        : [];

      const data = {
        ...formData,
        skills: skillsArray,
      };

      let res;
      if (modalMode === "add") {
        res = await axios.post(`${API}/experience`, data);
        toast.success("Experience added successfully");
      } else {
        res = await axios.put(`${API}/experience/${selectedExperience._id}`, data);
        toast.success("Experience updated successfully");
      }

      if (res.data.success) {
        fetchExperiences();
        closeModal();
      }
    } catch (err) {
      console.log("Error saving experience:", err);
      toast.error(err.response?.data?.message || "Failed to save experience");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`${API}/experience/${selectedExperience._id}`);
      if (res.data.success) {
        toast.success("Experience deleted successfully");
        fetchExperiences();
        closeDeleteModal();
      }
    } catch (err) {
      console.log("Error deleting experience:", err);
      toast.error(err.response?.data?.message || "Failed to delete experience");
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: experiences.length,
    currentCompany: experiences.find((e) => e.status === "Current")?.company || "N/A",
    currentPosition: experiences.find((e) => e.status === "Current")?.role || "N/A",
    totalYears: experiences.length > 0 ? "1+ Years" : "0 Years",
  };

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col justify-between gap-5 md:flex-row md:items-center"
        >
          <div>
            <h1 className="text-4xl font-black text-slate-800 dark:text-white">
              Experience Management
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Manage your professional journey.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-3 font-semibold text-white shadow-xl hover:scale-105 transition"
          >
            <FiPlus />
            Add Experience
          </button>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-[#0B1120]">
            <FiBriefcase className="text-4xl text-cyan-500" />
            <h2 className="mt-4 text-3xl font-black dark:text-white">{stats.total}</h2>
            <p className="text-slate-500">Total Experience</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-[#0B1120]">
            <FiAward className="text-4xl text-indigo-500" />
            <h2 className="mt-4 text-xl font-black dark:text-white">{stats.currentCompany}</h2>
            <p className="text-slate-500">Current Company</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-[#0B1120]">
            <FiCalendar className="text-4xl text-green-500" />
            <h2 className="mt-4 text-xl font-black dark:text-white">{stats.currentPosition}</h2>
            <p className="text-slate-500">Current Position</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-[#0B1120]">
            <FiBriefcase className="text-4xl text-purple-500" />
            <h2 className="mt-4 text-xl font-black dark:text-white">{stats.totalYears}</h2>
            <p className="text-slate-500">Professional Exp.</p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-5 shadow-xl dark:bg-[#0B1120]">
          <div className="relative">
            <FiSearch className="absolute left-4 top-4 text-xl text-slate-400" />
            <input
              value={search}
              onChange={handleSearch}
              placeholder="Search Company or Role..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-10 space-y-8">
          {filteredExperiences.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="rounded-3xl bg-white p-8 shadow-xl transition dark:bg-[#0B1120]"
            >
              <div className="flex flex-col justify-between gap-5 lg:flex-row">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-2xl font-black dark:text-white">
                      {item.role}
                    </h2>
                    <span
                      className={`rounded-full px-4 py-1 text-xs font-bold ${
                        item.status === "Current"
                          ? "bg-green-100 text-green-600"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-cyan-500">
                    {item.company}
                  </p>
                  <p className="mt-2 text-slate-500">{item.duration}</p>
                  <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.skills?.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-500"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-row gap-3 lg:flex-col">
                  <button
                    onClick={() => openViewModal(item)}
                    className="rounded-xl bg-cyan-500 p-3 text-white hover:scale-110 transition"
                  >
                    <FiEye />
                  </button>
                  <button
                    onClick={() => openEditModal(item)}
                    className="rounded-xl bg-indigo-500 p-3 text-white hover:scale-110 transition"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => openDeleteModal(item)}
                    className="rounded-xl bg-red-500 p-3 text-white hover:scale-110 transition"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-8 dark:bg-[#0B1120]"
          >
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-white"
            >
              <FiX size={20} />
            </button>

            <h2 className="mb-6 text-2xl font-bold dark:text-white">
              {modalMode === "add" ? "Add Experience" : "Edit Experience"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-semibold dark:text-white">
                  Role *
                </label>
                <input
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Full Stack Developer"
                  className="w-full rounded-xl border p-3 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold dark:text-white">
                  Company *
                </label>
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Alobha Technologies"
                  className="w-full rounded-xl border p-3 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold dark:text-white">
                  Duration *
                </label>
                <input
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Feb 2026 - Present"
                  className="w-full rounded-xl border p-3 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold dark:text-white">
                  Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="Completed">Completed</option>
                  <option value="Current">Current</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold dark:text-white">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Describe your role and responsibilities..."
                  className="w-full rounded-xl border p-3 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold dark:text-white">
                  Skills (comma separated)
                </label>
                <input
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g., React, Node, MongoDB"
                  className="w-full rounded-xl border p-3 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-semibold dark:text-white">
                    Start Date *
                  </label>
                  <input
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border p-3 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold dark:text-white">
                    End Date
                  </label>
                  <input
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border p-3 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Experience"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl bg-slate-200 px-6 py-3 font-semibold dark:bg-slate-700 dark:text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && selectedExperience && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-8 dark:bg-[#0B1120]"
          >
            <button
              onClick={closeViewModal}
              className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-white"
            >
              <FiX size={20} />
            </button>

            <h2 className="mb-6 text-2xl font-bold dark:text-white">Experience Details</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-500">Role</label>
                <p className="text-xl font-bold dark:text-white">{selectedExperience.role}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-500">Company</label>
                <p className="text-xl font-semibold text-cyan-500">{selectedExperience.company}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-500">Duration</label>
                <p className="dark:text-white">{selectedExperience.duration}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-500">Status</label>
                <span
                  className={`inline-block rounded-full px-4 py-1 text-xs font-bold ${
                    selectedExperience.status === "Current"
                      ? "bg-green-100 text-green-600"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {selectedExperience.status}
                </span>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-500">Description</label>
                <p className="leading-8 dark:text-white">{selectedExperience.description}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-500">Skills</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedExperience.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-500"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={closeViewModal}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-3 font-semibold text-white"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && selectedExperience && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-md rounded-3xl bg-white p-8 dark:bg-[#0B1120]"
          >
            <button
              onClick={closeDeleteModal}
              className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-white"
            >
              <FiX size={20} />
            </button>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <FiTrash2 className="text-3xl text-red-500" />
              </div>
              <h2 className="text-2xl font-bold dark:text-white">Delete Experience</h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Are you sure you want to delete "{selectedExperience.role}" at {selectedExperience.company}?
                This action cannot be undone.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex-1 rounded-xl bg-red-500 py-3 font-semibold text-white hover:bg-red-600 disabled:opacity-50"
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
                <button
                  onClick={closeDeleteModal}
                  className="flex-1 rounded-xl bg-slate-200 py-3 font-semibold dark:bg-slate-700 dark:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </Layout>
  );
}

export default AdminExperience;