import React, { useState, useEffect } from "react";
import { Layout, Modal } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Study from "./pages/Study/Study";
import AvatarProfile from "./components/AvatarProfile";
import SidebarItem from "./components/SidebarItem";
import HeaderContent from "./components/HeaderContent";
import BodyContent from "./components/BodyContent";
import SetupProfile from "./components/SetupProfile";

const App = () => {
  // State management
  const [collapsed, setCollapsed] = useState(false);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("About");
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

  // Fetch user's classes from API
  const fetchClasses = async () => {
    try {
      const response = await fetch("https://your-api-url.com/api/classes");
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

  // Check for stored user data on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchClasses();
    }
  }, []);

  // Profile modal handlers
  const showProfileModal = () => {
    setIsProfileModalVisible(true);
  };

  const handleProfileModalCancel = () => {
    setIsProfileModalVisible(false);
  };

  // Handle profile update
  const handleProfileUpdate = (updatedProfile) => {
    setUser(prev => ({
      ...prev,
      ...updatedProfile
    }));
    localStorage.setItem("user", JSON.stringify({
      ...user,
      ...updatedProfile
    }));
    setIsProfileModalVisible(false);
  };

  const handleClassSelect = (cls) => setSelectedClass(cls);
  const handleEllipsisClick = () => {};

  // Main layout structure
  const layout = (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        {/* Avatar profile with click handler */}
        <div onClick={showProfileModal} style={{ cursor: 'pointer' }}>
          <AvatarProfile user={user} />
        </div>
        
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
          selectedMenu={selectedMenu} 
          setSelectedMenu={setSelectedMenu}
        />
        <BodyContent selectedMenu={selectedMenu} />
        <Layout.Footer style={{ textAlign: "center" }}>
          Remember helper
        </Layout.Footer>
      </Layout>

      {/* Profile Setup Modal */}
      <Modal
        title="Edit Profile"
        open={isProfileModalVisible}
        onCancel={handleProfileModalCancel}
        footer={null}
        width={800}
        style={{ padding: 0 }} // Apply inline style for padding
      >
        <SetupProfile
          initialValues={user}
          onSubmit={handleProfileUpdate}
          onCancel={handleProfileModalCancel}
        />
      </Modal>
    </Layout>
  );

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    fetchClasses();
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