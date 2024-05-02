import React from "react";
import TopHeader from "../partials/TopHeader";
import AdminLayout from "../UI/Layout/AdminLayout";

const CreatePageStructure = ({ icon, title, formTitle, children }) => {
  return (
    <AdminLayout>
      <div className="relative w-full px-10 pt-5">
        <TopHeader icon={icon} title={title} />
        <div className="border mt-6  bg-white rounded-md">
          <div className="py-2 border-b px-5 text-black font-semibold bg-black/10">
            <p>{formTitle}</p>
          </div>
          {children}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreatePageStructure;
