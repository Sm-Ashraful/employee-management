import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  collection,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";
import { db } from "../config/firebase.config";
import { format } from "date-fns";

export async function generateJobIdNumber(type, shift) {
  const prefix = shift === "night-shift" ? "MN" : "MD";
  const docRef = doc(db, "employees", prefix);
  let currentCount;

  if (docRef) {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      currentCount = docSnap.data().count;
    } else {
      currentCount = prefix === "MN" ? 11000 : 10000;
      await setDoc(docRef, { count: currentCount }); // Initialize if not exists
    }

    currentCount++;
  }

  const jobId = `${prefix}${currentCount}`;

  await updateDoc(docRef, { count: currentCount }); // Update the count

  return jobId;
} // Assuming Firestore

// // Starting point
export async function AllEmployeeList() {
  // Inside AllEmployeeList() function:
  const collectionRef = collection(db, "employees");
  const querySnapshot = await getDocs(collectionRef); // Example Firestore call

  // Problem: querySnapshot is NOT directly an array
  const employeeData = querySnapshot.docs.map(async (doc) => {
    const loginHistoryRef = collection(doc.ref, "loginHistory");
    const querySnap = await getDocs(loginHistoryRef);
    const todayDateString = format(new Date(), "yyyy-MM-dd");
    const q = query(querySnap);
    const loginHistory = q.docs.map((doc) => {
      return {
        historyId: doc.id,
        ...doc.data(),
        isToday: doc.data().date === todayDateString,
      };
    });
    return {
      id: doc.id,
      ...doc.data(),
      loginHistory,
    };
  });
  return employeeData;
}

//calculate working days
export function calculateWorkingDays(startDate, endDate, holidays = []) {
  // Ensure startDate is before endDate
  if (startDate > endDate) {
    [startDate, endDate] = [endDate, startDate];
  }

  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  let workingDays = 0;
  let currentDate = new Date(startDate); // Clone the startDate

  for (let i = 0; i <= totalDays; i++) {
    const dayOfWeek = currentDate.getDay();

    // Check if it's a weekend or a custom holiday
    if (
      dayOfWeek !== 5 &&
      dayOfWeek !== 6 &&
      !holidays.includes(currentDate.toISOString().substring(0, 10))
    ) {
      workingDays++;
    }

    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }

  return workingDays;
}

export async function getEmployeeLoginHistory(employeeId) {
  const employeeRef = doc(db, "employees", employeeId);
  const loginHistoryRef = collection(employeeRef, "loginHistory");

  // Optional: Add filtering by date if needed
  // const todayDateString = format(new Date(), 'yyyy-MM-dd');
  // const q = query(loginHistoryRef, where('date', '==', todayDateString));

  const querySnapshot = await getDocs(loginHistoryRef);

  const loginData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return loginData;
}

function isEmployeePresentToday(employeeId, employeeList) {
  const employeeLogins = employeeList.find((login) => login[employeeId]);
  if (!employeeLogins) {
    return false;
  }
  const todayDateString = format(new Date(), "yyyy-MM-dd");
  return employeeLogins[employeeId].some(
    (data) => data.date === todayDateString
  );
}

export const dayAttendence = (totalDayShift, dayShift) => {
  const updatedDayAttendanceData = totalDayShift.map((employee) => {
    return {
      ...employee,
      attendance: isEmployeePresentToday(employee.id, dayShift),
    };
  });
  return updatedDayAttendanceData;
};

export const nightAttendence = (totalNightShift, nightShift) => {
  const updatedAttendanceData = totalNightShift.map((employee) => ({
    ...employee,
    attendance: isEmployeePresentToday(employee.id, nightShift),
  }));

  return updatedAttendanceData;
};

export const unsubscribe = (callback) => {
  const unsubscribeSnapshot = onSnapshot(
    collection(getFirestore(), "employees"),
    (employeeSnapshot) => {
      const updatedLogins = {};

      // Iterate through employees
      employeeSnapshot.forEach((employeeDoc) => {
        const employeeId = employeeDoc.id;
        const loginHistoryRef = collection(employeeDoc.ref, "loginHistory");

        // Optional filter for today:
        const todayDateString = format(new Date(), "yyyy-MM-dd");
        const q = query(loginHistoryRef);

        // Listener for each employee's loginHistory
        onSnapshot(q, (loginHistorySnapshot) => {
          updatedLogins[employeeId] = loginHistorySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // console.log("Updated logins: ", updatedLogins);
          if (callback) {
            callback(updatedLogins); // Trigger the callback with updated logins
          }
        });
      });
    }
  );

  return unsubscribeSnapshot; // Return the unsubscribe function
};

export function getFileType(fileURL) {
  const url = new URL(fileURL); // Create a URL object
  const filename = decodeURIComponent(url.pathname.split("/").pop()); // Decode filename
  const extension = filename.split(".").pop().toLowerCase();
  switch (extension) {
    case "pdf":
      return "pdf";
    case "jpg":
    case "jpeg":
    case "png":
      return "image";
    case "xlsx":
      return "excel";
    case "docx":
      return "word";
    default:
      return "unknown";
  }
}
