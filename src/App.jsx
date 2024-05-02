import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Admin/Dashboard";
import SignIn from "./pages/Admin/SignIn";
import AddEmployee from "./pages/Admin/User/AddEmployee";
import { Toaster } from "react-hot-toast";
import EmployeeList from "./pages/Admin/User/EmployeeList";
import Home from "./pages/Home";
import Login from "./pages/Employee-panel/Signin";
import EmployeeDashboard from "./pages/Employee-panel/Dashboard";
import AdminProtectedRoute from "./utils/AdminPrivate";
import { useUserContext } from "./context/UserContext";
import AttendanceReport from "./pages/Admin/Attendance";
import CreateDepartment from "./pages/Admin/Department/CreateDepartment";
import ViewDepartment from "./pages/Admin/Department/ViewDepartment";
import ViewRole from "./pages/Admin/Role/ViewRole";
import CreateRole from "./pages/Admin/Role/CreateRole";
import CreatePosition from "./pages/Admin/Position/CreatePosition";
import ViewPosition from "./pages/Admin/Position/VewPositions";
import CreateShift from "./pages/Admin/Shift/CreateShift";
import ViewShift from "./pages/Admin/Shift/ViewShift";

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
          <Route path="admin/user/create-employee" element={<AddEmployee />} />
          <Route path="admin/user/view-employees" element={<EmployeeList />} />
          <Route path="admin/user/view-role" element={<ViewRole />} />
          <Route path="admin/user/create-role" element={<CreateRole />} />
          <Route
            path="admin/user/create-position"
            element={<CreatePosition />}
          />
          <Route path="admin/user/attendance" element={<AttendanceReport />} />
          <Route path="admin/user/view-position" element={<ViewPosition />} />
          <Route path="admin/shift/create-shift" element={<CreateShift />} />
          <Route path="admin/shift/view-shift" element={<ViewShift />} />
          <Route
            path="admin/department/create-department"
            element={<CreateDepartment />}
          />
          <Route
            path="admin/department/view-department"
            element={<ViewDepartment />}
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
