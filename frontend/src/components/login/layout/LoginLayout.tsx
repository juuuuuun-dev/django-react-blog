import '../../../less/admin/admin.less';

import { Layout } from 'antd';
import React from 'react';
import { Route } from 'react-router-dom';

import MetaHead from '../../../components/common/MetaHead';
import Login from '../../../pages/Login';
import PasswordReset from '../../../pages/PasswordReset';
import PasswordResetConfirm from '../../../pages/PasswordResetConfirm';

export interface MainLayoutProps {
  children: React.ReactNode;
  match: any;
}

const LoginLayout = () => {
  const { Content } = Layout;
  return (
    <>
      <MetaHead pageTitle="Login" />
      <div className="contents">
        <Layout className="site-layout-background">
          <Content style={{ height: '100vh' }}>
            <Content>
              <Route exact path="/login" component={Login} />
              <Route exact path="/password-reset" component={PasswordReset} />
              <Route exact path="/password-reset-confirm/:uid/:token/" component={PasswordResetConfirm} />
            </Content>
          </Content>
        </Layout>
      </div>
    </>
  );
};

export default LoginLayout;
