import '../../../less/main/main.less';

import { Col, Layout, Row } from 'antd';
import React from 'react';

import { MainContextProvider } from '../../../context/mainContext';
import GlobalModal from '../GlobalModal';
import Header from '../Header';
import Container from './Container';
import RightContainer from './RightContainer';

const MainLayout = () => {
  const { Content } = Layout;
  return (
    <>
      <MainContextProvider>
        <Header />
        <Content className="site-layout">
          <div className="main-container site-layout-background">
            <Row gutter={[{ sm: 60 }, 60]}>
              <Col lg={17} md={24} sm={24} xs={24}>
                <div className="contents">
                  <Container />
                </div>
              </Col>
              <Col lg={7} md={24} sm={24} xs={24}>
                <RightContainer />
              </Col>
            </Row>
          </div>
          <GlobalModal />
        </Content>
      </MainContextProvider>
    </>
  );
};

export default MainLayout;
