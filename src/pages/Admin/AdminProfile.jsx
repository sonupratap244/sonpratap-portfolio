import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Admin/Layout";
import {
  FiUpload,
  FiSave,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiGlobe,
  FiFile,
  FiEye,
} from "react-icons/fi";

function AdminProfile() {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    email: "",
    mobile: "",
    location: "",
    shortDescription: "",
    aboutDescription: "",
    github: "",
    linkedin: "",
    portfolio: "",
    website: "",
    instagram: "",
    twitter: "",
    facebook: "",
    youtube: "",
    profileImage: "",
    heroImage: "",
    aboutImage: "",
    resume: "",
  });

  const [imageFiles, setImageFiles] = useState({
    profileImage: null,
    heroImage: null,
    aboutImage: null,
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const API = import.meta.env.VITE_API_URL || "https://portfolio-backend-7e9e.onrender.com/api";
  const BASE_URL = API.replace('/api', '');

  const getProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/profile`);
      console.log("Profile Data:", res.data);

      if (res.data.success) {
        setFormData((prev) => ({
          ...prev,
          ...res.data.data,
        }));
      }
    } catch (err) {
      console.log("Error fetching profile:", err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      console.log(`Selected ${type}:`, file.name);
      setImageFiles((prev) => ({
        ...prev,
        [type]: file,
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {};
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected Resume:", file.name);
      setResumeFile(file);
    }
  };

  const uploadImage = async (type) => {
    if (!imageFiles[type]) {
      toast.error("Please select an image first");
      return;
    }

    setLoading(true);
    const fd = new FormData();
    fd.append("image", imageFiles[type]);

    console.log("📤 ===== UPLOAD START =====");
    console.log("📤 Type:", type);
    console.log("📤 File:", imageFiles[type]);
    console.log("📤 File Name:", imageFiles[type].name);
    console.log("📤 File Size:", imageFiles[type].size);
    console.log("📤 File Type:", imageFiles[type].type);
    
    for (let pair of fd.entries()) {
      console.log("📤 FormData:", pair[0], "=", pair[1]);
    }

    let url = "";
    if (type === "profileImage") {
      url = `${API}/profile/upload/profile`;
    } else if (type === "heroImage") {
      url = `${API}/profile/upload/hero`;
    } else if (type === "aboutImage") {
      url = `${API}/profile/upload/about`;
    }

    console.log("📤 URL:", url);

    try {
      const res = await axios.post(url, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ SUCCESS Response:", res.data);
      toast.success(res.data.message);
      
      setImageFiles((prev) => ({
        ...prev,
        [type]: null,
      }));
      
      setFormData((prev) => ({
        ...prev,
        [type]: res.data.image,
      }));
      
      await getProfile();
      
    } catch (err) {
      console.log("❌ ===== UPLOAD FAILED =====");
      console.log("❌ Error:", err);
      console.log("❌ Error Response:", err.response);
      console.log("❌ Error Data:", err.response?.data);
      console.log("❌ Error Status:", err.response?.status);
      
      if (err.response?.status === 404) {
        toast.error("API endpoint not found. Check backend routes.");
      } else if (err.response?.status === 500) {
        toast.error("Server error. Check backend terminal.");
      } else if (err.response?.status === 413) {
        toast.error("File too large. Max size 10MB.");
      } else {
        toast.error(err.response?.data?.message || "Failed to upload image");
      }
    } finally {
      setLoading(false);
    }
  };

  const uploadResume = async () => {
    if (!resumeFile) {
      toast.error("Please select a resume file");
      return;
    }

    setLoading(true);
    const fd = new FormData();
    fd.append("resume", resumeFile);

    try {
      console.log("Uploading Resume...");
      const res = await axios.post(`${API}/profile/upload/resume`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Resume Upload Response:", res.data);
      toast.success(res.data.message);
      
      setResumeFile(null);
      setFormData((prev) => ({
        ...prev,
        resume: res.data.resume || res.data.filename,
      }));
      
      getProfile();
    } catch (err) {
      console.log("Upload error:", err);
      toast.error(err.response?.data?.message || "Failed to upload resume");
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    try {
      setLoading(true);
      console.log("Saving Profile:", formData);
      const res = await axios.put(`${API}/profile`, formData);
      
      console.log("Save Response:", res.data);
      toast.success(res.data.message);
      getProfile();
    } catch (err) {
      console.log("Save error:", err);
      toast.error(err.response?.data?.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const getImageUrl = (type, filename) => {
    if (!filename) return null;
    return `${BASE_URL}/uploads/${type}/${filename}`;
  };

  const getResumeUrl = (filename) => {
    if (!filename) return null;
    return `${BASE_URL}/uploads/resume/${filename}`;
  };

  const ImageCard = ({ title, type, imageKey }) => {
    const imageUrl = getImageUrl(type, formData[imageKey]);
    
    return (
      <motion.div
        whileHover={{ y: -6 }}
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-[#0B1120]"
      >
        <h3 className="mb-5 text-lg font-bold dark:text-white">{title}</h3>

        <div className="flex h-52 items-center justify-center rounded-2xl border-2 border-dashed border-cyan-500 overflow-hidden bg-slate-50 dark:bg-slate-800">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover"
              onError={(e) => {
                console.log(`Failed to load image: ${imageUrl}`);
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `
                  <div class="text-center text-red-500">
                    <FiUpload size={45} class="mx-auto text-cyan-500" />
                    <p class="text-xs mt-2">Image not found</p>
                  </div>
                `;
              }}
            />
          ) : (
            <FiUpload size={45} className="text-cyan-500" />
          )}
        </div>

        <input
          type="file"
          name={type}
          id={type}
          hidden
          onChange={(e) => handleImageChange(e, imageKey)}
          accept="image/*"
        />

        <label
          htmlFor={type}
          className="mt-5 flex cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Choose Image
        </label>

        <button
          onClick={() => uploadImage(imageKey)}
          className="mt-3 w-full rounded-xl bg-black py-3 text-white transition hover:opacity-80 disabled:opacity-50"
          disabled={!imageFiles[imageKey] || loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
        
        {imageFiles[imageKey] && (
          <p className="mt-2 text-xs text-green-500 truncate">
            Selected: {imageFiles[imageKey].name}
          </p>
        )}
      </motion.div>
    );
  };

  const SocialIcon = ({ icon: Icon, name }) => (
    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
      <Icon size={20} />
      <span className="capitalize">{name}</span>
    </div>
  );

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-black text-slate-800 dark:text-white">
            Profile Settings
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage your portfolio profile information.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          <ImageCard title="Profile Image" type="profile" imageKey="profileImage" />
          <ImageCard title="Hero Image" type="hero" imageKey="heroImage" />
          <ImageCard title="About Image" type="about" imageKey="aboutImage" />
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-[#0B1120]">
          <h2 className="mb-6 text-2xl font-bold dark:text-white">
            <FiUser className="inline mr-2" />
            Personal Information
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Full Name"
              className="rounded-xl border p-4 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <input
              name="designation"
              value={formData.designation || ""}
              onChange={handleChange}
              placeholder="Designation (e.g., Full Stack Developer)"
              className="rounded-xl border p-4 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <input
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Email"
              className="rounded-xl border p-4 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <input
              name="mobile"
              value={formData.mobile || ""}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="rounded-xl border p-4 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <input
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              placeholder="Location (e.g., Mumbai, India)"
              className="rounded-xl border p-4 dark:bg-slate-900 dark:text-white md:col-span-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <textarea
              name="shortDescription"
              value={formData.shortDescription || ""}
              onChange={handleChange}
              rows="4"
              placeholder="Short Description (e.g., I'm a passionate developer...)"
              className="rounded-xl border p-4 dark:bg-slate-900 dark:text-white md:col-span-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <textarea
              name="aboutDescription"
              value={formData.aboutDescription || ""}
              onChange={handleChange}
              rows="6"
              placeholder="About Description (Detailed about yourself)"
              className="rounded-xl border p-4 dark:bg-slate-900 dark:text-white md:col-span-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-[#0B1120]">
          <h2 className="mb-6 text-2xl font-bold dark:text-white">
            Social Links
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <SocialIcon icon={FiGithub} name="GitHub" />
              <input
                name="github"
                value={formData.github || ""}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="mt-1 w-full rounded-xl border p-4 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <SocialIcon icon={FiLinkedin} name="LinkedIn" />
              <input
                name="linkedin"
                value={formData.linkedin || ""}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="mt-1 w-full rounded-xl border p-4 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <SocialIcon icon={FiGlobe} name="Portfolio" />
              <input
                name="portfolio"
                value={formData.portfolio || ""}
                onChange={handleChange}
                placeholder="https://your-portfolio.com"
                className="mt-1 w-full rounded-xl border p-4 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <SocialIcon icon={FiGlobe} name="Website" />
              <input
                name="website"
                value={formData.website || ""}
                onChange={handleChange}
                placeholder="https://your-website.com"
                className="mt-1 w-full rounded-xl border p-4 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-[#0B1120]">
          <h2 className="mb-6 text-2xl font-bold dark:text-white">
            <FiFile className="inline mr-2" />
            Resume
          </h2>

          <div className="rounded-2xl border-2 border-dashed border-cyan-500 p-10 text-center">
            {formData.resume ? (
              <div className="space-y-4">
                <FiFile size={55} className="mx-auto text-cyan-500" />
                <p className="text-slate-500 dark:text-slate-400">
                  Current Resume:{" "}
                  <a
                    href={getResumeUrl(formData.resume)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-500 hover:underline font-semibold"
                  >
                    {formData.resume}
                  </a>
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href={getResumeUrl(formData.resume)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-2 text-white font-semibold hover:opacity-90"
                  >
                    <FiEye /> Preview
                  </a>
                </div>
              </div>
            ) : (
              <>
                <FiUpload size={55} className="mx-auto text-cyan-500" />
                <p className="mt-5 text-slate-500 dark:text-slate-400">
                  Upload Resume (PDF)
                </p>
              </>
            )}

            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <input
                type="file"
                id="resume"
                hidden
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
              />
              <label
                htmlFor="resume"
                className="cursor-pointer rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-8 py-3 font-semibold text-white transition hover:opacity-90"
              >
                Choose File
              </label>

              {resumeFile && (
                <span className="text-sm text-green-500 dark:text-green-400 font-medium">
                  Selected: {resumeFile.name}
                </span>
              )}

              <button
                onClick={uploadResume}
                disabled={!resumeFile || loading}
                className="rounded-xl bg-black px-8 py-3 font-semibold text-white transition hover:opacity-80 disabled:opacity-50"
              >
                {loading ? "Uploading..." : "Upload Resume"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={saveProfile}
            disabled={loading}
            className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-8 py-4 font-bold text-white shadow-xl transition hover:scale-105 disabled:opacity-50"
          >
            <FiSave />
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </div>
    </Layout>
  );
}

export default AdminProfile;