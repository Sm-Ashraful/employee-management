import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PopupModal from "./PopupModa";
import { calculateWorkingDays } from "../utils/Healper";

export default function EmployeeTable({
  employeeList,
  setModalData,
  handleOpen,
}) {
  const popupModalHandler = (data) => {
    setModalData(data);
    handleOpen();
  };

  return (
    <div className="relative w-full h-full">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="!font-semibold">Employee Name</TableCell>
              <TableCell className="!font-semibold" align="right">
                Employee ID
              </TableCell>
              <TableCell className="!font-semibold" align="right">
                Email
              </TableCell>
              <TableCell className="!font-semibold" align="right">
                Phone
              </TableCell>
              <TableCell className="!font-semibold" align="right">
                Payable Salary
              </TableCell>
              <TableCell className="!font-semibold" align="right">
                Shift
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeList.map((doc, idx) => {
              const active = doc.loginHistory.some(
                (history) => history.isToday
              );

              return (
                <>
                  <TableRow
                    key={doc.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className={`${
                        active ? "!text-blue-500" : "!text-red-500"
                      } relative underline cursor-pointer`}
                      onClick={() => popupModalHandler(doc)}
                    >
                      {active && (
                        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2.5 h-2.5 bg-green-500  border-2 border-white dark:border-[#182235] rounded-full"></div>
                      )}
                      {doc.f_name + " " + doc.l_name}{" "}
                      {/* Access data properly */}
                    </TableCell>
                    <TableCell align="right">{doc.id}</TableCell>
                    <TableCell align="right">{doc.email}</TableCell>
                    <TableCell align="right">{doc.phone}</TableCell>
                    <TableCell align="right">{doc.salary}</TableCell>
                    <TableCell align="right">{doc.shift}</TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
