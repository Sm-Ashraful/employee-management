import React from "react";

import Image01 from "../../images/user-36-05.jpg";
import Image02 from "../../images/user-36-06.jpg";
import Image03 from "../../images/user-36-07.jpg";
import Image04 from "../../images/user-36-08.jpg";
import Image05 from "../../images/user-36-09.jpg";

const customers = [
  {
    id: "0",
    image: Image01,
    name: "Alex Shatov",
    status: "Employee",
    shift: "Day Shift",
    entry: "5min ago",
    email: "alexshatov@gmail.com",
    location: "🇺🇸",
    spent: "$2,890.66",
  },
  {
    id: "1",
    image: Image02,
    name: "Philip Harbach",
    email: "philip.h@gmail.com",
    status: "Employee",
    shift: "Day Shift",
    entry: "6min ago",
    location: "🇩🇪",
    spent: "$2,767.04",
  },
  {
    id: "2",
    image: Image03,
    name: "Mirko Fisuk",
    email: "mirkofisuk@gmail.com",
    status: "Employee",
    shift: "Night Shift",
    entry: "7min ago",
    location: "🇫🇷",
    spent: "$2,996.00",
  },
  {
    id: "3",
    image: Image04,
    name: "Olga Semklo",
    email: "olga.s@cool.design",
    status: "Supervisor",
    shift: "Day Shift",
    entry: "10min ago",
    location: "🇮🇹",
    spent: "$1,220.66",
  },
  {
    id: "4",
    image: Image05,
    name: "Burak Long",
    email: "longburak@gmail.com",
    status: "Supervisor",
    shift: "Day Shift",
    entry: "15min ago",
    location: "🇬🇧",
    spent: "$1,890.66",
  },
];

function DashboardCard12() {
  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Recent Attendance
        </h2>
      </header>
      <div className="p-3">
        {/* Card content */}
        {/* "Today" group */}
        <div>
          <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
            Today
          </header>
          <ul className="my-1">
            {/* Item */}
            {customers.map((customer, idx) => {
              return (
                <li className="flex px-2">
                  <div className="grow flex items-center border-b border-slate-100 dark:border-slate-700 text-sm py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                        <img
                          className="rounded-full"
                          src={customer.image}
                          width="40"
                          height="40"
                          alt={customer.name}
                        />
                      </div>
                      <div>
                        <div className="font-medium text-slate-800 dark:text-slate-100">
                          {customer.name}
                        </div>
                        <div className="font-medium text-[13px] text-slate-400 dark:text-slate-600">
                          {customer.status}
                        </div>
                        <div className=" text-red-400 dark:text-red-200">
                          {customer.entry}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard12;
