import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import { AdminContextProvider } from '../../../context/adminContext';
import Login from '../../../pages/Login';
import PasswordReset from '../../../pages/PasswordReset';
import '../../../less/admin/admin.less';

export interface MainLayoutProps {
  children: React.ReactNode;
  match: any;
}

const LoginLayout = () => {
  const { Content } = Layout;
  return (
    <>
      <AdminContextProvider>
        <div className="contents">
          <Layout className="site-layout-background">
            <Content style={{ height: '100vh' }}>
              <Content>
                <Route exact path="/login" component={Login} />
                <Route exact path="/password-reset" component={PasswordReset} />
              </Content>
            </Content>
          </Layout>
        </div>
      </AdminContextProvider>
    </>
  );
};

export default LoginLayout;
