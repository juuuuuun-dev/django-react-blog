import React from 'react';
import { Layout, Card } from 'antd';
import LoginForm from '../components/login/form/LoginForm';

const Login = () => {
  const { Content } = Layout;
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
          <Card title="Login" bordered={false}>
            <LoginForm />
          </Card>
          <a className="login-form-forgot" href="asdf">
            Forgot password
          </a>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;