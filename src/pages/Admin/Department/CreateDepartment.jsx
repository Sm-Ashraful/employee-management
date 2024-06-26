import React, { useState } from "react";
import AdminLayout from "../../../UI/Layout/AdminLayout";
import { db } from "../../../config/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import CreatePageStructure from "../../../components/CreatePageStructure";

const CreateDepartment = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const departmentCollectionRef = collection(db, "departments");
      // Add the new department data
      await addDoc(departmentCollectionRef, input);
      toast.success("Department added successfully!");

      // Optionally clear input fields
      setInput({ name: "", description: "" });
    } catch (error) {
      console.error("Error adding department:", error);
      toast.error(error);
    }
  };

  const icon = (
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

  return (
    <CreatePageStructure
      icon={icon}
      title={"Department"}
      formTitle={"Create New Department"}
    >
      <form onSubmit={handleSubmit} className="px-5 py-5 ">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            New Department Name
          </label>
          <input
            type="text"
            id="name"
            value={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
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
            type="text"
            id="department"
            value={input.description}
            onChange={(e) =>
              setInput({ ...input, description: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </CreatePageStructure>
  );
};

export default CreateDepartment;
