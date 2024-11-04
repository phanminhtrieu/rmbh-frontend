import React, { useEffect, useState } from "react";
import { Menu, Avatar, Modal, Form, Input, Button, message } from "antd";
import { PlusOutlined, BookOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";

// Modal for adding a new class
const AddClassModal = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
  // API endpoint for creating a new class
  const API_URL = 'https://localhost:7109/api/classes';

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(API_URL, values);

      if (response.status === 200) {
        message.success("Class created successfully!");
        form.resetFields();
        onSuccess();
        onCancel();
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to create class");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center space-x-2">
          <BookOutlined className="text-blue-500" />
          <span className="text-xl font-semibold">Add New Class</span>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      className="rounded-lg"
      maskClassName="bg-gray-800/50"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-4"
      >
        {/* Class Name Field */}
        <Form.Item
          name="className"
          label="Class Name"
          rules={[
            { required: true, message: "Please enter a class name" },
            { min: 3, message: "Class name must be at least 3 characters" },
          ]}
        >
          <Input
            prefix={<BookOutlined className="text-gray-400" />}
            placeholder="Enter class name"
            className="rounded-md"
          />
        </Form.Item>

        {/* Description Field */}
        <Form.Item name="description" label="Description (Optional)">
          <Input.TextArea
            prefix={<EditOutlined className="text-gray-400" />}
            placeholder="Enter class description"
            className="rounded-md"
            rows={4}
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item className="mb-0">
          <div className="flex justify-end space-x-2">
            <Button onClick={onCancel} className="hover:bg-gray-100">
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Create Class
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

// Sidebar Item Component
const SidebarItem = ({ userId, handleClassSelect }) => {
  const [classes, setClasses] = useState([]); // State for class list
  const [loading, setLoading] = useState(true); // State for loading status
  const [selectedKey, setSelectedKey] = useState(null); // State for selected class key
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state

  // Fetch class list from API
  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7109/api/frontend/Classes/user/${userId}`
      );
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [userId]);

  // Select the first class automatically once classes are loaded
  useEffect(() => {
    if (!loading && classes.length > 0) {
      const firstClass = classes[0];
      setSelectedKey(firstClass.id.toString());
      handleClassSelect(firstClass);
    }
  }, [loading, classes]);

  // Handle class selection
  const handleSelect = (cls) => {
    setSelectedKey(cls.id.toString());
    handleClassSelect(cls);
  };

  // Handle modal open
  const handleOpenModal = () => setIsModalVisible(true);

  // Handle modal close and refresh class list on success
  const handleCloseModal = () => {
    setIsModalVisible(false);
    fetchClasses();
  };

  // Define menu items
  const items = [
    {
      key: "myClassesGroup",
      label: (
        <div className="flex justify-around items-center mb-2">
          <span className="text-white mr-14">My classes</span>
          {/* Avatar icon triggers modal */}
          <Avatar
            icon={<PlusOutlined />}
            size={24}
            onClick={handleOpenModal}
            className="bg-blue-500 cursor-pointer"
          />
        </div>
      ),
    },
    ...(loading
      ? [{ key: "loading", label: "Loading..." }]
      : classes.map((cls) => ({
          key: cls.id.toString(),
          label: (
            <div onClick={() => handleSelect(cls)}>
              {cls.title}
            </div>
          ),
        }))),
  ];

  return (
    <>
      {/* Sidebar menu */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={items}
      />
      {/* AddClassModal */}
      <AddClassModal
        visible={isModalVisible}
        onCancel={handleCloseModal}
        onSuccess={handleCloseModal}
      />
    </>
  );
};

export default SidebarItem;