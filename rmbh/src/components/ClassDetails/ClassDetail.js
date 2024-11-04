import React from "react";
import ClassInfo from "./ClassInfor"; // Nhớ sửa tên file nếu cần
import ClassMenu from "./ClassMenu";
import MasteryScore from "../MasteryScore";

const ClassDetails = ({
  selectedClass, // Nhận thông tin lớp học được chọn
  handleEllipsisClick, // Hàm để xử lý click
  selectedMenu, // Trạng thái menu được chọn
  setSelectedMenu, // Hàm để cập nhật menu
}) => (
  <div className="w-full h-full flex flex-col">
    <div className="first-row flex p-5 justify-between">
      <ClassInfo
        selectedClass={selectedClass} // Truyền thông tin lớp học vào ClassInfo
        handleEllipsisClick={handleEllipsisClick} // Truyền hàm xử lý click
      />
      <MasteryScore />
    </div>
    <ClassMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
  </div>
);

export default ClassDetails;
