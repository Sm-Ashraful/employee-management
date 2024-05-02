// UserContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { AllEmployeeList } from "../utils/Healper";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase.config";

const EmployeeContext = createContext({
  employee: null,
  setEmployee: () => {},
});

export const EmployeeProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const collectionRef = collection(db, "employees");

    // Real-time listener
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const updatedEmployee = [];
      querySnapshot.forEach((doc) => {
        updatedEmployee.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      const filterEmployee = updatedEmployee.filter(
        (employee) => employee.id !== "MIL"
      );
      setEmployee(filterEmployee);
    });
    return () => unsubscribe();
  }, []);

  return (
    <EmployeeContext.Provider
      value={{ employee, setEmployee, isLoading, error }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  return useContext(EmployeeContext);
};
