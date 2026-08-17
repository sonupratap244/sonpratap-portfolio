import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-[#020617]">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content Area - with margin left to accommodate sidebar */}
      <div 
        className={`flex flex-1 flex-col transition-all duration-300 ${
          sidebarOpen ? "lg:ml-[280px]" : "lg:ml-[95px]"
        }`}
      >
        {/* Header */}
        <Header
          toggleSidebar={() =>
            setSidebarOpen(!sidebarOpen)
          }
        />

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;