import React from 'react';
import Header from '../Header';
import { Route, Switch } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Dashboard from '../../../pages/admin/Dashboard';
import Login from '../../../pages/admin/Login';
import SlideNav from '../SlideNav';
import { AdminContextProvider } from '../../../context/adminContext'
import "../../../less/layout/admin.less"


export interface MainLayoutProps {
  children: React.ReactNode;
  match: any
}

const AdminLayout = () => {
  console.log('adminLayout');
  const { Content } = Layout;

  return (
    <>
      <AdminContextProvider>
        <div className="contents">
          <Layout className="site-layout-background" style={{ padding: '0px 0' }}>
            <SlideNav background={"#3f3f3f"} />
            <Content style={{ padding: '0 0px', minHeight: 280 }}>
              <Header />
              <Switch>
                <Route path="/admin/dashboard" component={Dashboard} />
                <Route path="/admin/login" component={Login} />
              </Switch>
            </Content>
          </Layout>
        </div>
      </AdminContextProvider>
    </>
  );
};

export default AdminLayout;
