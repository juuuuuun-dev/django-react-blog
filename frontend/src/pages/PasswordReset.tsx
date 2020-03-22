import React from 'react';
import { Layout, Card } from 'antd';
import PasswordResetForm from '../components/login/form/PasswordResetForm';

const PasswordReset = () => {
  const { Content } = Layout;
  const [sending, setSending] = React.useState<boolean>(false)
  return (
    <Layout className="site-layout-background" style={{}}>
      <Content style={{ height: '100vh', padding: '20px' }}>
        <div
          style={{
            width: 'auto',
            maxWidth: '300px',
            margin: '15% auto 0 auto',
          }}
        >
          <Card title="Forgot password" bordered={false}>
            {!sending && <PasswordResetForm setSending={setSending} />}
            {sending && <p>Sending password reset url! Check your email</p>}
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default PasswordReset;
