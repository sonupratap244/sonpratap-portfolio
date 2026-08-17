import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import BookSession from "./pages/BookSession";

import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProjects from "./pages/Admin/AdminProjects";
import AdminProfile from "./pages/Admin/AdminProfile";
import AdminExperience from "./pages/Admin/AdminExperience/AdminExperience";
import AdminSettings from "./pages/Admin/AdminSettings/AdminSettings";


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="skills" element={<Skills />} />
        <Route path="projects" element={<Projects />} />
        <Route path="experience" element={<Experience />} />
        <Route path="contact" element={<Contact />} />



      </Route>
      <Route path="/book-session" element={<BookSession />} />
      <Route
        path="https://portfolio-backend-7e9e.onrender.com"
        element={<AdminLogin />}
      />


      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />
      <Route path="/admin/projects" element={<AdminProjects />} />
      <Route
        path="/admin/profile"
        element={<AdminProfile />}
      />
      <Route
        path="/admin/experience"
        element={<AdminExperience />}
      />
      <Route
        path="/admin/settings"
        element={<AdminSettings />}
      />
    </Routes>
  );
}

export default App;