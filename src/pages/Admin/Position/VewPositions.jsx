import React, { useEffect, useState } from "react";
import PageStructure from "../../../components/PageStructure";
import CustomTable from "../../../components/Table";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../config/firebase.config";
import Loading from "../../../partials/Loading";

const ViewPosition = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const roleCollectionRef = collection(db, "position");

    // Real-time listener
    const unsubscribe = onSnapshot(roleCollectionRef, (querySnapshot) => {
      const updatedPosition = [];
      querySnapshot.forEach((doc) => {
        updatedPosition.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPositions(updatedPosition);
    });

    // Cleanup function for the listener
    return () => unsubscribe();
  }, []);

  if (positions.length < 1) {
    return <Loading />;
  }
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

  const tableHead = (
    <tr>
      <th scope="col" class="px-6 py-3">
        SN
      </th>
      <th scope="col" class="px-6 py-3">
        Position Name
      </th>
      <th scope="col" class="px-6 py-3">
        Responsibilities
      </th>
      <th scope="col" class="px-6 py-3">
        Edit
      </th>
      <th scope="col" class="px-6 py-3">
        Delete
      </th>
    </tr>
  );
  const tableBody = positions.map((position, i) => {
    return (
      <tr class="bg-white border-b">
        <td className="px-6 py-4 border-r">{i + 1}</td>
        <th
          scope="row"
          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r "
        >
          {position.name}
        </th>
        <td class="px-6 py-4  border-r">{position.responsibilities}</td>
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
    <PageStructure icon={icon} title={"All Positions"}>
      <CustomTable tableHead={tableHead} tableBody={tableBody} />
    </PageStructure>
  );
};

export default ViewPosition;
