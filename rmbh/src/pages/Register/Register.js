// pages/Register.js
import React, { useState } from "react";
import { Button, Form, Input, Typography, message, Space } from "antd";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const { Title, Text, Link } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Custom validator for password confirmation
  const validateConfirmPassword = (_, value) => {
    const password = form.getFieldValue("password");
    if (!value || password === value) {
      return Promise.resolve();
    }
    return Promise.reject("Passwords do not match!");
  };

  // Form submission handler
  const onFinish = (values) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success("Registration successful!");
      navigate("/login");
    }, 1500);

    console.log("Registration values:", values);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-50 to-purple-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-8 transition-all duration-300 hover:shadow-3xl">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm">
            Fill in your information to create an account
          </p>
        </div>

        {/* Registration Form */}
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          className="space-y-4"
        >
          {/* First Name Field */}
          <Form.Item
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
            className="mb-4"
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="First Name"
              className="h-12 rounded-lg hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
            />
          </Form.Item>

          {/* Last Name Field */}
          <Form.Item
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
            className="mb-4"
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Last Name"
              className="h-12 rounded-lg hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
            />
          </Form.Item>

          {/* Email Field */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
            className="mb-4"
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Email"
              className="h-12 rounded-lg hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
            className="mb-4"
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password"
              className="h-12 rounded-lg hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
            />
          </Form.Item>

          {/* Confirm Password Field */}
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              { validator: validateConfirmPassword },
            ]}
            className="mb-6"
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Confirm Password"
              className="h-12 rounded-lg hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<ArrowRightOutlined />}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center justify-center"
            >
              Register
            </Button>
          </Form.Item>

          {/* Login Link */}
          <div className="text-center space-y-2 pt-4 border-t border-gray-100">
            <p className="text-gray-500 text-sm">Already have an account?</p>
            <Link
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:text-blue-800 text-base font-medium transition-colors duration-300 inline-block"
            >
              Sign in here
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
