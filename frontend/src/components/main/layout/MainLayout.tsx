import React from 'react';
import Header from '../Header';
import { Layout, Row, Col } from 'antd';
import { MainContextProvider } from '../../../context/mainContext';
import Container from './Container';
import '../../../less/main/main.less';

const MainLayout = () => {
  console.log("mainLayout")
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
                right
            </Col>
            </Row>
          </div>

        </Content>
      </MainContextProvider>
    </>
  );
};

export default MainLayout;
