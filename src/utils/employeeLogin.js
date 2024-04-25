import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase.config";
import bcryptjs from "bcryptjs";

export async function login(email, password) {
  try {
    const employeesRef = collection(db, "employees");
    const q = query(employeesRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    const employeeData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (employeeData.length === 0) {
      return null; // Email not found
    }

    // Assuming unique emails
    const employee = employeeData[0];

    const passwordMatch = await bcryptjs.compare(password, employee.password); // Compare with the hash

    return passwordMatch ? employee : null;
  } catch (error) {
    console.error("Login Error:", error);
    throw error; // Re-throw error
  }
}
