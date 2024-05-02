import React, { useState } from "react";
import { db } from "../../../config/firebase.config";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { generateJobIdNumber } from "../../../utils/Healper";
import toast from "react-hot-toast";

import bcryptjs from "bcryptjs";
import CreatePageStructure from "../../../components/CreatePageStructure";
import { useCollectionListener } from "../../../utils/useCollectionData";

export default function AddEmployee() {
  const [input, setInput] = useState({
    type: "",
    designation: "",
    shift: "Night Shift",
    name: "",
    email: "",
    password: "",
    phone: "",
    salary: "",
    joinDate: "",
    address: "",
    nid: "",
  });

  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const formattedDate = today.toLocaleDateString("en-US", options);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const emailQuery = query(
        collection(db, "employees"),
        where("email", "==", input.email)
      );
      const querySnapshot = await getDocs(emailQuery);
      if (querySnapshot.empty) {
        const jobId = await generateJobIdNumber(input.type, input.shift);
        const cityRef = doc(db, "employees", jobId);
        const saltRounds = 10; // Adjust the number of rounds as needed
        const hashedPassword = await bcryptjs.hash(input.password, saltRounds);
        await setDoc(cityRef, {
          ...input,
          password: hashedPassword, // Store the hashed password
        });
        toast.success("Successfully added");
        setInput({
          type: "",
          designation: "",
          shift: "",
          name: "",
          email: "",
          password: "",
          phone: "",
          salary: "",
          joinDate: "",
          address: "",
          nid: "",
        });
      } else {
        toast.error("Email already exits");
      }
    } catch (error) {
      toast.error("This didn't work.");
      console.log("Error", error);
    }
  };
  const departments = useCollectionListener("departments");
  const roles = useCollectionListener("role");
  const positions = useCollectionListener("position");
  const shifts = useCollectionListener("shift");

  return (
    <CreatePageStructure
      title="Register Employee"
      formTitle={"Add Employee Information"}
    >
      <form onSubmit={handleFormSubmit} class="px-5 my-5">
        <div class="grid md:grid-cols-3 md:gap-6 mb-5">
          <div class="relative z-0 w-full group">
            <label
              for="type"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Employee Role
            </label>
            <select
              id="type"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={input.type} // Set the select field's value
              onChange={(e) => setInput({ ...input, type: e.target.value })}
            >
              <option>Select role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div class="relative z-0 w-full  group">
            <label
              for="designation"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Select Designation
            </label>
            <select
              id="designation"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={input.designation}
              onChange={(e) =>
                setInput({ ...input, designation: e.target.value })
              }
            >
              <option value="">Select designation</option>
              {positions.map((position) => (
                <option key={position.id} value={position.name}>
                  {position.name}
                </option>
              ))}
            </select>
          </div>
          <div class="relative z-0 w-full  group">
            <label
              for="shift"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Select Shift
            </label>
            <select
              id="shift"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={input.shift}
              onChange={(e) => setInput({ ...input, shift: e.target.value })}
            >
              <option value="">Select Shift</option>
              {shifts.map((shift) => (
                <option key={shift.id} value={shift.name}>
                  {shift.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              class="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border rounded-md border-gray-300 appearance-none "
              placeholder=" "
              required
            />
          </div>
          <div class="relative z-0 w-full group">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              class="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border rounded-md border-gray-300 appearance-none "
              placeholder=" "
              required
            />
          </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              class="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border rounded-md border-gray-300 appearance-none "
              placeholder=" "
              required
            />
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <label
              for="phone"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Phone number (01738XXXXXX)
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={input.phone}
              onChange={(e) => setInput({ ...input, phone: e.target.value })}
              class="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border rounded-md border-gray-300 appearance-none "
              placeholder=" "
              required
            />
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-3 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <label
              for="salary"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Salary (Basic)
            </label>
            <input
              type="text"
              name="salary"
              id="salary"
              value={input.salary}
              onChange={(e) => setInput({ ...input, salary: e.target.value })}
              class="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border rounded-md border-gray-300 appearance-none "
              placeholder=" "
              required
            />
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <label
              for="joinDate"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Joining Date
            </label>
            <input
              type="date" // Set the input type to "date" for a date input
              name="joinDate" // Set the name attribute
              id="joinDate"
              value={input.joinDate}
              onChange={(e) => setInput({ ...input, joinDate: e.target.value })}
              class="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border rounded-md border-gray-300 appearance-none "
              placeholder=" "
              required
            />
          </div>

          <div class="relative z-0 w-full mb-5 group">
            <label
              for="nid"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              NID number
            </label>
            <input
              type="text"
              name="nid"
              id="nid"
              value={input.nid}
              onChange={(e) => setInput({ ...input, nid: e.target.value })}
              class="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border rounded-md border-gray-300 appearance-none "
              placeholder=" "
              required
            />
          </div>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <label
            for="Address"
            class="block mb-2 text-sm font-medium text-gray-900 "
          >
            Permanent Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={input.address}
            onChange={(e) => setInput({ ...input, address: e.target.value })}
            class="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border rounded-md border-gray-300 appearance-none "
            placeholder=""
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-auto"
          >
            Submit
          </button>
        </div>
      </form>
    </CreatePageStructure>
  );
}
