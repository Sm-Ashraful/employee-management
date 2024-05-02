import React, { useState, useEffect } from "react";

import Header from "../../partials/Header";

import Sidebar from "../../partials/Sidebar";
import { Toaster } from "react-hot-toast";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  useEffect(() => {
    const unSubscribe = () => {
      if (window.innerWidth < 720) {
        setIsMobileDevice(true);
      } else {
        setIsMobileDevice(true);
      }
    };
    unSubscribe();

    return () => {
      return unSubscribe();
    };
  }, []);
  return (
    <html>
      <body>
        <main className="relative  w-screen ">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarExpanded={setSidebarExpanded}
            setSidebarOpen={setSidebarOpen}
            sidebarExpanded={sidebarExpanded}
          />
          <div
            className="relative  w-full  transition-marginLeft duration-200"
            style={{
              marginLeft: sidebarExpanded ? "16rem" : "4.2rem", // Dynamic marginLeft
              width: sidebarExpanded ? "calc(100% - 16rem)" : "95%",
            }}
          >
            {children}
          </div>
        </main>
      </body>
    </html>
  );
};

export default AdminLayout;
