import React, { useEffect, useState } from "react";
import PageStructure from "../../../components/PageStructure";
import CustomTable from "../../../components/Table";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../config/firebase.config";
import Loading from "../../../partials/Loading";

const ViewRole = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const roleCollectionRef = collection(db, "role");

    // Real-time listener
    const unsubscribe = onSnapshot(roleCollectionRef, (querySnapshot) => {
      const updatedRoles = [];
      querySnapshot.forEach((doc) => {
        updatedRoles.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setRoles(updatedRoles);
    });

    // Cleanup function for the listener
    return () => unsubscribe();
  }, []);

  if (roles.length < 1) {
    return <Loading />;
  }
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

  const tableHead = (
    <tr>
      <th scope="col" class="px-6 py-3">
        SN
      </th>
      <th scope="col" class="px-6 py-3">
        Role Name
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
  const tableBody = roles.map((role, i) => {
    return (
      <tr class="bg-white border-b">
        <td className="px-6 py-4 border-r">{i + 1}</td>
        <th
          scope="row"
          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r "
        >
          {role.name}
        </th>
        <td class="px-6 py-4  border-r">{role.description}</td>
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
    <PageStructure icon={icon} title={"All Roles"}>
      <CustomTable tableHead={tableHead} tableBody={tableBody} />
    </PageStructure>
  );
};

export default ViewRole;
