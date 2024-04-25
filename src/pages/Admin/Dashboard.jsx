import React, { useState } from "react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import DashboardAvatars from "../../partials/dashboard/DashboardAvatars";
import FilterButton from "../../components/DropdownFilter";
import Datepicker from "../../components/Datepicker";
import DashboardCard01 from "../../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../../partials/dashboard/DashboardCard03";
import DashboardCard04 from "../../partials/dashboard/DashboardCard04";
import DashboardCard05 from "../../partials/dashboard/DashboardCard05";
import DashboardCard06 from "../../partials/dashboard/DashboardCard06";
import DashboardCard07 from "../../partials/dashboard/DashboardCard07";
import DashboardCard08 from "../../partials/dashboard/DashboardCard08";
import DashboardCard09 from "../../partials/dashboard/DashboardCard09";
import DashboardCard10 from "../../partials/dashboard/DashboardCard10";
import DashboardCard11 from "../../partials/dashboard/DashboardCard11";
import DashboardCard12 from "../../partials/dashboard/DashboardCard12";
import DashboardCard13 from "../../partials/dashboard/DashboardCard13";
import Banner from "../../partials/Banner";
import AdminLayout from "../../UI/Layout/AdminLayout";
import { useUserContext } from "../../context/UserContext";
import DashboardBannerCard from "../../partials/dashboard/DashboardBannerCard";

//svg icon
import userIcon from "../../images/user-svg-icon.svg";
import departmentIcon from "../../images/department-icon.svg";
import noticeIcon from "../../images/notice-icon.svg";
import leaveIcon from "../../images/leave-icon.svg";

function Dashboard() {
  return (
    <AdminLayout>
      {/* Sidebar */}

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              {/* Left: Avatars */}
              <DashboardBannerCard
                title={"user/staff"}
                bgColor={"bg-blue-500"}
                icon={userIcon}
                totalCount={50}
              />
              <DashboardBannerCard
                title={"Department"}
                icon={departmentIcon}
                bgColor={"bg-green-500"}
                totalCount={2}
              />
              <DashboardBannerCard
                title={"Notice"}
                bgColor={"bg-yellow-500"}
                icon={noticeIcon}
                totalCount={5}
              />
              <DashboardBannerCard
                title={"Leave"}
                bgColor={"bg-red-500"}
                icon={leaveIcon}
                totalCount={6}
              />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-8">
                {/* Bar chart (Direct vs Indirect) */}
                <DashboardCard04 />
                {/* Doughnut chart (Top Countries) */}
                <DashboardCard06 />

                {/* Line chart (Real Time Value) */}
                <DashboardCard05 />

                {/* Table (Top Channels) */}
                <DashboardCard07 />
                {/* Line chart (Sales Over Time) */}
                <DashboardCard08 />
                {/* Stacked bar chart (Sales VS Refunds) */}
                <DashboardCard09 />

                {/* Card (Reasons for Refunds) */}
                <DashboardCard11 />

                {/* Card (Income/Expenses) */}
                <DashboardCard13 />
              </div>
              <div className="col-span-4">
                {/* Card (Customers) */}
                <DashboardCard10 />
                {/* Card (Recent Activity) */}
                <DashboardCard12 />
              </div>

              {/* Line chart (Acme Plus) */}
            </div>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
