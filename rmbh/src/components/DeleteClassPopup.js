import React from "react";
import { Modal, Button } from "antd";

const DeleteClassPopup = ({ open, onConfirm, onCancel, selectedClass }) => {
  return (
    <Modal
      title="Confirm Deletion"
      open={open} // Control the visibility of the modal
      onOk={onConfirm} // Handle confirmation action
      onCancel={onCancel} // Handle cancel action
      footer={[
        <Button key="cancel" onClick={onCancel}>
          No
        </Button>,
        <Button key="confirm" type="primary" onClick={onConfirm}>
          Yes
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete the class?</p>
    </Modal>
  );
};

export default DeleteClassPopup;
