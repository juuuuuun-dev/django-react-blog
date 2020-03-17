import React from 'react';
import Header from '../Header';
import SideNav from '../SideNav';
import { AdminContextProvider } from '../../../context/adminContext';
import { Layout } from 'antd';
import Container from './Container';
import '../../../less/admin/admin.less';
import { Spin } from 'antd';
import { AdminContext } from '../../../context/adminContext';

export interface MainLayoutProps {
  children: React.ReactNode;
  match: any;
}

const AdminLayout = () => {
  const { Content } = Layout;

  return (
    <>
      <AdminContextProvider>
        <div className="contents">
          <Layout className="site-layout-background" style={{ padding: '0px 0' }}>
            <SideNav background={'#3f3f3f'} />
            <Content style={{ padding: '0 0px', minHeight: 280 }}>
              <Header headerHeight="60px" />
              <Content style={{ padding: '30px' }}>
                <Container />
              </Content>
            </Content>
          </Layout>
        </div>
      </AdminContextProvider>
    </>
  );
};

export default AdminLayout;
