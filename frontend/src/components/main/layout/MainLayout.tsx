import '../../../less/main/main.less';

import { Col, Layout, Row } from 'antd';
import React, { useContext } from 'react';

import MetaHead from '../../../components/common/MetaHead';
import { MainContext } from '../../../context/mainContext';
import Footer from '../Footer';
import Header from '../Header';
import Container from './Container';
import RightContainer from './RightContainer';

const MainLayout: React.FC = () => {
  const { Content } = Layout;
  const [{ init, pageTitle, meta, ldJson }] = useContext(MainContext);
  return (
    <>
      <MetaHead appTitle={init?.siteSettings.name} pageTitle={pageTitle} meta={meta} ldJson={ldJson} />
      <Header />
      <Content className="site-layout">
        <div className="main-container site-layout-background">
          <Row gutter={[{ sm: 60 }, 60]}>
            {/* <Col flex="1 1 618px"> */}
            <Col lg={18} md={24} sm={24} xs={24}>
              <div className="contents">
                <Container />
              </div>
            </Col>
            {/* <Col className="right-container" flex="1 1 300px"> */}
            <Col className="right-container" lg={6} md={24} sm={24} xs={24}>
              <RightContainer />
            </Col>
          </Row>
        </div>
      </Content>
      <Footer />
    </>
  );
};


export default MainLayout;
