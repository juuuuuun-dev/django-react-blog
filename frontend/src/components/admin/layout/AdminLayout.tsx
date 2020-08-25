import '../../../less/admin/admin.less';

import { Layout } from 'antd';
import React from 'react';

import MetaHead from '../../../components/common/MetaHead';
import Header from '../Header';
import SideNav from '../SideNav';
import Container from './Container';

const AdminLayout = () => {
  const { Content } = Layout;

  const meta = [
    { name: 'robots', content: 'noindex' }
  ]

  return (
    <>
      <MetaHead pageTitle="Admin" meta={meta} />
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
    </>
  );
};

export default AdminLayout;
