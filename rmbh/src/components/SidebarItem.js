import React from "react";
import { Menu, Avatar } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const SidebarItem = ({
  classes,
  selectedClass,
  handleClassSelect,
  onAddClass,
}) => (
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
            onClick={onAddClass}
            className="bg-blue-500 cursor-pointer"
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
);

export default SidebarItem;
