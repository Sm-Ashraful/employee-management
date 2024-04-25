import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const handleRedirect = (type) => {
    if (type === "admin") {
      navigate("/admin/signin");
    } else {
      navigate("/employee/login");
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h3 className="text-xl">Welcome to Mitali Employee Management System</h3>
      <div className="flex gap-10 mt-10">
        <button
          onClick={() => handleRedirect("admin")}
          className="bg-white font-semibold text-black px-6 py-2 text-xl rounded-md"
        >
          Admin Login
        </button>
        <button
          onClick={() => handleRedirect("employee")}
          className="bg-red-100 font-semibold text-black px-6 py-2 text-xl rounded-md"
        >
          Employee Login
        </button>
      </div>
    </div>
  );
}
