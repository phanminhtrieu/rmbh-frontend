import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import StudyButton from "../StudyButton";

const ClassInfo = ({ selectedClass }) => {
  const defaultLogo =
    "https://unsplash.com/photos/a-table-with-a-lamp-and-books-on-it-Vjc2-7JhFbg"; // URL ảnh logo mặc định
  const logoUrl = selectedClass.logo || defaultLogo; // Sử dụng logo của lớp hoặc ảnh mặc định nếu không có

  return (
    <div className="flex space-x-10">
      <Avatar
        size={64}
        icon={<UserOutlined />}
        src={logoUrl}
        className="cursor-pointer"
      />
      <div className="flex flex-col w-[500px]">
        <div className="text-2xl font-bold mt-2">{selectedClass.title}</div>
        <div className="text-lg mb-6">
          <span>By: </span>
          <span className="font-bold">
            {selectedClass ? selectedClass.owner : "N/A"}
          </span>
        </div>
        <StudyButton selectedClass={selectedClass} />
      </div>
    </div>
  );
};

export default ClassInfo;
