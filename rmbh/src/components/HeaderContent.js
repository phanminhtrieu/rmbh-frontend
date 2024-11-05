import React, { useState } from "react";
import { Layout, Typography, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons"; // Importing MoreOutlined for ellipsis icon
import ClassDetail from "../components/ClassDetails/ClassDetail";

const { Title } = Typography;

const HeaderContent = ({
  selectedClass,
  user,
  selectedMenu,
  setSelectedMenu,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to manage dropdown visibility

  // Menu items based on user role
  const menuItems = [
    user?.role === "Owner" && {
      key: "edit",
      label: "Edit class",
      onClick: () => handleEllipsisClick("edit"),
    },
    user?.role === "Owner" && {
      key: "delete",
      label: "Delete class",
      onClick: () => handleEllipsisClick("delete"),
    },
    user?.role === "Member" && {
      key: "quit",
      label: "Quit class",
      onClick: () => handleEllipsisClick("quit"),
    },
  ].filter(Boolean); // Remove any undefined items

  const menu = <Menu items={menuItems} />;

  const handleEllipsisClick = (option) => {
    setDropdownVisible(false); // Close the dropdown when an option is clicked
    console.log(`${option} clicked`); // Replace with actual logic for handling actions
  };

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
          <Dropdown
            menu={menu}
            open={dropdownVisible} // Control visibility of the dropdown
            onOpenChange={setDropdownVisible} // Update visibility state
            trigger={["click"]}
          >
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
