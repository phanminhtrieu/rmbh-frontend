import React from "react";
import { Avatar, Typography } from "antd";

const { Title } = Typography;

const AvatarProfile = ({ user }) => (
  <div className="flex flex-col items-center p-4">
    {user && <Avatar size={64} src={user.avatarUrl} />}
    <Title level={5} style={{ color: "white" }} className="mt-2">
      {user ? user.name : "Guest"}
    </Title>
  </div>
);

export default AvatarProfile;
