import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import { AdminContextProvider } from '../../../context/adminContext';
import Login from '../../../pages/Login'
import '../../../less/layout/admin.less';

export interface MainLayoutProps {
  children: React.ReactNode;
  match: any;
}

const LoginLayout = () => {
  console.log('LoginLayout')
  const { Header, Content } = Layout;
  return (
    <>
      <AdminContextProvider>
        <div className="contents">
          <Layout className="site-layout-background">
            <Content style={{ height: "100vh" }}>
              <Content>
                <Route path="/" component={Login} />
              </Content>
            </Content>
          </Layout>
        </div>
      </AdminContextProvider>
    </>
  );
};

export default LoginLayout;
