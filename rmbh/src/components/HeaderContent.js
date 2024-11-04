import React from "react";
import { Layout, Typography, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons"; // Importing MoreOutlined for ellipsis icon
import ClassDetail from "../components/ClassDetails/ClassDetail";

const { Title } = Typography;

const HeaderContent = ({
  selectedClass,
  user,
  handleEllipsisClick,
  selectedMenu,
  setSelectedMenu,
}) => {
  // Menu items based on user role
  const menu = (
    <Menu>
      {user?.role === "Owner" && (
        <>
          <Menu.Item key="edit" onClick={() => handleEllipsisClick('edit')}>
            Edit class
          </Menu.Item>
          <Menu.Item key="delete" onClick={() => handleEllipsisClick('delete')}>
            Delete class
          </Menu.Item>
        </>
      )}
      {user?.role === "Member" && (
        <Menu.Item key="quit" onClick={() => handleEllipsisClick('quit')}>
          Quit class
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <Layout.Header
      className="h-[255px] p-0 flex items-center justify-between overflow-hidden"
      style={{
        background: "#fff", // Adjust background color as needed
      }}
    >
      {selectedClass ? (
        <>
          <ClassDetail
            selectedClass={selectedClass}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            logo={selectedClass.logo}
          />
          {/* Ellipsis Dropdown for menu options */}
          <Dropdown overlay={menu} trigger={['click']}>
            <MoreOutlined className="cursor-pointer" />
          </Dropdown>
        </>
      ) : (
        <Title level={4}>Select a class</Title>
      )}
    </Layout.Header>
  );
};

export default HeaderContent;