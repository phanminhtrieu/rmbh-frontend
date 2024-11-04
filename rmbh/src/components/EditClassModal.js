// EditClassModal.jsx

import React from "react";
import { Modal, Form, Input, message } from "antd";

// EditClassModal Component
const EditClassModal = ({ open, onCancel, selectedClass }) => {
  const [form] = Form.useForm();

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      // Call API to update the class here (pseudo-code)
      // const response = await api.updateClass(selectedClass.id, values);
      console.log("Class updated:", { ...selectedClass, ...values });
      message.success("Class updated successfully!");
      form.resetFields();
      onCancel(); // Close the modal
    } catch (error) {
      message.error("Failed to update class");
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
        initialValues={{ className: selectedClass?.name, description: selectedClass?.description }}
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
            <button type="button" onClick={onCancel} className="mr-2 text-gray-500">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2">Save</button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditClassModal;