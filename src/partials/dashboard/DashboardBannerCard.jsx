import React from "react";

const DashboardBannerCard = ({ title, totalCount, icon, bgColor }) => {
  return (
    <div
      className={`w-full ${bgColor} cursor-pointer rounded-md h-[260px] p-5 text-white`}
    >
      <div className="flex justify-center flex-col items-center h-4/5">
        <div className="w-1/2 ">
          <img src={icon} alt={title} className="w-full h-full text-center " />
        </div>
        <h3 className="text-xl font-semibold capitalize ">{title}</h3>
      </div>
      <div className="h-1/5 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] flex items-center justify-center font-semibold">
        {totalCount}
      </div>
    </div>
  );
};

export default DashboardBannerCard;
