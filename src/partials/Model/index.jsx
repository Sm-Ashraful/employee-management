import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase.config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#dab600",
  width: 500,
  p: 4,
};

export default function EditModal({ open, setOpen, data }) {
  const [name, setName] = React.useState(data?.name || "");
  const [description, setDescription] = React.useState(data?.description || "");

  const handleClose = () => {
    setOpen(false);
    setName(""); // Reset name
    setDescription("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const departmentRef = doc(db, "departments", data.id);
    try {
      await updateDoc(departmentRef, { name, description });
      console.log("Department updated successfully");
      handleClose();
      // setIsEditing(false); // Close modal or similar
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit} className="px-5 py-5 ">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Department Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="department"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Description
              </label>
              <textarea
                row={6}
                type="text"
                id="department"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
