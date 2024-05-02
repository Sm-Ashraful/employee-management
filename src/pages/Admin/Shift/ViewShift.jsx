import React, { useEffect, useState } from "react";
import PageStructure from "../../../components/PageStructure";
import CustomTable from "../../../components/Table";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../config/firebase.config";
import Loading from "../../../partials/Loading";

const ViewShift = () => {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    const shiftCollectionRef = collection(db, "shift");

    // Real-time listener
    const unsubscribe = onSnapshot(shiftCollectionRef, (querySnapshot) => {
      const updatedPosition = [];
      querySnapshot.forEach((doc) => {
        updatedPosition.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setShifts(updatedPosition);
    });

    // Cleanup function for the listener
    return () => unsubscribe();
  }, []);

  if (shifts.length < 1) {
    return <Loading />;
  }
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

  const tableHead = (
    <tr>
      <th scope="col" class="px-6 py-3">
        SN
      </th>
      <th scope="col" class="px-6 py-3">
        Shift Name
      </th>
      <th scope="col" class="px-6 py-3">
        Schedule
      </th>
      <th scope="col" class="px-6 py-3">
        Edit
      </th>
      <th scope="col" class="px-6 py-3">
        Delete
      </th>
    </tr>
  );
  const tableBody = shifts.map((shift, i) => {
    return (
      <tr class="bg-white border-b">
        <td className="px-6 py-4 border-r">{i + 1}</td>
        <th
          scope="row"
          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r "
        >
          {shift.name}
        </th>
        <td class="px-6 py-4  border-r">{shift.schedule}</td>
        <td class="px-6 py-4 text-blue-500  border-r">
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
        <td class="px-6 py-4 text-red-500 border-r">
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
  return (
    <PageStructure icon={icon} title={"All Sifts"}>
      <CustomTable tableHead={tableHead} tableBody={tableBody} />
    </PageStructure>
  );
};

export default ViewShift;
