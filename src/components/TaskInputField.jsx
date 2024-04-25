import {
  FieldValue,
  addDoc,
  arrayUnion,
  collection,
  doc,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { app, db } from "../config/firebase.config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function TaskInputField({ employeeId, handleClose }) {
  const [noteText, setNoteText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDate, setSelectedDate] = useState(""); // Change to empty string
  const [title, setTitle] = useState("");
  const [isDataSave, setIsDataSave] = useState(false);
  const storage = getStorage(app);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
    setSelectedDate(today);
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNoteText(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const taskCollectionRef = collection(db, "tasks");
    const employeeDocRef = doc(db, "employees", employeeId);
    // Assuming 'db' is your Firestore database instance
    const storageRef = ref(storage, `files/${selectedFile.name}`);
    try {
      await uploadBytes(storageRef, selectedFile);
      console.log("File uploaded successfully!");
      setNoteText("");
      setTitle("");
      setSelectedDate("");
      setSelectedFile(null);
      setIsDataSave(true);
    } catch (error) {
      console.error("Error uploading file: ", error);
      return; // Return early if file upload fails
    }

    // Get the download URL of the uploaded file
    const fileURL = await getDownloadURL(storageRef);

    // Prepare task data with file URL
    const taskData = {
      title: title,
      date: selectedDate,
      note: noteText,
      fileURL: fileURL, // Assuming 'fileURL' is the key where you store the URL
    };

    try {
      // Add a new document with a generated ID to the 'tasks' collection
      // Update the 'tasks' array within the employee's document
      await updateDoc(employeeDocRef, {
        tasks: arrayUnion(taskData),
      });
      console.log("Data submitted successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pt-2">
      <div className="py-2">
        <label htmlFor="date-input">Date For Task: </label>
        <input
          type="date"
          id="date-input"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <div className="py-2">
        <label htmlFor="title">Task Title:</label>
        <input
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="w-full"
        />
      </div>
      <div className="py-2">
        <label htmlFor="note-input">Task Note/Script:</label>
        <textarea
          id="note-input"
          value={noteText}
          onChange={handleNoteChange}
          className="w-full"
          rows={5}
        />
      </div>

      <div className="py-2">
        <label htmlFor="file-input">
          Data/Script/File(Image, PDF,xlx or Docs):{" "}
        </label>
        <input type="file" id="file-input" onChange={handleFileChange} />
      </div>
      <button
        type="submit"
        className="bg-blue-400 font-semibold text-black px-5 py-2"
      >
        Submit Task
      </button>
      <p className="text-center text-green-600">
        {isDataSave ? <span>Data Added Successfully</span> : null}
      </p>
    </form>
  );
}

export default TaskInputField;
