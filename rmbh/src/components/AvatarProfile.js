// components/AvatarProfile.js
import React from "react";
import { Avatar, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";

const AvatarProfile = ({ user }) => {
  return (
    <Tooltip title="Click to edit profile">
      <div className="flex flex-col items-center p-4 hover:bg-gray-100 transition-colors duration-300">
        <Avatar
          size={64}
          icon={<UserOutlined />}
          src={user?.profilePicture}
          className="cursor-pointer"
        />
        <span className="mt-2 text-sm hover:text-black-500 text-white">
          {user ? `${user.name}` : "Guest"}
        </span>
      </div>
    </Tooltip>
  );
};

export default AvatarProfile;
