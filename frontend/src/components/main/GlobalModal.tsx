// import { Modal } from 'antd';
import React from 'react';

import { MainContext } from '../../context/mainContext';

const GlobalModal: React.FC = () => {
  const [{ globalModalConfig }] = React.useContext(MainContext);

  React.useEffect(() => {

  }, [globalModalConfig]);
  // const [_modal, contextHolder] = Modal.useModal();
  // const _config = {
  //   title: 'Use Hook!',
  //   content: (
  //     <div>
  //       aa
  //     </div>
  //   ),
  // };

  return (
    <>
      {/* {contextHolder} */}
    </>
  );
};

export default GlobalModal;
