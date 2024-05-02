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
import PageStructure from "../../components/PageStructure";
import Datepicker from "../../components/Datepicker";
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

  const svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 2048 2048"
    >
      <path
        fill="currentColor"
        d="M1536 1408h192v128h-320v-384h128zm-256-896H256V384h1024zm192 384q119 0 224 45t183 124t123 183t46 224q0 119-45 224t-124 183t-183 123t-224 46q-119 0-224-45t-183-124t-123-183t-46-224q0-119 45-224t124-183t183-123t224-46m0 1024q93 0 174-35t142-96t96-142t36-175q0-93-35-174t-96-142t-142-96t-175-36q-93 0-174 35t-142 96t-96 142t-36 175q0 93 35 174t96 142t142 96t175 36M1166 768q-109 48-200 128H256V768zm-391 384q-14 31-25 63t-21 65H256v-128zm-519 384h451q3 32 8 64t14 64H256zm594 384q50 71 116 128H0V0h1536v707l-32-2q-16-1-32-1t-32 1t-32 2V128H128v1792z"
      />
    </svg>
  );
  // <div className="pt-5 grid w-full overflow-x-auto">
  //   <AttendanceSheet data={totalNightShift} />;
  // </div>;

  // <h4 className="text-xl  text-center font-semibold">
  //   Total Active Employee: {employeeList.length}
  // </h4>;

  const dayIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 30 30"
    >
      <path
        fill="currentColor"
        d="M4.37 14.62c0-.24.08-.45.25-.62c.17-.16.38-.24.6-.24h2.04c.23 0 .42.08.58.25c.15.17.23.37.23.61s-.07.44-.22.61c-.15.17-.35.25-.58.25H5.23c-.23 0-.43-.08-.6-.25a.832.832 0 0 1-.26-.61m2.86 6.93c0-.23.08-.43.23-.61l1.47-1.43c.15-.16.35-.23.59-.23s.44.08.6.23s.24.34.24.57c0 .24-.08.46-.24.64L8.7 22.14c-.41.32-.82.32-1.23 0a.807.807 0 0 1-.24-.59m0-13.84c0-.23.08-.43.23-.61c.2-.17.41-.25.64-.25c.22 0 .42.08.59.24l1.43 1.47c.16.15.24.35.24.59s-.08.44-.24.6s-.36.24-.6.24s-.44-.08-.59-.24L7.47 8.32a.837.837 0 0 1-.24-.61m2.55 6.91c0-.93.23-1.8.7-2.6s1.1-1.44 1.91-1.91s1.67-.7 2.6-.7c.7 0 1.37.14 2.02.42c.64.28 1.2.65 1.66 1.12c.47.47.84 1.02 1.11 1.66c.27.64.41 1.32.41 2.02c0 .94-.23 1.81-.7 2.61c-.47.8-1.1 1.43-1.9 1.9c-.8.47-1.67.7-2.61.7s-1.81-.23-2.61-.7c-.8-.47-1.43-1.1-1.9-1.9c-.45-.81-.69-1.68-.69-2.62m1.7 0c0 .98.34 1.81 1.03 2.5c.68.69 1.51 1.04 2.49 1.04s1.81-.35 2.5-1.04s1.04-1.52 1.04-2.5c0-.96-.35-1.78-1.04-2.47c-.69-.68-1.52-1.02-2.5-1.02c-.97 0-1.8.34-2.48 1.02c-.7.69-1.04 1.51-1.04 2.47m2.66 7.78c0-.24.08-.44.25-.6s.37-.24.6-.24c.24 0 .45.08.61.24s.24.36.24.6v1.99c0 .24-.08.45-.25.62c-.17.17-.37.25-.6.25s-.44-.08-.6-.25a.845.845 0 0 1-.25-.62zm0-15.5V4.86c0-.23.08-.43.25-.6c.17-.17.37-.26.61-.26s.43.08.6.25c.17.17.25.37.25.6V6.9c0 .23-.08.42-.25.58s-.37.23-.6.23s-.44-.08-.6-.23s-.26-.35-.26-.58m5.52 13.18c0-.23.08-.42.23-.56c.15-.16.34-.23.56-.23c.24 0 .44.08.6.23l1.46 1.43c.16.17.24.38.24.61c0 .23-.08.43-.24.59c-.4.31-.8.31-1.2 0l-1.42-1.42a.974.974 0 0 1-.23-.65m0-10.92c0-.25.08-.45.23-.59l1.42-1.47a.84.84 0 0 1 .59-.24c.24 0 .44.08.6.25c.17.17.25.37.25.6c0 .25-.08.46-.24.62l-1.46 1.43c-.18.16-.38.24-.6.24c-.23 0-.41-.08-.56-.24s-.23-.36-.23-.6m2.26 5.46c0-.24.08-.44.24-.62c.16-.16.35-.24.57-.24h2.02c.23 0 .43.09.6.26c.17.17.26.37.26.6s-.09.43-.26.6c-.17.17-.37.25-.6.25h-2.02c-.23 0-.43-.08-.58-.25s-.23-.36-.23-.6"
      />
    </svg>
  );

  return (
    <PageStructure icon={svg} title={"Attendance Record"}>
      <div className="bg-white text-black px-4 min-h-[13rem]">
        <h4 className="flex items-center justify-between text-xl font-semibold pb-2 py-4 ">
          <span className="flex items-center">
            {dayIcon}
            Day shift attendance record
          </span>
          <Datepicker align={"right"} />
        </h4>
        <hr />
      </div>

      <div className="w-full py-10 overflow-hidden">
        <h4 className="text-xl font-semibold pb-2">
          Night Shift({totalNightShift.length})
        </h4>
        <hr />
      </div>
    </PageStructure>
  );
}
