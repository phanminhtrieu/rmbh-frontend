import React, { useEffect, useState } from "react";
import { Layout, Typography, theme } from "antd";
import ClassDetail from "../components/ClassDetails/ClassDetail";

const { Title } = Typography;

const HeaderContent = ({
  selectedClass,
  user,
  handleEllipsisClick,
  selectedMenu,
  setSelectedMenu,
}) => {
  const [classData, setClassData] = useState(null); // Trạng thái lưu dữ liệu lớp

  useEffect(() => {
    if (selectedClass) {
      const fetchClassData = async () => {
        try {
          // Giả lập dữ liệu lớp với logo mặc định nếu không có
          const classDetails = {
            ...selectedClass,
            logo: selectedClass.logo,
            description: "Class description here", // Giả lập mô tả lớp
          };
          setClassData(classDetails);
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu lớp:", error);
          setClassData({ ...selectedClass });
        }
      };
      fetchClassData();
    }
  }, [selectedClass]);

  return (
    <Layout.Header
      className="h-[255px] p-0 flex items-center justify-between overflow-hidden"
      style={{
        background: theme.useToken().token.colorBgContainer,
      }}
    >
      {classData ? (
        <ClassDetail
          selectedClass={classData}
          user={user}
          handleEllipsisClick={handleEllipsisClick}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          logo={classData.logo} // Truyền logo vào ClassDetail
        />
      ) : (
        <Title level={4}>Select a class</Title>
      )}
    </Layout.Header>
  );
};

export default HeaderContent;
