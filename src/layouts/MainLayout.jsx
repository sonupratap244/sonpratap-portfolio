import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-all duration-500 dark:bg-[#030712] dark:text-white">
      <Navbar />

      <main className="pt-28">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;