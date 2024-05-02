import React from "react";
import AdminLayout from "../UI/Layout/AdminLayout";
import TopHeader from "../partials/TopHeader";
import SearchField from "../partials/SearchField";

const PageStructure = ({ title, icon, children }) => {
  return (
    <AdminLayout>
      <div className="relative w-full px-10 pt-5">
        <TopHeader icon={icon} title={title} />
        <SearchField />
        <div className="mt-5">{children}</div>
      </div>
    </AdminLayout>
  );
};

export default PageStructure;
