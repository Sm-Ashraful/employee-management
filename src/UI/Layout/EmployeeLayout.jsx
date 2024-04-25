import React, { useState, useEffect } from "react";

import Header from "../../partials/Header";
import Banner from "../../partials/Banner";
import EmployeeSidebar from "../../partials/EmployeeSidebar";

const EmployeeLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html>
      <body>
        <main className="relative">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <EmployeeSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <div className="relative ml-64">{children}</div>
          <Banner />
        </main>
      </body>
    </html>
  );
};

export default EmployeeLayout;
