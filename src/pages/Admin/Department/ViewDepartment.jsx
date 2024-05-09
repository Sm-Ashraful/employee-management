import React, { useEffect, useState } from "react";
import { db } from "../../../config/firebase.config";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import Loading from "../../../partials/Loading";
import PageStructure from "../../../components/PageStructure";
import CustomTable from "../../../components/Table";
import EditModal from "../../../partials/Model";
import AlertBox from "../../../partials/Model/Alert";

const ViewDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [dataToRemove, setDataToRemove] = React.useState(null);
  const [modalData, setModalData] = useState(null);

  const [name, setName] = React.useState(modalData?.name || "");
  const [description, setDescription] = React.useState(
    modalData?.description || ""
  );

  const handleClickOpen = () => {
    setOpenAlert(true);
  };

  const handleOpen = () => setOpen(true);

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

  useEffect(() => {
    setName(modalData?.name || "");
    setDescription(modalData?.description || "");
  }, [modalData]);

  if (departments.length < 1) {
    return <Loading />;
  }
  const svg = (
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
  );

  const tableHead = (
    <tr>
      <th scope="col" class="px-6 py-3">
        SN
      </th>
      <th scope="col" class="px-6 py-3">
        Department Name
      </th>
      <th scope="col" class="px-6 py-3">
        Description
      </th>
      <th scope="col" class="px-6 py-3">
        Edit
      </th>
      <th scope="col" class="px-6 py-3">
        Delete
      </th>
    </tr>
  );

  const handleEditingDepartment = (department) => {
    setModalData(department);
    handleOpen();
  };
  const handleOpenAlertBox = (data) => {
    setDataToRemove(data);
    handleClickOpen();
  };

  const handleDeleteDepartment = async (e, department) => {
    e.preventDefault();
    const departmentRef = doc(db, "departments", department.id);
    await deleteDoc(departmentRef);
    setOpenAlert(false);
  };

  const tableBody = departments.map((department, i) => {
    return (
      <tr class="bg-white border-b">
        <td className="px-6 py-4 border-r">{i + 1}</td>
        <th
          scope="row"
          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r "
        >
          {department.name}
        </th>
        <td class="px-6 py-4  border-r">{department.description}</td>
        <td
          class="px-6 py-4 text-blue-500  border-r cursor-pointer"
          onClick={() => handleEditingDepartment(department)}
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
          onClick={() => handleOpenAlertBox(department)}
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

  const handleClose = () => {
    setOpen(false);
    setName(""); // Reset name
    setDescription("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const departmentRef = doc(db, "departments", modalData?.id);
    try {
      await updateDoc(departmentRef, { name, description });
      console.log("Department updated successfully");
      handleClose();
      // setIsEditing(false); // Close modal or similar
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  return (
    <PageStructure icon={svg} title={"All Departments"}>
      <CustomTable tableHead={tableHead} tableBody={tableBody} />

      <EditModal
        key={modalData?.id}
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Department Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="department"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Description
          </label>
          <textarea
            row={6}
            type="text"
            id="department"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
      </EditModal>
      <AlertBox
        key={dataToRemove?.id}
        data={dataToRemove}
        open={openAlert}
        setOpen={setOpenAlert}
        handleDeleteSubmit={handleDeleteDepartment}
      />
    </PageStructure>
  );
};

export default ViewDepartment;
