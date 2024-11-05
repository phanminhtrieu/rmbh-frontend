// pages/Login.js
import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Input, Typography, message, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";

const { Title, Text, Link } = Typography;

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    const { username, password } = values;

    try {
      // Gửi yêu cầu đăng nhập tới backend
      const response = await axios.post(
        "https://localhost:7109/api/frontend/authentications/login",
        {
          email: username,
          password: password,
        }
      );

      // Nếu đăng nhập thành công
      const userData = response.data; // Nhận thông tin người dùng từ backend

      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      message.success("Login successful!");
      onLogin(userData);
      navigate("/");
    } catch (error) {
      // Xử lý lỗi khi đăng nhập thất bại
      message.error("Invalid username or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-50 to-purple-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-8 transition-all duration-300 hover:shadow-3xl">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            Welcome Back!
          </h2>
          <p className="text-gray-500 text-sm">
            Please sign in to access your account
          </p>
        </div>

        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          className="space-y-6"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            className="mb-4"
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Username"
              className="h-12 rounded-lg hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            className="mb-2"
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password"
              className="h-12 rounded-lg hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
            />
          </Form.Item>

          <div className="flex justify-end mb-6">
            <Link className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-300">
              Forgot password?
            </Link>
          </div>

          <Form.Item className="mb-6">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<LoginOutlined />}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center justify-center"
            >
              Sign In
            </Button>
          </Form.Item>

          <div className="text-center space-y-2 pt-4 border-t border-gray-100">
            <p className="text-gray-500 text-sm">Don't have an account?</p>
            <Link
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:text-blue-800 text-base font-medium transition-colors duration-300 inline-block"
            >
              Create an account
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
