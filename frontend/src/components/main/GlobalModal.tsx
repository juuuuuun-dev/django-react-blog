import { Modal } from 'antd';
import React from 'react';

import { MainContext } from '../../context/mainContext';

const GlobalModal: React.FC = () => {
  const [{ globalModalConfig }, dispatch] = React.useContext(MainContext);

  React.useEffect(() => {
    console.log({ globalModalConfig })
  }, [globalModalConfig]);
  const [modal, contextHolder] = Modal.useModal();
  const config = {
    title: 'Use Hook!',
    content: (
      <div>
        aa
      </div>
    ),
  };

  return (
    <>
      {contextHolder}
    </>
  );
};

export default GlobalModal;
