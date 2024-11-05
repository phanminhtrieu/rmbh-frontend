import React, { useState } from "react";
import { Button, Dropdown, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import EditClassModal from "./EditClassModal";
import DeleteClassPopup from "./DeleteClassPopup";

const StudyButton = ({ selectedClass }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to manage dropdown visibility
  const [isEditClassModalVisible, setIsEditClassModalVisible] = useState(false);
  const [isDeleteClassPopupVisible, setIisDeleteClassPopupVisible] =
    useState(false);

  // Menu items for dropdown
  const menuItems =
    selectedClass.role === 1
      ? [
          {
            key: "edit",
            label: "Edit Class",
            onClick: () => handleMenuClick("edit"),
          },
          {
            key: "delete",
            label: "Delete Class",
            onClick: () => handleMenuClick("delete"),
          },
        ]
      : selectedClass.role === 2
      ? [
          {
            key: "quit",
            label: "Quit Class",
            onClick: () => handleMenuClick("quit"),
          },
        ]
      : []; // Không có tùy chọn cho vai trò khác

  const menu = <Menu items={menuItems} />;

  const handleMenuClick = (option) => {
    setDropdownVisible(false); // Đóng dropdown sau khi chọn

    switch (option) {
      case "edit":
        setIsEditClassModalVisible(true); // Mở modal chỉnh sửa
        break;
      case "delete":
        setIisDeleteClassPopupVisible(true);
        break;
      case "quit":
        // Logic cho quit class
        break;
      default:
        break;
    }
  };

  const handleEditClassModalCancel = () => {
    setIsEditClassModalVisible(false); // Đóng modal
  };

  const handleDeleteClassPopupCancel = () => {
    setIisDeleteClassPopupVisible(false); // Đóng modal
  };

  return (
    <div className="flex items-center space-x-2">
      <Button className="w-1/2" type="primary" shape="round" size="large">
        Study
      </Button>
      <Dropdown
        overlay={menu}
        open={dropdownVisible}
        onOpenChange={(visible) => setDropdownVisible(visible)} // Update visibility state
        trigger={["click"]}
      >
        <Button className="flex items-center justify-center text-4xl p-2 border-0">
          <EllipsisOutlined />
        </Button>
      </Dropdown>

      <EditClassModal
        open={isEditClassModalVisible}
        onCancel={handleEditClassModalCancel}
        selectedClass={selectedClass} // Truyền selectedClass cho modal
      />

      <DeleteClassPopup
        open={isDeleteClassPopupVisible}
        onCancel={handleDeleteClassPopupCancel}
        // onConfirm={}
      />
    </div>
  );
};

export default StudyButton;
