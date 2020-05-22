import '../../../less/main/main.less';

import { Col, Layout, Row } from 'antd';
import React from 'react';

import { MainContextProvider } from '../../../context/mainContext';
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
            <Row>
              <Col flex="1 1 587px">
                <div className="contents">
                  <Container />
                </div>
              </Col>
              <Col className="right-contents" flex="0 1 300px">
                <RightContainer />
              </Col>
            </Row>
          </div>

        </Content>
      </MainContextProvider>
    </>
  );
};

export default MainLayout;
