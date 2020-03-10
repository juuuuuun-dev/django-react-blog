import React from 'react';
import { Layout, Card } from 'antd';

const Login = () => {
  const { Header, Footer, Sider, Content } = Layout;

  return (
    <Layout className='site-layout-background' style={{}}>
      <Content style={{ height: '100vh', padding: '20px' }}>
        <Card
          title='Login'
          bordered={false}
          style={{
            width: 'auto',
            maxWidth: '500px',
            margin: '10% auto 0 auto'
          }}
        >
          <p>Card content</p>
        </Card>
      </Content>
    </Layout>
  );
};

export default Login;
