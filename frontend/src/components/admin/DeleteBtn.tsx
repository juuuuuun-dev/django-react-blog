import { Button, Modal } from 'antd';
import React from 'react';

import { DeleteOutlined } from '@ant-design/icons';

interface IProps {
  onDelete: () => Promise<void>;
  isStaff?: Boolean;
}
const DeleteBtn: React.FC<IProps> = ({ onDelete, isStaff = false }) => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  return (
    <>
      <div className="delete-btn">
        <Button disabled={!isStaff} type="link" aria-label="delete-btn" danger onClick={() => setShowModal(true)}>Delete</Button>
      </div>
      <Modal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={onDelete}
        okText="Delete"
        okButtonProps={{ danger: true, icon: <DeleteOutlined aria-label="delete-submit" /> }}
      >
        <p>Can I delete it?</p>
      </Modal>
    </>
  );
};

export default DeleteBtn;
