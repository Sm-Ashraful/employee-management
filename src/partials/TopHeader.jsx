import React from "react";

const TopHeader = ({ icon, title }) => {
  return (
    <div className="w-full bg-blue-100">
      <p className="py-2 flex items-center gap-1 pl-5 text-black font-semibold">
        {icon}
        <span>{title}</span>
      </p>
    </div>
  );
};

export default TopHeader;
