import React from "react";
import { Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const StudyButton = ({ handleEllipsisClick }) => (
  <div className="flex items-center space-x-2">
    <Button
      className="w-1/2"
      type="primary"
      shape="round"
      size="large"
      onClick={() => (window.location.href = "/study")}
    >
      Study
    </Button>
    <Button
      className="flex items-center justify-center text-4xl p-2 border-0"
      onClick={handleEllipsisClick}
    >
      <EllipsisOutlined />
    </Button>
  </div>
);

export default StudyButton;
