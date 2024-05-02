import React, { useState } from "react";
import CreatePageStructure from "../../../components/CreatePageStructure";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../config/firebase.config";
import toast from "react-hot-toast";

const CreatePosition = () => {
  const [input, setInput] = useState({
    name: "",
    responsibilities: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const positionCollectionRef = collection(db, "position");
      // Add the new department data
      await addDoc(positionCollectionRef, input);
      toast.success("Position added successfully!");

      // Optionally clear input fields
      setInput({ name: "", responsibilities: "" });
    } catch (error) {
      console.error("Error adding position:", error);
      toast.error(error);
    }
  };

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M4 20v-4.5h16V20zm12.115-5.5V4H20v10.5zM4 14.5V4h3.885v10.5zm4.885 0V4h6.23v10.5z"
      />
    </svg>
  );
  return (
    <CreatePageStructure
      icon={icon}
      title={"Employee Position"}
      formTitle={"Create New Position"}
    >
      <form onSubmit={handleSubmit} className="px-5 py-5 ">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            New Position Name
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
            Position Responsibility
          </label>
          <textarea
            type="text"
            id="department"
            value={input.responsibilities}
            onChange={(e) =>
              setInput({ ...input, responsibilities: e.target.value })
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

export default CreatePosition;
