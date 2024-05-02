import React, { useEffect, useState } from "react";
import PopupModal from "../../../components/PopupModa";
import Loading from "../../../partials/Loading";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../config/firebase.config";
import PageStructure from "../../../components/PageStructure";
import CustomTable from "../../../components/Table";
import demoImage from "../../../images/demo.jpg";
import editIcon from "../../../images/edit.svg";

export default function EmployeeList() {
  const [employeeList, setEmployeeList] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const collectionRef = collection(db, "employees");

    // Real-time listener
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const updatedEmployee = [];
      querySnapshot.forEach((doc) => {
        updatedEmployee.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setEmployeeList(updatedEmployee);
    });
    return () => unsubscribe();
  }, []);

  const totalEmployer = employeeList.filter(
    (employee) =>
      employee.shift === "Day Shift" || employee.shift === "Night Shift"
  );

  const svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.4 3.4 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.4 3.4 0 0 0 15 11a3.5 3.5 0 0 0 0-7"
      />
    </svg>
  );

  if (employeeList.length < 1) {
    return <Loading />;
  }

  const tHead = (
    <tr>
      <th scope="col" class="px-6 py-3 text-center">
        SN
      </th>
      <th scope="col" class="px-6 py-3 text-center">
        Photo
      </th>
      <th scope="col" class="px-6 py-3 text-center">
        Name
      </th>
      <th scope="col" class="px-6 py-3 text-center">
        Employee Id
      </th>
      <th scope="col" class="px-6 py-3 text-center">
        Email
      </th>
      <th scope="col" class="px-6 py-3 text-center">
        Mobile Number
      </th>
      <th scope="col" class="px-6 py-3 text-center">
        Role
      </th>
      <th scope="col" class="px-6 py-3 text-center">
        Post
      </th>
      <th scope="col" class="px-6 py-3 text-center">
        Shift
      </th>
      <th scope="col" class="px-6 py-3 text-center">
        Joining Date
      </th>
      <th scope="col" class="px-6 py-3 text-center">
        Address
      </th>

      <th scope="col" class="px-6 py-3 text-center">
        NID Number
      </th>
      <th scope="col" class="px-6 py-3 text-center">
        Salary Earned
      </th>

      <th scope="col" class="px-6 py-3 text-center">
        Edit
      </th>
    </tr>
  );

  const tBody = totalEmployer.map((employee, i) => {
    return (
      <tr
        class="bg-white border-b"
        key={i}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <td className="px-6 py-4 border-r">{i + 1}</td>
        <td className="px-2 py-2 border-r flex justify-center align-center">
          <img
            src={employee?.image ? employee.image : demoImage}
            alt={employee.name}
            className="w-10 h-10 bg-cover text-center"
          />
        </td>
        <th
          scope="row"
          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r "
        >
          {employee?.name}
        </th>
        <td class="px-6 py-4  border-r">{employee.id}</td>
        <td class="px-6 py-4 text-blue-500  border-r">{employee.email}</td>
        <td class="px-6 py-4 text-gray-900 border-r">{employee?.phone}</td>
        <td class="px-6 py-4 text-white border-r ">
          <span className="bg-green-500 rounded-3xl px-2 text-center">
            {employee?.type}
          </span>
        </td>
        <td class="px-6 py-4 text-gray-900 border-r">
          {employee?.designation}
        </td>
        <td class="px-6 py-4 text-gray-900 border-r">{employee?.shift}</td>
        <td class="px-6 py-4 text-gray-900 border-r">
          {employee?.joinDate ? employee.joinDate : "N/A"}
        </td>
        <td class="px-6 py-4 text-gray-900 border-r">
          {employee?.address ? employee.address : "N/A"}
        </td>
        <td class="px-6 py-4 text-gray-900 border-r">
          {employee?.nid ? employee.nid : "N/A"}
        </td>
        <td class="px-6 py-4 text-gray-900 border-r">
          {employee?.address ? employee.address : "N/A"}
        </td>
        <td class="px-6 py-4 text-gray-900 border-r">
          <img src={editIcon} alt="edit icon" text-blue-500 />
        </td>
      </tr>
    );
  });
  return (
    <PageStructure icon={svg} title={"All Employee List"}>
      <CustomTable tableHead={tHead} tableBody={tBody} />
      <PopupModal handleClose={handleClose} open={open} data={modalData} />
    </PageStructure>
  );
}
