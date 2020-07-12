import React from 'react';

import { CloseOutlined, MenuOutlined } from '@ant-design/icons';

import { HumbergerProps } from '../../types/components/main/Humberger';

const Humberger = ({ showDrawer, setShowDrawer }: HumbergerProps) => {
  return (
    <div className="humberger">
      {!showDrawer && <div className="humberger-button" onClick={() => setShowDrawer(true)}><MenuOutlined className="humberger-button__icon" /></div>}
      {showDrawer && <div className="humberger-button" onClick={() => setShowDrawer(false)}><CloseOutlined className="humberger-button__icon" /></div>}
    </div>
  );
};

export default Humberger;