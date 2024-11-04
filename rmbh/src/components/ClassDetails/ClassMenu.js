import React from "react";
import { Menu } from "antd";

const ClassMenu = ({ selectedMenu, setSelectedMenu }) => {
  // Nhận selectedMenu và setSelectedMenu từ props
  const handleMenuClick = (e) => {
    setSelectedMenu(e.key); // Gọi hàm cập nhật selectedMenu
  };

  // Định nghĩa các mục menu
  const items = [
    {
      label: (
        <span
          className={`text-center w-[30%] ${
            selectedMenu === "About"
              ? "font-bold text-blue-600"
              : "text-gray-500"
          }`}
        >
          About
        </span>
      ),
      key: "About",
    },
    {
      label: (
        <span
          className={`text-center w-[30%] ${
            selectedMenu === "Deck"
              ? "font-bold text-blue-600"
              : "text-gray-500"
          }`}
        >
          Deck (1/n selected)
        </span>
      ),
      key: "Deck",
    },
    {
      label: (
        <span
          className={`text-center w-[30%] ${
            selectedMenu === "Learners"
              ? "font-bold text-blue-600"
              : "text-gray-500"
          }`}
        >
          Learners
        </span>
      ),
      key: "Learners",
    },
  ];

  return (
    <div className="border-t">
      <Menu
        mode="horizontal"
        selectedKeys={[selectedMenu]}
        onClick={handleMenuClick}
        items={items} // Sử dụng items thay vì Menu.Item
        className="flex justify-between bg-[]"
      />
    </div>
  );
};

export default ClassMenu;
