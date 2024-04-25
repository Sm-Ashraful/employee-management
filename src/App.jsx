import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Admin/Dashboard";
import SignIn from "./pages/Admin/SignIn";
import AddEmployee from "./pages/Admin/AddEmployee";
import { Toaster } from "react-hot-toast";
import EmployeeList from "./pages/Admin/EmployeeList";
import Home from "./pages/Home";
import Login from "./pages/Employee-panel/Signin";
import EmployeeDashboard from "./pages/Employee-panel/Dashboard";
import AdminProtectedRoute from "./utils/AdminPrivate";
import { useUserContext } from "./context/UserContext";
import AttendanceReport from "./pages/Admin/Attendance";
import CreateDepartment from "./pages/Admin/Department/CreateDepartment";
import ViewDepartment from "./pages/Admin/Department/ViewDepartment";

function App() {
  const location = useLocation();
  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<AdminProtectedRoute />}>
          <Route path="admin/dashboard" element={<Dashboard />} />
          <Route path="admin/add-employee" element={<AddEmployee />} />
          <Route path="admin/employee" element={<EmployeeList />} />
          <Route
            path="admin/department/create-department"
            element={<CreateDepartment />}
          />
          <Route
            path="admin/department/view-department"
            element={<ViewDepartment />}
          />
          <Route
            path="admin/attendance-report"
            element={<AttendanceReport />}
          />
        </Route>

        <Route path="/admin/signin" element={<SignIn />} />
        <Route path="/employee/login" element={<Login />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
