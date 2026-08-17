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

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black dark:text-white">Projects</h1>
            <p className="mt-2 text-slate-500">Manage all portfolio projects.</p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
          >
            <FiPlus />
            Add Project
          </button>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-5 shadow-xl dark:bg-[#08111f]">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={handleSearch}
                placeholder="Search project..."
                className="w-full rounded-xl border bg-transparent py-3 pl-11 pr-4 outline-none dark:text-white"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border bg-transparent px-4 py-3 outline-none dark:text-white"
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
          className="mt-8 overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-[#08111f]"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-slate-100 dark:bg-slate-900">
                <tr>
                  <th className="p-5 text-left">Image</th>
                  <th className="p-5 text-left">Title</th>
                  <th className="p-5 text-left">Technology</th>
                  <th className="p-5 text-left">Status</th>
                  <th className="p-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((item) => (
                  <tr key={item._id} className="border-t dark:border-slate-800">
                    <td className="p-5">
                      {item.image ? (
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.title}
                          className="h-16 w-24 rounded-xl object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/100x60?text=No+Image";
                          }}
                        />
                      ) : (
                        <div className="h-16 w-24 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs text-slate-400">
                          No Image
                        </div>
                      )}
                    </td>
                    <td className="font-semibold dark:text-white">{item.title}</td>
                    <td className="dark:text-white">{item.tech}</td>
                    <td>
                      <span
                        className={`rounded-full px-4 py-2 text-sm font-semibold ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex justify-center gap-2 flex-wrap">
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
                        {item.live && (
                          <a
                            href={item.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-xl bg-green-500 p-3 text-white hover:scale-110 transition"
                          >
                            <FiExternalLink />
                          </a>
                        )}
                        {item.github && (
                          <a
                            href={item.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-xl bg-slate-800 p-3 text-white hover:scale-110 transition"
                          >
                            <FiGithub />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
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
              {modalMode === "add" ? "Add Project" : "Edit Project"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-semibold dark:text-white">
                  Project Image
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="image"
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-cyan-500 p-4 hover:bg-cyan-500/10 transition"
                    >
                      <FiUpload />
                      <span>Choose Image</span>
                    </label>
                  </div>
                  {previewUrl && (
                    <div className="h-16 w-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
                {imageFile && (
                  <p className="mt-1 text-xs text-green-500">
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
                  className="w-full rounded-xl border p-3 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                  className="w-full rounded-xl border p-3 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                  className="w-full rounded-xl border p-3 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                  className="w-full rounded-xl border p-3 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Project"}
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
      {isViewModalOpen && selectedProject && (
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

            <h2 className="mb-6 text-2xl font-bold dark:text-white">Project Details</h2>

            <div className="space-y-4">
              {selectedProject.image && (
                <div>
                  <label className="text-sm font-semibold text-slate-500">Image</label>
                  <img
                    src={getImageUrl(selectedProject.image)}
                    alt={selectedProject.title}
                    className="mt-2 h-48 w-full rounded-xl object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
                    }}
                  />
                </div>
              )}
              <div>
                <label className="text-sm font-semibold text-slate-500">Title</label>
                <p className="text-xl font-bold dark:text-white">{selectedProject.title}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-500">Technology</label>
                <p className="dark:text-white">{selectedProject.tech}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-500">Status</label>
                <span
                  className={`ml-2 inline-block rounded-full px-4 py-1 text-xs font-bold ${
                    selectedProject.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {selectedProject.status}
                </span>
              </div>
              {selectedProject.description && (
                <div>
                  <label className="text-sm font-semibold text-slate-500">Description</label>
                  <p className="leading-8 dark:text-white">{selectedProject.description}</p>
                </div>
              )}
              <div className="flex gap-3 flex-wrap">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-white hover:opacity-80"
                  >
                    <FiGithub /> GitHub
                  </a>
                )}
                {selectedProject.live && (
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2 text-white hover:opacity-80"
                  >
                    <FiExternalLink /> Live Demo
                  </a>
                )}
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
      {isDeleteModalOpen && selectedProject && (
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
              <h2 className="text-2xl font-bold dark:text-white">Delete Project</h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Are you sure you want to delete "{selectedProject.title}"? This action cannot be undone.
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

export default AdminProjects;