import React, { useState } from "react";
import CreatePageStructure from "../../../components/CreatePageStructure";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../config/firebase.config";
import toast from "react-hot-toast";

const CreateRole = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const roleCollectionRef = collection(db, "role");
      // Add the new department data
      await addDoc(roleCollectionRef, input);
      toast.success("New role added successfully!");

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
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M19.307 3.21a2.91 2.91 0 1 0-.223 1.94a11.636 11.636 0 0 1 8.232 7.049l1.775-.698a13.576 13.576 0 0 0-9.784-8.291m-2.822 1.638a.97.97 0 1 1 0-1.939a.97.97 0 0 1 0 1.94m-4.267.805l-.717-1.774a13.576 13.576 0 0 0-8.291 9.784a2.91 2.91 0 1 0 1.94.223a11.636 11.636 0 0 1 7.068-8.233m-8.34 11.802a.97.97 0 1 1 0-1.94a.97.97 0 0 1 0 1.94m12.607 8.727a2.91 2.91 0 0 0-2.599 1.62a11.636 11.636 0 0 1-8.233-7.05l-1.774.717a13.576 13.576 0 0 0 9.813 8.291a2.91 2.91 0 1 0 2.793-3.578m0 3.879a.97.97 0 1 1 0-1.94a.97.97 0 0 1 0 1.94M32 16.485a2.91 2.91 0 1 0-4.199 2.599a11.636 11.636 0 0 1-7.05 8.232l.718 1.775a13.576 13.576 0 0 0 8.291-9.813A2.91 2.91 0 0 0 32 16.485m-2.91.97a.97.97 0 1 1 0-1.94a.97.97 0 0 1 0 1.94"
      />
      <path
        fill="currentColor"
        d="M19.19 16.35a3.879 3.879 0 1 0-5.42 0a4.848 4.848 0 0 0-2.134 4.014v1.939h9.697v-1.94a4.848 4.848 0 0 0-2.143-4.014m-4.645-2.774a1.94 1.94 0 1 1 3.88 0a1.94 1.94 0 0 1-3.88 0m-.97 6.788a2.91 2.91 0 1 1 5.819 0z"
        class="ouiIcon__fillSecondary"
      />
    </svg>
  );

  return (
    <CreatePageStructure
      icon={icon}
      title={"Employee Role"}
      formTitle={"Create New Role"}
    >
      <form onSubmit={handleSubmit} className="px-5 py-5 ">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            New Role Name
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

export default CreateRole;
