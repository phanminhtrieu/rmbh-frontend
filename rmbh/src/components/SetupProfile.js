// pages/SetupProfile.js
import React, { useState } from "react";
import { 
  Button, 
  Form, 
  Input, 
  Typography, 
  message, 
  Upload, 
  Spin 
} from "antd";
import { useNavigate } from "react-router-dom";
import { 
  UserOutlined, 
  UploadOutlined,
  SaveOutlined,
  LoadingOutlined 
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;

const SetupProfile = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const navigate = useNavigate();

  // Handle image upload before submission
  const handleImageUpload = async (info) => {
    if (info.file.status === 'uploading') {
      setUploadLoading(true);
      return;
    }
    
    if (info.file.status === 'done') {
      // Get base64 URL for preview
      getBase64(info.file.originFileObj, (url) => {
        setUploadLoading(false);
        setImageUrl(url);
      });
    }
  };

  // Convert file to base64 for preview
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  // Validate file before upload
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

  // Form submission handler
  const onFinish = (values) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success('Profile setup completed!');
      navigate('/dashboard'); // Navigate to dashboard after setup
    }, 1500);

    console.log('Profile values:', { ...values, profilePicture: imageUrl });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-50 to-purple-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 space-y-8 transition-all duration-300 hover:shadow-3xl my-8">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            Set Up Your Profile
          </h2>
          <p className="text-gray-500 text-sm">
            Let's personalize your profile to get started
          </p>
        </div>

        {/* Profile Setup Form */}
        <Form
          name="profileSetup"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          className="space-y-6"
        >
          {/* Profile Picture Upload */}
          <div className="flex justify-center mb-8">
            <div className="space-y-4">
              <div className="flex justify-center">
                {imageUrl ? (
                  <div className="relative">
                    <img
                      src={imageUrl}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                    />
                    {uploadLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: 'white' }} />} />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-blue-100">
                    <UserOutlined className="text-4xl text-gray-400" />
                  </div>
                )}
              </div>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76" // Replace with your upload endpoint
                beforeUpload={beforeUpload}
                onChange={handleImageUpload}
              >
                <Button 
                  icon={<UploadOutlined />}
                  className="flex items-center"
                >
                  Upload Photo
                </Button>
              </Upload>
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name Field */}
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            >
              <Input
                placeholder="First Name"
                className="h-12 rounded-lg hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
              />
            </Form.Item>

            {/* Last Name Field */}
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please input your last name!' }]}
            >
              <Input
                placeholder="Last Name"
                className="h-12 rounded-lg hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
              />
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
              className="rounded-lg hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
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
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center justify-center"
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