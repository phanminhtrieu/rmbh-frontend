// EditClassModal.jsx
import axios from "axios"; // Import axios
import React from "react";
import { Modal, Form, Input, message } from "antd";

// EditClassModal Component
const EditClassModal = ({ open, onCancel, selectedClass }) => {
  console.log(selectedClass);

  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const userId = localStorage.getItem("userId"); // Lấy userId từ localStorage

      // Kết hợp selectedClass với giá trị từ form
      const updatedClass = {
        ...selectedClass,
        title: values.className, // Cập nhật title với giá trị mới từ input
        description: values.description, // Cập nhật description với giá trị mới từ input
        userId: userId, // Thêm userId vào updatedClass
      };

      // Gửi request đến backend để cập nhật thông tin lớp
      const response = await axios.put(
        `https://localhost:7109/api/frontend/Classes/update/${selectedClass?.id}`,
        updatedClass // Gửi đối tượng đã cập nhật
      );

      if (response.status === 200) {
        message.success("Class updated successfully!");
        form.resetFields();
        onCancel(); // Đóng modal
      }
    } catch (error) {
      message.error("Failed to update class");
      console.error("Update class error:", error); // Ghi lại lỗi để gỡ lỗi
    }
  };

  return (
    <Modal
      title="Edit Class"
      open={open} // Use the 'open' prop instead of 'visible'
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          className: selectedClass?.title,
          description: selectedClass?.description,
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="className"
          label="Class Name"
          rules={[{ required: true, message: "Please enter class name" }]}
        >
          <Input placeholder="Enter class name" />
        </Form.Item>

        <Form.Item name="description" label="Description (Optional)">
          <Input.TextArea placeholder="Enter class description" rows={4} />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="mr-2 text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2"
            >
              Save
            </button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditClassModal;
