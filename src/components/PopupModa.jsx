import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { calculateWorkingDays } from "../utils/Healper";
import { useEffect, useState } from "react";
import TaskInputField from "./TaskInputField";
import { getFileType } from "../utils/Healper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,

  p: 4,
};

export default function PopupModal({ open, handleClose, data }) {
  const [workingTask, setWorkingTask] = useState(null);
  const startDate = new Date("2024-04-01");
  const endDate = new Date("2024-04-30");
  const customHolidays = ["2024-04-10", "2024-04-25"];
  const totalWorkingDays = calculateWorkingDays(
    startDate,
    endDate,
    customHolidays
  );

  const monthYearString = startDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  if (!data) return null;
  async function fetchTask() {
    const tasks = await fetchAllTask(data.id);
    setWorkingTask(tasks);
  }
  // console.log("Data from modal: ", data.loginHistory.length);

  const employeeWorkingDaysCount = data.loginHistory.length;
  const employeeAbsentCount = totalWorkingDays - employeeWorkingDaysCount;

  const calculateTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 12 instead of 0

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    return formattedTime;
  };
  const currentMonthHistory = data.loginHistory.filter((login) => {
    const loginDate = new Date(login.date);
    return (
      loginDate.getMonth() === startDate.getMonth() &&
      loginDate.getFullYear() === startDate.getFullYear()
    );
  });
  const sortedLoginHistory = [...currentMonthHistory].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  const perDaySalary = data.salary / totalWorkingDays;

  console.log("Task: ", data);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="overflow-hidden"
      >
        <Box
          sx={style}
          className="overflow-y-auto max-h-full bg-[#FFEEB2] text-black outline-none focus:outline-none"
        >
          <Typography
            textAlign={"center"}
            id="modal-modal-title"
            variant="h4"
            component="h2"
          >
            Employee Information
          </Typography>
          <Box className="flex justify-between">
            <Typography id="modal-modal-title" variant="p" component="h5">
              Employer Name: {data.f_name + " " + data.l_name}
            </Typography>
            <Typography id="modal-modal-title" variant="p" component="h5">
              Employer Id: {data.id}
            </Typography>
          </Box>
          <div className="my-5 ">
            <h3 className="text-xl font-bold ">Attendance Calculation</h3>
            <div className="mt-3 flex justify-between">
              <p>Total Working Days: {totalWorkingDays}</p>
              <p>Employee Working Days: {employeeWorkingDaysCount}</p>
              <p>Absent: {employeeAbsentCount}</p>
            </div>
            <div className="my-5">
              <p className="text-sm font-semibold">
                Attendance Report of : {monthYearString}
              </p>
              <div className="flex gap-3 text-sm">
                {sortedLoginHistory?.map((login) => {
                  return (
                    <div className="p-3 border bg-green-500 text-white">
                      <p>{login.date}</p>
                      <p>{calculateTime(login.timestamp)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mb-5">
            <h3 className="text-xl font-bold ">Salary Calculation</h3>
            <div className="mt-3 flex justify-between items-center text-black">
              <div className="font-semibold flex flex-col items-center justify-center">
                <p className="flex items-center justify-center text-center border rounded-full bg-gradient-to-r from-[#FFE200]  to-[#33FB09]  w-[8rem] h-[8rem]">
                  {data.salary}&#2547; <br />
                  BDT
                </p>
                <p>Total Salary</p>
              </div>
              <div className="font-semibold flex flex-col items-center justify-center">
                <p className="flex items-center justify-center text-center border rounded-full bg-gradient-to-r from-[#FFE200]  to-[#33FB09]  w-[8rem] h-[8rem]">
                  {perDaySalary}&#2547; <br />
                  BDT
                </p>
                <p>
                  Per day salary for{" "}
                  {startDate.toLocaleDateString("default", {
                    month: "long",
                  })}
                </p>
              </div>
              <div className="font-semibold flex flex-col items-center justify-center">
                <p className="flex items-center justify-center text-center border rounded-full bg-gradient-to-r from-[#FFE200]  to-[#33FB09]  w-[8rem] h-[8rem]">
                  {perDaySalary * employeeWorkingDaysCount}&#2547; <br />
                  BDT
                </p>
                <p>
                  Payable Salary for{" "}
                  {startDate.toLocaleDateString("default", {
                    month: "long",
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h3 className="text-xl font-bold ">Employee Working Task</h3>
            <TaskInputField employeeId={data.id} handleClose={handleClose} />
          </div>
          <div className="mt-10">
            <h3 className="text-xl font-bold ">All Task</h3>
            <div>
              {data?.tasks ? (
                data.tasks.map((task) => {
                  const fileType = getFileType(task.fileURL);
                  console.log("Taks url: ", fileType);
                  return (
                    <div>
                      <p>{task.date}</p>
                      <p>{task.title}</p>
                      <p>{task.note}</p>
                      {fileType === "pdf" && (
                        <iframe
                          src={task.fileURL}
                          width="600"
                          height="400"
                          title="PDF viewer"
                        ></iframe>
                      )}
                      {fileType === "image" && (
                        <img
                          src={task.fileURL}
                          alt="Uploaded file"
                          width="400"
                        />
                      )}
                    </div>
                  );
                })
              ) : (
                <span>No task yet...</span>
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
