import React, { useState } from "react";
import { db } from "../../config/firebase.config";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { generateJobIdNumber } from "../../utils/Healper";
import toast from "react-hot-toast";
import AdminLayout from "../../UI/Layout/AdminLayout";
import bcryptjs from "bcryptjs";

export default function AddEmployee() {
  const [input, setInput] = useState({
    type: "employee",
    designation: "call-center",
    shift: "night-shift",
    f_name: "",
    l_name: "",
    email: "",
    password: "",
    phone: "",
    salary: "",
    joiningDate: "",
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
          type: "employee",
          designation: "call-center",
          shift: "night-shift",
          f_name: "",
          l_name: "",
          email: "",
          password: "",
          phone: "",
          salary: "",
        });
      } else {
        toast.error("Email already exits");
      }
    } catch (error) {
      toast.error("This didn't work.");
      console.log("Error", error);
    }
  };
  return (
    <AdminLayout>
      <div className="m-5">
        <div className="flex justify-between">
          <h4 className="text-xl uppercase font-bold  dark:text-white">
            Add New Employee
          </h4>
          <p className="font-semibold">{formattedDate}</p>
        </div>
        <form onSubmit={handleFormSubmit} class="max-w-full  mx-auto mt-10">
          <div class="grid md:grid-cols-3 md:gap-6 mb-5">
            <div class="relative z-0 w-full  group">
              <label
                for="type"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Employee Type
              </label>
              <select
                id="type"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={input.type} // Set the select field's value
                onChange={(e) => setInput({ ...input, type: e.target.value })}
              >
                <option value={"employee"}>Employee</option>
                <option value={"team-leader"}>Team Leader</option>
              </select>
            </div>
            <div class="relative z-0 w-full  group">
              <label
                for="designation"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Designation
              </label>
              <select
                id="designation"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={input.designation}
                onChange={(e) =>
                  setInput({ ...input, designation: e.target.value })
                }
              >
                <option value={"call-center"}>Call Center Executive</option>
                <option value={"web-developer"}>Web Developer</option>
                <option value={"graphics-designer"}>Graphics Designer</option>
                <option value={"sells-executive"}>Sells Executive</option>
              </select>
            </div>
            <div class="relative z-0 w-full  group">
              <label
                for="shift"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Shift
              </label>
              <select
                id="shift"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={input.shift}
                onChange={(e) => setInput({ ...input, shift: e.target.value })}
              >
                <option value="night-shift">Night Shift</option>
                <option value="day-shift">Day Shift</option>
              </select>
            </div>
          </div>

          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="f_name"
                id="f_name"
                value={input.f_name}
                onChange={(e) => setInput({ ...input, f_name: e.target.value })}
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="f_name"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First name
              </label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="l_name"
                id="l_name"
                value={input.l_name}
                onChange={(e) => setInput({ ...input, l_name: e.target.value })}
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="l_name"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last name
              </label>
            </div>
          </div>

          <div class="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="email"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>

          <div class="relative z-0 w-full group">
            <input
              type="password"
              name="password"
              id="password"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="password"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="tel"
                name="phone"
                id="phone"
                value={input.phone}
                onChange={(e) => setInput({ ...input, phone: e.target.value })}
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="phone"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number (01738129293)
              </label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="salary"
                id="salary"
                value={input.salary}
                onChange={(e) => setInput({ ...input, salary: e.target.value })}
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="salary"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Salary (Basic)
              </label>
            </div>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
