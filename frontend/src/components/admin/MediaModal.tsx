import React from "react"
import { Input, Button, Modal } from 'antd';

interface IProps {
  visible: boolean;
  setVisible: (bool: boolean) => void;
}
const MediaModal: React.FC<IProps> = ({ visible, setVisible }) => {
  React.useEffect(() => {
    console.log("effect")
  }, [])
  const { Search } = Input;
  return (
    <Modal
      title="Media"
      className="media-modal"
      width={"90%"}
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
      a
    </Modal>
  )
}

export default MediaModal;