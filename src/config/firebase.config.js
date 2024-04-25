// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3QQQuY7m7eJ_A3qiLtP-zcD0UNKyATGg",
  authDomain: "employee-management-3ce88.firebaseapp.com",
  projectId: "employee-management-3ce88",
  storageBucket: "employee-management-3ce88.appspot.com",
  messagingSenderId: "926167319715",
  appId: "1:926167319715:web:6f128c2a41c9cb69976b16",
  measurementId: "G-5JFLDHCZG7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const db = getFirestore(app);
