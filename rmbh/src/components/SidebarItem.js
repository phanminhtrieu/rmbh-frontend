import React, { useEffect, useState } from "react";
import { Menu, Avatar } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const SidebarItem = ({ userId, handleClassSelect, onAddClass }) => {
  const [classes, setClasses] = useState([]); // State để lưu danh sách lớp
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading

  // Hàm gọi API để lấy danh sách lớp
  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7109/api/frontend/Classes/user/${userId}`
      );
      setClasses(response.data); // Lưu danh sách lớp vào state
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoading(false); // Đặt loading thành false sau khi gọi API
    }
  };

  // Sử dụng useEffect để gọi fetchClasses khi component mount
  useEffect(() => {
    fetchClasses();
  }, [userId]); // Chỉ gọi lại khi userId thay đổi

  // Định nghĩa các mục menu
  const items = [
    {
      key: "myClassesGroup",
      label: (
        <div className="flex justify-around items-center mb-2">
          <span className="text-white mr-14">My classes</span>
          <Avatar
            icon={<PlusOutlined />}
            size={24}
            onClick={onAddClass}
            className="bg-blue-500 cursor-pointer"
          />
        </div>
      ),
    },
    ...(loading
      ? [{ key: "loading", label: "Loading..." }]
      : classes.map((cls) => ({
          key: cls.id.toString(), // Khóa từ ID của lớp
          label: (
            <div onClick={() => handleClassSelect(cls)}>
              {cls.title} {/* Sử dụng title từ ClassDto */}
            </div>
          ),
        }))),
  ];

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={classes.length > 0 ? [classes[0].id.toString()] : []}
      items={items}
    />
  );
};

export default SidebarItem;
