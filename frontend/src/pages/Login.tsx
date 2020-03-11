import React from 'react';
import { Layout, Card } from 'antd';
import LoginForm from '../components/form/LoginForm';

const Login = () => {
    const { Content } = Layout;

    return (
        <Layout className='site-layout-background' style={{}}>
            <Content style={{ height: '100vh', padding: '20px' }}>
                <Card
                    title='Login'
                    bordered={false}
                    style={{
                        width: 'auto',
                        maxWidth: '300px',
                        margin: '10% auto 0 auto'
                    }}
                >
                    <LoginForm />
                </Card>
            </Content>
        </Layout>
    );
};

export default Login;
