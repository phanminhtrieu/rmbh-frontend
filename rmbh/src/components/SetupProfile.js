import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const SetUpProfileModal = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  // API endpoint for saving the profile
  const API_URL = 'https://localhost:7109/api/profile'; // Adjust the endpoint accordingly

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      // Prepare form data for submission, including the file
      const formData = new FormData();
      formData.append('lastName', values.lastName);
      formData.append('firstName', values.firstName);
      formData.append('bio', values.bio);
      if (fileList.length > 0) {
        formData.append('profilePicture', fileList[0].originFileObj);
      }

      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        message.success('Profile updated successfully!');
        form.resetFields();
        setFileList([]);
        onSuccess();
        onCancel();
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Set Up Your Profile"
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
        {/* Last Name Field */}
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please enter your last name' }]}
        >
          <Input placeholder="Enter your last name" className="rounded-md" />
        </Form.Item>

        {/* First Name Field */}
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please enter your first name' }]}
        >
          <Input placeholder="Enter your first name" className="rounded-md" />
        </Form.Item>

        {/* Bio Field */}
        <Form.Item
          name="bio"
          label="Bio"
          rules={[{ required: true, message: 'Please enter your bio' }]}
        >
          <Input.TextArea placeholder="Write a short bio..." className="rounded-md" rows={4} />
        </Form.Item>

        {/* Profile Picture Upload */}
        <Form.Item label="Profile Picture">
          <Input 
            type="file"
            accept="image/*"
            onChange={(e) => setFileList(e.target.files)}
            className="rounded-md"
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
              Save Profile
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SetUpProfileModal;