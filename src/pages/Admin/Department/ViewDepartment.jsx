import React, { useEffect, useState } from "react";
import AdminLayout from "../../../UI/Layout/AdminLayout";
import { db } from "../../../config/firebase.config";
import { collection, onSnapshot } from "firebase/firestore";
import DataTable from "../../../partials/DataTable";

const ViewDepartment = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const departmentCollectionRef = collection(db, "departments");

    // Real-time listener
    const unsubscribe = onSnapshot(departmentCollectionRef, (querySnapshot) => {
      const updatedDepartments = [];
      querySnapshot.forEach((doc) => {
        updatedDepartments.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setDepartments(updatedDepartments);
    });

    // Cleanup function for the listener
    return () => unsubscribe();
  }, []);

  if (departments.length < 1) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
      <div className="relative w-full px-10 pt-5">
        <div className="w-full bg-blue-100">
          <p className="py-2 flex items-center gap-1 pl-5 text-black font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className={`fill-current`}
            >
              <g fill="none" fill-rule="evenodd">
                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <path
                  fill="currentColor"
                  d="M15 6a3.001 3.001 0 0 1-2 2.83V11h3a3 3 0 0 1 3 3v1.17a3.001 3.001 0 1 1-2 0V14a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v1.17a3.001 3.001 0 1 1-2 0V14a3 3 0 0 1 3-3h3V8.83A3.001 3.001 0 1 1 15 6m-3-1a1 1 0 1 0 0 2a1 1 0 0 0 0-2M6 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2m12 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2"
                />
              </g>
            </svg>
            <span>All Departments</span>
          </p>
        </div>
        <div className="border mt-6  bg-white rounded-md">
          <DataTable />
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewDepartment;
