import React, { useEffect, useState } from "react";
import { Menu, Avatar } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const SidebarItem = ({ userId, handleClassSelect, onAddClass }) => {
  const [classes, setClasses] = useState([]); // State để lưu danh sách lớp
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading
  const [selectedKey, setSelectedKey] = useState(null); // State để lưu key của lớp được chọn

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

  // Tự động chọn lớp đầu tiên khi danh sách lớp được tải thành công
  useEffect(() => {
    if (!loading && classes.length > 0) {
      const firstClass = classes[0];
      setSelectedKey(firstClass.id.toString()); // Đặt lớp đầu tiên làm selectedKey
      handleClassSelect(firstClass); // Gọi handleClassSelect với lớp đầu tiên
    }
  }, [loading, classes]);

  // Xử lý khi người dùng chọn một lớp
  const handleSelect = (cls) => {
    console.log(cls, "selected sidebar item");
    setSelectedKey(cls.id.toString()); // Cập nhật selectedKey khi người dùng chọn
    handleClassSelect(cls); // Gọi handleClassSelect với lớp được chọn
  };

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
            <div
              onClick={() => handleSelect(cls)} // Gọi hàm khi nhấn vào lớp
            >
              {cls.title} {/* Sử dụng title từ ClassDto */}
            </div>
          ),
        }))),
  ];

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[selectedKey]} // Dùng selectedKey từ state
      items={items}
    />
  );
};

export default SidebarItem;
