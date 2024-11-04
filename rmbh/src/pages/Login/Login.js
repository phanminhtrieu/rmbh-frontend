// pages/Login.js
import React, { useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Link } = Typography;

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    // Logic kiểm tra thông tin đăng nhập
    const { username, password } = values;

    // Kiểm tra thông tin đăng nhập (có thể thay đổi theo yêu cầu thực tế)
    if (username === "trieu" && password === "1") {
      setTimeout(() => {
        setLoading(false);
        const userData = {
          name: username,
          id: "1B8DF37B-80CF-4182-8CC9-12DE166B46E2",
          avatarUrl: "https://via.placeholder.com/150",
        };

        // Lưu thông tin người dùng vào local storage
        localStorage.setItem("user", JSON.stringify(userData));

        onLogin(userData); // Cập nhật thông tin người dùng
        navigate("/"); // Điều hướng đến trang chính sau khi đăng nhập thành công
      }, 1000);
    } else {
      setLoading(false);
      alert("Invalid username or password!"); // Hiển thị thông báo lỗi nếu thông tin không hợp lệ
    }
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
