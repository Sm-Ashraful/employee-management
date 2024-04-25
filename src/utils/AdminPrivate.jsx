import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function AdminProtectedRoute() {
  const storedUserString = sessionStorage.getItem("user");

  const user = JSON.parse(storedUserString);
  // Access properties like parsedUser.email, etc.

  const isAdmin = user.type === "admin";
  if (!isAdmin) {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
}
export default AdminProtectedRoute;
