// pages/Login.js
import React, { useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Link } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    // Logic kiểm tra thông tin đăng nhập
    // Giả sử thông tin đăng nhập thành công
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard"); // Điều hướng đến Dashboard sau khi đăng nhập thành công
    }, 1000);
  };

  return (
    <div style={{ maxWidth: 300, margin: "auto", paddingTop: "50px" }}>
      <Form name="login" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          <Link onClick={() => navigate("/register")}>
            Don't have an account? Register now!
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
