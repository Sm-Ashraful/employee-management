import React, { useState, useEffect, useRef } from "react";
import moment from "moment";

function AttendanceSheet({ data }) {
  const [startDate, setStartDate] = useState(moment().startOf("month"));
  const [holidays, setHolidays] = useState([]);
  const tableRef = useRef(null);
  const today = moment().startOf("day");
  const monthEnd = moment(startDate).endOf("month");

  useEffect(() => {
    // Calculate holidays (assuming Fridays and Saturdays as holidays)
    const calculateHolidays = () => {
      const currentMonth = startDate.month();
      const holidaysArray = [];

      for (let i = 1; i <= startDate.daysInMonth(); i++) {
        const currentDate = moment(startDate).date(i);
        if (currentDate.day() === 5 || currentDate.day() === 6) {
          // Friday or Saturday
          holidaysArray.push(currentDate.format("YYYY-MM-DD"));
        }
      }
      setHolidays(holidaysArray);
    };

    calculateHolidays();
  }, [startDate]);

  const generateDateColumns = () => {
    const columns = [];
    let currentDate = startDate.clone();

    while (currentDate.isSameOrBefore(monthEnd, "day")) {
      const formattedDate = currentDate.format("YYYY-MM-DD");
      columns.push({
        date: currentDate.format("D"),
        day: currentDate.format("ddd"),
        fullDate: formattedDate,
        isHoliday: holidays.includes(formattedDate),
        isFuture: currentDate.isAfter(today, "day"),
      });
      currentDate.add(1, "days");
    }
    return columns;
  };

  useEffect(() => {
    // Focus on today's date when rendering
    if (tableRef.current) {
      const todayColumnIndex = generateDateColumns().findIndex(
        (column) => column.fullDate === today.format("YYYY-MM-DD")
      );
      if (todayColumnIndex !== -1) {
        const todayColumn =
          tableRef.current.children[0].children[todayColumnIndex + 2];
        if (todayColumn) {
          todayColumn.scrollIntoView({ block: "nearest" });
        }
      }
    }
  }, [today]);

  return (
    <div className="w-[100%] overflow-hidden">
      <h1 className="text-xl font-bold text-center">
        Attendance Sheet - {startDate.format("MMMM YYYY")}
      </h1>
      <div className="flex justify-between mb-2">
        <button
          onClick={() =>
            setStartDate((prevStartDate) =>
              prevStartDate.clone().subtract(1, "month")
            )
          }
          className="bg-red-500 text-white px-3 py-1 font-semibold"
        >
          Previous Month
        </button>
        <button
          onClick={() =>
            setStartDate((prevStartDate) =>
              prevStartDate.clone().add(1, "month")
            )
          }
          className="bg-green-500 text-white px-3 py-1 font-semibold"
        >
          Next Month
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-auto" ref={tableRef}>
          <thead>
            <tr>
              <th className="py-2 px-4 border sticky left-0 bg-white">ID</th>
              <th className="py-2 px-4 border sticky left-[5.5rem] bg-white">
                Name
              </th>
              {generateDateColumns().map((column) => (
                <th
                  key={column.fullDate}
                  className={`py-2 px-10 text-center border ${
                    column.isHoliday ? "bg-rose-500 text-black" : ""
                  }`}
                >
                  {column.day} <br />
                  {column.date}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((employee) => (
              <tr key={employee.id}>
                <td className="py-2 px-4 border sticky left-0 bg-white">
                  {employee.id}
                </td>
                <td className="py-2 px-4 border sticky left-[5.5rem] bg-white">
                  {employee.l_name}
                </td>
                {generateDateColumns().map((column) => {
                  const hasLoginForDate = employee.loginHistory?.some(
                    (history) => history.date === column.fullDate
                  ); // Removed the 'history.isToday' check

                  return (
                    <td
                      key={`${employee.id}-${column.fullDate}`}
                      className={`py-2 px-4 border text-center ${
                        column.isFuture ? "" : "bg-gray-100"
                      } ${column.isHoliday ? "bg-rose-500" : ""}`}
                    >
                      {column.isHoliday ? (
                        <span className="text-white font-bold">⊗</span>
                      ) : !column.isFuture ? (
                        hasLoginForDate ? (
                          "✔️"
                        ) : (
                          <span className="text-red-500">❌</span>
                        )
                      ) : (
                        ""
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceSheet;
