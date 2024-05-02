import React, { useState } from "react";
import CreatePageStructure from "../../../components/CreatePageStructure";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../config/firebase.config";
import toast from "react-hot-toast";

const CreateShift = () => {
  const [input, setInput] = useState({
    name: "",
    schedule: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const shiftCollectionRef = collection(db, "shift");
      // Add the new department data
      await addDoc(shiftCollectionRef, input);
      toast.success("Position added successfully!");

      // Optionally clear input fields
      setInput({ name: "", schedule: "" });
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
      viewBox="0 0 20 20"
    >
      <path
        fill="currentColor"
        d="M10 6.5a.5.5 0 0 0-1 0v4a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1H10zM6 3a3 3 0 0 0-3 3v4.104a2.8 2.8 0 0 1 1-.093V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.092q.091.301.092.625a3 3 0 0 1-.025.375H14a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zM3.75 14.5a1.75 1.75 0 1 0 0-3.5a1.75 1.75 0 0 0 0 3.5M4 19c2.143 0 3-1.098 3-2.187c0-.725-.576-1.313-1.286-1.313H2.286c-.71 0-1.286.588-1.286 1.313C1 17.906 1.857 19 4 19m3.5-.5h-.023A2.95 2.95 0 0 0 8 16.813c0-.484-.148-.938-.404-1.313H8.93c.592 0 1.071.504 1.071 1.125c0 .934-.714 1.875-2.5 1.875m.25-4a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5"
      />
    </svg>
  );
  return (
    <CreatePageStructure
      icon={icon}
      title={"Shift Management"}
      formTitle={"Create New shifts"}
    >
      <form onSubmit={handleSubmit} className="px-5 py-5 ">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            New Shift Name
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
            Schedule
          </label>
          <textarea
            type="text"
            id="department"
            value={input.schedule}
            placeholder="Ex. 8.00 am - 4.00 pm"
            onChange={(e) => setInput({ ...input, schedule: e.target.value })}
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

export default CreateShift;
