import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase.config";
// Assuming you have imported your Firebase configuration

export function useCollectionListener(collectionName) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, collectionName);

    // Real-time listener
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const updatedData = [];
      querySnapshot.forEach((doc) => {
        updatedData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setData(updatedData);
    });

    // Cleanup function for the listener
    return () => unsubscribe();
  }, [collectionName]); // Make sure to include collectionName in the dependencies array

  return data;
}

// Usage:
