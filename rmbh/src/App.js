import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Study from "./pages/Study/Study";
import AvatarProfile from "./components/AvatarProfile";
import SidebarItem from "./components/SidebarItem";
import HeaderContent from "./components/HeaderContent";
import BodyContent from "./components/BodyContent";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("About"); // Trạng thái cho menu được chọn

  // Hàm lấy dữ liệu lớp từ API
  const fetchClasses = async () => {
    try {
      const response = await fetch("https://your-api-url.com/api/classes"); // Thay thế URL bằng URL của API
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const userClasses = await response.json();
      setClasses(userClasses);
      if (userClasses.length > 0) setSelectedClass(userClasses[0]);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    }
  };

  useEffect(() => {
    // Kiểm tra local storage để lấy thông tin người dùng
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Cập nhật trạng thái người dùng từ local storage
      fetchClasses(); // Gọi hàm lấy lớp sau khi xác thực người dùng
    }
  }, []);

  const handleClassSelect = (cls) => setSelectedClass(cls);
  const handleEllipsisClick = () => {};

  const layout = (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <AvatarProfile user={user} />
        <SidebarItem
          classes={classes}
          selectedClass={selectedClass}
          handleClassSelect={handleClassSelect}
        />
      </Layout.Sider>

      <Layout>
        <HeaderContent
          selectedClass={selectedClass}
          user={user}
          handleEllipsisClick={handleEllipsisClick}
          selectedMenu={selectedMenu} // Truyền selectedMenu vào HeaderContent
          setSelectedMenu={setSelectedMenu} // Truyền hàm để cập nhật selectedMenu
        />
        <BodyContent selectedMenu={selectedMenu} />{" "}
        {/* Truyền selectedMenu vào BodyContent */}
        <Layout.Footer style={{ textAlign: "center" }}>
          Remember helper
        </Layout.Footer>
      </Layout>
    </Layout>
  );

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Lưu thông tin người dùng vào local storage
    fetchClasses(); // Gọi hàm lấy lớp khi đăng nhập thành công
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/study" element={<Study />} />
        <Route
          path="/*"
          element={user ? layout : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
