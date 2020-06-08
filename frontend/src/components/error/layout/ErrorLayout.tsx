import '../../../less/error/error.less';

import { Layout } from 'antd';
import React from 'react';

import Error from '../../../pages/Error';

const ErrorLayout: React.FC = () => {
  const { Content } = Layout;
  return (
    <>
      <Content className="error-container">
        <Error />
      </Content>
    </>
  );
};

export default ErrorLayout;
