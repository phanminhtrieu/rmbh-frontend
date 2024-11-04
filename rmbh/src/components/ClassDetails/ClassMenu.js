import React from "react";
import { Menu } from "antd";

const ClassMenu = ({ selectedMenu, setSelectedMenu }) => {
  // Nhận selectedMenu và setSelectedMenu từ props
  const handleMenuClick = (e) => {
    setSelectedMenu(e.key); // Gọi hàm cập nhật selectedMenu
  };

  return (
    <div className="border-t">
      <Menu
        mode="horizontal"
        selectedKeys={[selectedMenu]}
        onClick={handleMenuClick}
        className="flex justify-between bg-[]"
      >
        <Menu.Item
          key="About"
          className={`text-center w-[30%] ${
            selectedMenu === "About"
              ? "font-bold text-blue-600"
              : "text-gray-500"
          }`}
        >
          About
        </Menu.Item>
        <Menu.Item
          key="Deck"
          className={`text-center w-[30%] ${
            selectedMenu === "Deck"
              ? "font-bold text-blue-600"
              : "text-gray-500"
          }`}
        >
          Deck (1/n selected)
        </Menu.Item>
        <Menu.Item
          key="Learners"
          className={`text-center w-[30%] ${
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
