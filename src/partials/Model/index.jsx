import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export default function EditModal({
  open,
  handleClose,
  handleSubmit,
  children,
  width = `500px`,
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#dab600",
            width: `${width}`,
            p: 4,
          }}
        >
          <form onSubmit={handleSubmit} className="px-5 py-5 ">
            {children}

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
