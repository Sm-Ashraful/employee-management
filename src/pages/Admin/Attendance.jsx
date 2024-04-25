import React, { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { format } from "date-fns";
import AdminLayout from "../../UI/Layout/AdminLayout";
import {
  AllEmployeeList,
  dayAttendence,
  getEmployeeLoginHistory,
  nightAttendence,
  unsubscribe,
  // isEmployeePresentToday,
} from "../../utils/Healper";
import AttendanceSheet from "../../utils/AttendanceCalendaer";
//  where("date", "==", todayDateString)
export default function AttendanceReport() {
  const [employeeList, setEmployeeList] = useState([]);

  const dayShift = [];
  const nightShift = [];

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

  const totalDayShift = employeeList.filter(
    (employee) => employee.shift === "day-shift"
  );
  const totalNightShift = employeeList.filter(
    (employee) => employee.shift === "night-shift"
  );

  return (
    <AdminLayout>
      <h3 className="text-2xl py-5 text-center font-bold">Attendance Record</h3>
      <h4 className="text-xl  text-center font-semibold">
        Total Active Employee: {employeeList.length}
      </h4>
      <div className="px-10">
        <h4 className="text-xl font-semibold pb-2">
          Day Shift({totalDayShift.length})
        </h4>
        <hr />
        <div className="pt-5 grid w-full overflow-x-auto">
          <AttendanceSheet data={totalDayShift} />;
        </div>
      </div>
      <div className="w-full py-10 px-10 overflow-hidden">
        <h4 className="text-xl font-semibold pb-2">
          Night Shift({totalNightShift.length})
        </h4>
        <hr />
        <div className="pt-5 grid w-full overflow-x-auto">
          <AttendanceSheet data={totalNightShift} />;
        </div>
      </div>
    </AdminLayout>
  );
}
