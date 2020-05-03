import React from 'react';
import { Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface IProps {
  onDelete: () => Promise<void>;
}
const DeleteBtn: React.FC<IProps> = ({ onDelete }) => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  return (
    <>
      <div className="delete-btn">
        <Button type="link" aria-label="delete-btn" danger onClick={() => setShowModal(true)}>Delete</Button>
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
