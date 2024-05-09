import React, { useEffect, useState } from "react";
import Loading from "../../../partials/Loading";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebase.config";
import PageStructure from "../../../components/PageStructure";
import CustomTable from "../../../components/Table";
import demoImage from "../../../images/demo.jpg";
import EditModal from "../../../partials/Model";
import { useCollectionListener } from "../../../utils/useCollectionData";
import AlertBox from "../../../partials/Model/Alert";

export default function EmployeeList() {
  const [employeeList, setEmployeeList] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState(modalData?.name || "");
  const [email, setEmail] = useState(modalData?.email || "");
  const [phone, setPhone] = useState(modalData?.phone || "");
  const [designation, setDesignation] = useState(modalData?.designation || "");
  const [shift, setShift] = useState(modalData?.shift || "");
  const [address, setAddress] = useState(modalData?.address || "");
  const [nid, setNid] = useState(modalData?.nid || "");
  const [previewImage, setPreviewImage] = useState(modalData?.img || "");

  const [dataToRemove, setDataToRemove] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  const positions = useCollectionListener("position");
  const shifts = useCollectionListener("shift");

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

  useEffect(() => {
    console.log("MOdal data: ", modalData);
    setName(modalData?.name || "");
    setEmail(modalData?.email || "");
    setPhone(modalData?.phone || "");
    setDesignation(modalData?.designation || "");
    setShift(modalData?.shift || "");
    setAddress(modalData?.address || "");
    setNid(modalData?.nid || "");
  }, [modalData]);

  const handleOpen = (data) => {
    setModalData(data);
    setOpen(true);
  };

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
      <th scope="col" class="px-6 py-3 text-center">
        Delete
      </th>
    </tr>
  );
  //  <PopupModal handleClose={handleClose} open={open} data={modalData} />

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
        <td
          class="px-6 py-4 text-blue-500  border-r cursor-pointer"
          onClick={() => handleOpen(employee)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006z"
            />
            <path
              fill="currentColor"
              d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2"
            />
          </svg>
        </td>
        <td
          class="px-6 py-4 text-red-500 border-r cursor-pointer"
          onClick={() => handleAlertOpen(employee)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="M7 3h2a1 1 0 0 0-2 0M6 3a2 2 0 1 1 4 0h4a.5.5 0 0 1 0 1h-.564l-1.205 8.838A2.5 2.5 0 0 1 9.754 15H6.246a2.5 2.5 0 0 1-2.477-2.162L2.564 4H2a.5.5 0 0 1 0-1zm1 3.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0zM9.5 6a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-.5-.5"
            />
          </svg>
        </td>
      </tr>
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeRef = doc(db, "employees", modalData?.id);
    try {
      await updateDoc(employeeRef, {
        name,
        phone,
        email,
        designation,
        shift,
        address,
        nid,
      });
      console.log("Employee updated successfully");
      handleClose();
      // setIsEditing(false); // Close modal or similar
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  const handleAlertOpen = (data) => {
    setDataToRemove(data);
    setOpenAlert(true);
  };

  const handleDeleteEmployee = async (e, employee) => {
    e.preventDefault();
    const employeeRef = doc(db, "employees", employee.id);
    await deleteDoc(employeeRef);
    setOpenAlert(false);
  };

  return (
    <PageStructure icon={svg} title={"All Employee List"}>
      <CustomTable tableHead={tHead} tableBody={tBody} />
      <EditModal
        key={modalData?.id}
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        width="1000px"
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="mb-5 col-span-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-5 col-span-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5 col-span-4">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="mb-5 col-span-4">
            <label
              for="designation"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Select Designation
            </label>
            <select
              id="designation"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            >
              {positions.map((position) => (
                <option key={position.id} value={position.name}>
                  {position.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5 col-span-4">
            <label
              for="shift"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Select Shift
            </label>
            <select
              id="shift"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={shift}
              onChange={(e) => setShift(e.target.value)}
            >
              {shifts.map((shift) => (
                <option key={shift.id} value={shift.name}>
                  {shift.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5 col-span-4">
            <label
              htmlFor="nid"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              NID Number
            </label>
            <input
              type="text"
              id="nid"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              value={nid}
              onChange={(e) => setNid(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="mb-5 col-span-8 ">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Address
            </label>
            <textarea
              row={4}
              id="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="col-span-4">
            <div class="h-10 w-10">
              <img id="preview-image" src="" alt="Image Preview" />
            </div>
            <label for="image-upload">Choose Image:</label>
            <input type="file" id="image-upload" accept="image/*" />
          </div>
        </div>
      </EditModal>
      <AlertBox
        key={dataToRemove?.id}
        data={dataToRemove}
        open={openAlert}
        setOpen={setOpenAlert}
        handleDeleteSubmit={handleDeleteEmployee}
      />
    </PageStructure>
  );
}
