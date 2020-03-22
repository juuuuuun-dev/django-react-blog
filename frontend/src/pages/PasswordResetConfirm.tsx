import React from 'react';
import { Layout, Card } from 'antd';
import PasswordResetConfirmForm from '../components/login/form/PasswordResetConfirmForm';

const PasswordResetConfirm = () => {
  const { Content } = Layout;
  return (
    <Layout className="site-layout-background" style={{}}>
      <Content style={{ height: '100vh', padding: '20px' }}>
        <div
          style={{
            width: 'auto',
            maxWidth: '450px',
            margin: '15% auto 0 auto',
          }}
        >
          <Card title="Reset password" bordered={false}>
            <PasswordResetConfirmForm />
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default PasswordResetConfirm;
