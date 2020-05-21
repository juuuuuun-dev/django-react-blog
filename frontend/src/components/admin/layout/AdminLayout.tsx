import '../../../less/admin/admin.less';

import { Layout } from 'antd';
import React from 'react';

import { AdminContextProvider } from '../../../context/adminContext';
import Header from '../Header';
import SideNav from '../SideNav';
import Container from './Container';

const AdminLayout = () => {
  const { Content } = Layout;
  return (
    <>
      <AdminContextProvider>
        <div>
          <Layout className="contents site-layout-background" style={{ padding: '0px 0' }}>
            <SideNav background={'#444'} />
            <Content style={{ padding: '0 0px', minHeight: 280 }}>
              <Header headerHeight="60px" />
              <Content>
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
