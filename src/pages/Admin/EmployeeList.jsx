import React, { useEffect, useState } from "react";
import { AllEmployeeList } from "../../utils/Healper";
import AdminLayout from "../../UI/Layout/AdminLayout";
import EmployeeTable from "../../components/EmployeeTable";
import PopupModal from "../../components/PopupModa";

export default function EmployeeList() {
  const [employeeList, setEmployeeList] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const fetchEmployeeList = async () => {
      try {
        const employeeDataPromises = await AllEmployeeList();
        const employeeData = await Promise.all(employeeDataPromises);
        // Assuming AllEmployeeList returns an array of employees
        setEmployeeList(employeeData);
      } catch (error) {
        console.error("Error fetching employee list:", error);
      }
    };

    fetchEmployeeList();
  }, []);
  const totalEmployer = employeeList.filter(
    (employee) =>
      employee.shift === "day-shift" || employee.shift === "night-shift"
  );

  // employeeList.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log("Docs: ", doc.data());
  //   return doc;
  // });
  //
  return (
    <AdminLayout>
      <h4 className="text-xl font-bold py-5 text-center">Employee List</h4>
      <div>
        <EmployeeTable
          employeeList={totalEmployer}
          setModalData={setModalData}
          handleOpen={handleOpen}
        />
        <PopupModal handleClose={handleClose} open={open} data={modalData} />
      </div>
    </AdminLayout>
  );
}
