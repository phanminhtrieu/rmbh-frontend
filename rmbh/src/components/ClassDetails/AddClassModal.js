// AddClassModal.jsx
import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { BookOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";

const AddClassModal = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  console.log(axios.defaults.baseURL);

  // API endpoint for creating a new class
  // const API_URL = "https://localhost:7109/api/frontend/Classes";

  const handleSubmit = async (values) => {
    console.log("submit");

    try {
      setLoading(true);
      const response = await axios.post(
        "https://localhost:7109/api/frontend/Classes",
        values
      );

      if (response.status === 200) {
        message.success("Class created successfully!");
        form.resetFields();
        onSuccess?.();
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

export default AddClassModal;
