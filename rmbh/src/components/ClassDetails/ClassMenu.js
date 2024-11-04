import React from "react";
import { Menu } from "antd";

const ClassMenu = ({ selectedMenu, setSelectedMenu }) => {
  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
  };

  return (
    <div className="border-t">
      <Menu
        mode="horizontal"
        selectedKeys={[selectedMenu]}
        onClick={handleMenuClick}
        className="flex justify-between"
      >
        <Menu.Item
          key="About"
          className={`w-[30%] text-center ${
            selectedMenu === "About"
              ? "font-bold text-blue-600"
              : "text-gray-500"
          }`}
        >
          About
        </Menu.Item>

        <Menu.Item
          key="Deck"
          className={`w-[30%] text-center ${
            selectedMenu === "Deck"
              ? "font-bold text-blue-600"
              : "text-gray-500"
          }`}
        >
          Deck (1/n selected)
        </Menu.Item>

        <Menu.Item
          key="Learners"
          className={`w-[30%] text-center ${
            selectedMenu === "Learners"
              ? "font-bold text-blue-600"
              : "text-gray-500"
          }`}
        >
          Learners
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default ClassMenu;
