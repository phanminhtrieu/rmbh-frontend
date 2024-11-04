import React, { useState } from "react";
import { Button, Form, Input, Typography, message, Upload, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, UploadOutlined, SaveOutlined, LoadingOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;

const SetupProfile = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const navigate = useNavigate();

  // Image upload handling
  const handleImageUpload = async (info) => {
    if (info.file.status === 'uploading') {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url) => {
        setUploadLoading(false);
        setImageUrl(url);
      });
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG files!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  // Form submission
  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('Profile setup completed!');
      navigate('/dashboard');
    }, 1500);
    console.log('Profile values:', { ...values, profilePicture: imageUrl });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-6 md:p-8 lg:p-10 space-y-6 transform transition-all duration-300 hover:shadow-2xl">
        
        {/* Header */}
        <div className="text-center">
          <Title level={3} className="font-bold text-gray-800">Set Up Your Profile</Title>
          <Text type="secondary">Personalize your profile to get started</Text>
        </div>

        {/* Profile Form */}
        <Form
          name="profileSetup"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          className="space-y-6"
        >

          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center mb-6">
            {imageUrl ? (
              <div className="relative">
                <img
                  src={imageUrl}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-blue-300"
                />
                {uploadLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full">
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: 'white' }} />} />
                  </div>
                )}
              </div>
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center border-4 border-blue-300">
                <UserOutlined className="text-4xl text-gray-400" />
              </div>
            )}
            <Upload
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleImageUpload}
            >
              <Button icon={<UploadOutlined />} className="mt-4 text-blue-600 hover:text-blue-700">Upload Photo</Button>
            </Upload>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            >
              <Input placeholder="First Name" className="rounded-lg border border-gray-300 hover:border-blue-400 focus:border-blue-500" />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please input your last name!' }]}
            >
              <Input placeholder="Last Name" className="rounded-lg border border-gray-300 hover:border-blue-400 focus:border-blue-500" />
            </Form.Item>
          </div>

          {/* Bio Field */}
          <Form.Item
            name="bio"
            label="Bio"
            rules={[
              { required: true, message: 'Please write a short bio!' },
              { max: 500, message: 'Bio cannot be longer than 500 characters!' }
            ]}
          >
            <TextArea
              placeholder="Tell us about yourself..."
              rows={4}
              className="rounded-lg border border-gray-300 hover:border-blue-400 focus:border-blue-500"
              maxLength={500}
              showCount
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<SaveOutlined />}
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold flex items-center justify-center hover:shadow-md transition-shadow duration-300"
            >
              Save Profile
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SetupProfile;