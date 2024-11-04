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
  return (
    <Layout.Header
      className="h-[255px] p-0 flex items-center justify-between overflow-hidden"
      style={{
        background: theme.useToken().token.colorBgContainer,
      }}
    >
      {selectedClass ? (
        <ClassDetail
          selectedClass={selectedClass}
          handleEllipsisClick={handleEllipsisClick}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          logo={selectedClass.logo} // Truyền logo vào ClassDetail
        />
      ) : (
        <Title level={4}>Select a class</Title>
      )}
    </Layout.Header>
  );
};

export default HeaderContent;
