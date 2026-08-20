import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiExternalLink,
  FiGithub,
  FiX,
  FiSave,
  FiEye,
  FiUpload,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import Layout from "../../components/Admin/Layout";

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const API = import.meta.env.VITE_API_URL || "https://portfolio-backend-7e9e.onrender.com/api";
  const BASE_URL = API.replace('/api', '');

  const [formData, setFormData] = useState({
    title: "",
    tech: "",
    status: "Active",
    github: "",
    live: "",
    description: "",
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/project`);
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.log("Error fetching projects:", err);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const getImageUrl = (filename) => {
    if (!filename) return null;
    return `${BASE_URL}/uploads/projects/${filename}`;
  };

  const filteredProjects = projects.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.tech.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "All" ? true : item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filteredProjects.length / perPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      title: "",
      tech: "",
      status: "Active",
      github: "",
      live: "",
      description: "",
    });
    setImageFile(null);
    setPreviewUrl("");
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setModalMode("edit");
    setSelectedProject(project);
    setFormData({
      title: project.title,
      tech: project.tech,
      status: project.status,
      github: project.github || "",
      live: project.live || "",
      description: project.description || "",
    });
    setImageFile(null);
    setPreviewUrl(project.image ? getImageUrl(project.image) : "");
    setIsModalOpen(true);
  };

  const openViewModal = (project) => {
    setSelectedProject(project);
    setIsViewModalOpen(true);
  };

  const openDeleteModal = (project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setImageFile(null);
    setPreviewUrl("");
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedProject(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedProject(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("tech", formData.tech);
      fd.append("status", formData.status);
      fd.append("github", formData.github || "");
      fd.append("live", formData.live || "");
      fd.append("description", formData.description || "");
      if (imageFile) {
        fd.append("image", imageFile);
      }

      let res;
      if (modalMode === "add") {
        res = await axios.post(`${API}/project`, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Project added successfully");
      } else {
        res = await axios.put(`${API}/project/${selectedProject._id}`, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Project updated successfully");
      }
      if (res.data.success) {
        fetchProjects();
        closeModal();
      }
    } catch (err) {
      console.log("Error saving project:", err);
      toast.error(err.response?.data?.message || "Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`${API}/project/${selectedProject._id}`);
      if (res.data.success) {
        toast.success("Project deleted successfully");
        fetchProjects();
        closeDeleteModal();
      }
    } catch (err) {
      console.log("Error deleting project:", err);
      toast.error(err.response?.data?.message || "Failed to delete project");
    } finally {
      setLoading(false);
    }
  };

  // Mobile Card Component
  const MobileProjectCard = ({ item }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg dark:border-slate-700 dark:bg-[#0B1120]"
    >
      <div className="flex items-start gap-3 mb-3">
        {item.image ? (
          <img
            src={getImageUrl(item.image)}
            alt={item.title}
            className="h-16 w-20 rounded-xl object-cover flex-shrink-0"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/80x60?text=No+Image";
            }}
          />
        ) : (
          <div className="h-16 w-20 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs text-slate-400 flex-shrink-0">
            No Image
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-800 dark:text-white truncate">
            {item.title}
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
            {item.tech}
          </p>
          <span
            className={`inline-block mt-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              item.status === "Active"
                ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {item.status}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => openViewModal(item)}
          className="flex-1 rounded-xl bg-cyan-500 p-2 text-white text-sm hover:scale-105 transition"
        >
          View
        </button>
        <button
          onClick={() => openEditModal(item)}
          className="flex-1 rounded-xl bg-indigo-500 p-2 text-white text-sm hover:scale-105 transition"
        >
          Edit
        </button>
        <button
          onClick={() => openDeleteModal(item)}
          className="flex-1 rounded-xl bg-red-500 p-2 text-white text-sm hover:scale-105 transition"
        >
          Delete
        </button>
      </div>
      <div className="flex gap-2 mt-2">
        {item.github && (
          <a
            href={item.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-slate-800 p-2 text-white text-xs hover:opacity-80 transition"
          >
            <FiGithub size={14} /> GitHub
          </a>
        )}
        {item.live && (
          <a
            href={item.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-green-500 p-2 text-white text-xs hover:opacity-80 transition"
          >
            <FiExternalLink size={14} /> Live
          </a>
        )}
      </div>
    </motion.div>
  );

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
        <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black dark:text-white">
              Projects
            </h1>
            <p className="mt-1 text-sm sm:text-base text-slate-500">
              Manage all portfolio projects.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg transition hover:scale-105"
          >
            <FiPlus size={18} />
            Add Project
          </button>
        </div>

        <div className="mt-4 sm:mt-6 md:mt-8 rounded-2xl sm:rounded-3xl bg-white p-3 sm:p-4 md:p-5 shadow-xl dark:bg-[#08111f]">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                value={search}
                onChange={handleSearch}
                placeholder="Search project..."
                className="w-full rounded-xl border bg-transparent py-2.5 sm:py-3 pl-9 sm:pl-11 pr-3 sm:pr-4 text-sm outline-none dark:text-white dark:border-slate-700"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border bg-transparent px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none dark:text-white dark:border-slate-700"
            >
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 sm:mt-6 md:mt-8 overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-xl dark:bg-[#08111f]"
        >
          {loading ? (
            <div className="flex items-center justify-center py-12 sm:py-16">
              <div className="h-6 w-6 sm:h-8 sm:w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16">
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400">
                No projects found
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead className="bg-slate-100 dark:bg-slate-900">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold">Image</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold">Title</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold">Technology</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold">Status</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProjects.map((item) => (
                      <tr key={item._id} className="border-t dark:border-slate-800">
                        <td className="px-4 py-3">
                          {item.image ? (
                            <img
                              src={getImageUrl(item.image)}
                              alt={item.title}
                              className="h-14 w-20 rounded-xl object-cover"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/80x56?text=No+Image";
                              }}
                            />
                          ) : (
                            <div className="h-14 w-20 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] text-slate-400">
                              No Image
                            </div>
                          )}
                        </td>
                        <td className="font-semibold dark:text-white text-sm">{item.title}</td>
                        <td className="dark:text-white text-sm">{item.tech}</td>
                        <td>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              item.status === "Active"
                                ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex justify-center gap-1.5 flex-wrap">
                            <button
                              onClick={() => openViewModal(item)}
                              className="rounded-xl bg-cyan-500 p-2 text-white hover:scale-110 transition"
                              title="View"
                            >
                              <FiEye size={15} />
                            </button>
                            <button
                              onClick={() => openEditModal(item)}
                              className="rounded-xl bg-indigo-500 p-2 text-white hover:scale-110 transition"
                              title="Edit"
                            >
                              <FiEdit2 size={15} />
                            </button>
                            <button
                              onClick={() => openDeleteModal(item)}
                              className="rounded-xl bg-red-500 p-2 text-white hover:scale-110 transition"
                              title="Delete"
                            >
                              <FiTrash2 size={15} />
                            </button>
                            {item.github && (
                              <a
                                href={item.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-xl bg-slate-800 p-2 text-white hover:scale-110 transition"
                                title="GitHub"
                              >
                                <FiGithub size={15} />
                              </a>
                            )}
                            {item.live && (
                              <a
                                href={item.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-xl bg-green-500 p-2 text-white hover:scale-110 transition"
                                title="Live Demo"
                              >
                                <FiExternalLink size={15} />
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden p-3 sm:p-4 max-h-[500px] overflow-y-auto">
                {paginatedProjects.map((item) => (
                  <MobileProjectCard key={item._id} item={item} />
                ))}
              </div>
            </>
          )}
        </motion.div>

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
      </div>

      {/* Add/Edit Modal - Responsive */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 md:p-8 dark:bg-[#0B1120]"
          >
            <button
              onClick={closeModal}
              className="absolute right-3 sm:right-4 top-3 sm:top-4 rounded-full bg-slate-100 p-1.5 sm:p-2 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-white"
            >
              <FiX size={18} className="sm:w-[20px] sm:h-[20px]" />
            </button>

            <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold dark:text-white">
              {modalMode === "add" ? "Add Project" : "Edit Project"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="mb-1 block text-sm font-semibold dark:text-white">
                  Project Image
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="w-full sm:flex-1">
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="image"
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-cyan-500 p-3 sm:p-4 hover:bg-cyan-500/10 transition text-sm"
                    >
                      <FiUpload />
                      <span>Choose Image</span>
                    </label>
                  </div>
                  {previewUrl && (
                    <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
                {imageFile && (
                  <p className="mt-1 text-xs text-green-500 truncate">
                    Selected: {imageFile.name}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold dark:text-white">
                  Title *
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Portfolio Website"
                  className="w-full rounded-xl border p-2.5 sm:p-3 text-sm dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold dark:text-white">
                  Technology *
                </label>
                <input
                  name="tech"
                  value={formData.tech}
                  onChange={handleChange}
                  required
                  placeholder="e.g., React, Node, MongoDB"
                  className="w-full rounded-xl border p-2.5 sm:p-3 text-sm dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                  className="w-full rounded-xl border p-2.5 sm:p-3 text-sm dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold dark:text-white">
                  GitHub URL
                </label>
                <input
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/username/project"
                  className="w-full rounded-xl border p-2.5 sm:p-3 text-sm dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold dark:text-white">
                  Live URL
                </label>
                <input
                  name="live"
                  value={formData.live}
                  onChange={handleChange}
                  placeholder="https://project-demo.com"
                  className="w-full rounded-xl border p-2.5 sm:p-3 text-sm dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold dark:text-white">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe your project..."
                  className="w-full rounded-xl border p-2.5 sm:p-3 text-sm dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-2.5 sm:py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50 text-sm sm:text-base"
                >
                  {loading ? "Saving..." : "Save Project"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl bg-slate-200 px-4 sm:px-6 py-2.5 sm:py-3 font-semibold dark:bg-slate-700 dark:text-white text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* View Modal - Responsive */}
      {isViewModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 md:p-8 dark:bg-[#0B1120]"
          >
            <button
              onClick={closeViewModal}
              className="absolute right-3 sm:right-4 top-3 sm:top-4 rounded-full bg-slate-100 p-1.5 sm:p-2 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-white"
            >
              <FiX size={18} className="sm:w-[20px] sm:h-[20px]" />
            </button>

            <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold dark:text-white">Project Details</h2>

            <div className="space-y-3 sm:space-y-4">
              {selectedProject.image && (
                <div>
                  <label className="text-sm font-semibold text-slate-500">Image</label>
                  <img
                    src={getImageUrl(selectedProject.image)}
                    alt={selectedProject.title}
                    className="mt-2 h-40 sm:h-48 w-full rounded-xl object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
                    }}
                  />
                </div>
              )}
              <div>
                <label className="text-sm font-semibold text-slate-500">Title</label>
                <p className="text-lg sm:text-xl font-bold dark:text-white">{selectedProject.title}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-500">Technology</label>
                <p className="dark:text-white">{selectedProject.tech}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-500">Status</label>
                <span
                  className={`ml-2 inline-block rounded-full px-3 sm:px-4 py-1 text-xs font-bold ${
                    selectedProject.status === "Active"
                      ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {selectedProject.status}
                </span>
              </div>
              {selectedProject.description && (
                <div>
                  <label className="text-sm font-semibold text-slate-500">Description</label>
                  <p className="leading-6 sm:leading-8 dark:text-white text-sm sm:text-base">
                    {selectedProject.description}
                  </p>
                </div>
              )}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-slate-800 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white hover:opacity-80"
                  >
                    <FiGithub size={14} /> GitHub
                  </a>
                )}
                {selectedProject.live && (
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-green-500 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white hover:opacity-80"
                  >
                    <FiExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>
            </div>

            <button
              onClick={closeViewModal}
              className="mt-4 sm:mt-6 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-2.5 sm:py-3 font-semibold text-white text-sm sm:text-base"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

      {/* Delete Modal - Responsive */}
      {isDeleteModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-md rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 md:p-8 dark:bg-[#0B1120]"
          >
            <button
              onClick={closeDeleteModal}
              className="absolute right-3 sm:right-4 top-3 sm:top-4 rounded-full bg-slate-100 p-1.5 sm:p-2 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-white"
            >
              <FiX size={18} className="sm:w-[20px] sm:h-[20px]" />
            </button>

            <div className="text-center">
              <div className="mx-auto mb-3 sm:mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-red-100">
                <FiTrash2 className="text-2xl sm:text-3xl text-red-500" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold dark:text-white">Delete Project</h2>
              <p className="mt-2 text-sm sm:text-base text-slate-500 dark:text-slate-400">
                Are you sure you want to delete "{selectedProject.title}"? This action cannot be undone.
              </p>
              <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex-1 rounded-xl bg-red-500 py-2.5 sm:py-3 font-semibold text-white hover:bg-red-600 disabled:opacity-50 text-sm sm:text-base"
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
                <button
                  onClick={closeDeleteModal}
                  className="flex-1 rounded-xl bg-slate-200 py-2.5 sm:py-3 font-semibold dark:bg-slate-700 dark:text-white text-sm sm:text-base"
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

export default AdminProjects;