import React, { useState, useEffect } from "react";

import Header from "../../partials/Header";
import Banner from "../../partials/Banner";

import Sidebar from "../../partials/Sidebar";
import { Toaster } from "react-hot-toast";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html>
      <body>
        <main className="relative  w-screen overflow-clip">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div
            className="relative left-[16rem] w-full overflow-hidden"
            style={{ width: "calc(100% - 16rem)" }}
          >
            {children}
          </div>
          <Banner />
        </main>
      </body>
    </html>
  );
};

export default AdminLayout;
