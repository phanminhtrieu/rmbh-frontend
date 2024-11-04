// SidebarItem.jsx
import React, { useState } from "react";
import { Menu, Avatar } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddClassModal from "./ClassDetails/AddClassModal";

const SidebarItem = ({
  classes,
  selectedClass,
  handleClassSelect,
  onAddClass,
}) => {
  // Add state for modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle modal success
  const handleModalSuccess = () => {
    onAddClass(); // Refresh the classes list
    setIsModalVisible(false);
  };

  // Handle avatar click
  const handleAvatarClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsModalVisible(true);
  };

  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedClass ? [selectedClass.id.toString()] : []}
      >
        <Menu.ItemGroup
          title={
            <div className="flex justify-between items-center">
              <span className="text-white">My classes</span>
              <Avatar
                icon={<PlusOutlined />}
                size={24}
                onClick={handleAvatarClick}
                className="bg-blue-500 cursor-pointer hover:bg-blue-600 transition-colors"
              />
            </div>
          }
        >
          {classes.map((cls) => (
            <Menu.Item key={cls.id} onClick={() => handleClassSelect(cls)}>
              {cls.name}
            </Menu.Item>
          ))}
        </Menu.ItemGroup>
      </Menu>

      {/* Add Class Modal */}
      <AddClassModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSuccess={handleModalSuccess}
      />
    </>
  );
};

export default SidebarItem;