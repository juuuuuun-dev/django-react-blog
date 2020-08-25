import '../../../less/main/main.less';

import { Col, Layout, Row } from 'antd';
import React, { ReactNode, useContext } from 'react';

import MetaHead from '../../../components/common/MetaHead';
import { MainContext, MainContextProvider } from '../../../context/mainContext';
import Footer from '../Footer';
import GlobalModal from '../GlobalModal';
import Header from '../Header';
import Container from './Container';
import RightContainer from './RightContainer';

const MainLayout: React.FC = () => {
  const { Content } = Layout;
  const [{ pageTitle, description }] = useContext(MainContext);
  // const context = React.useContext(MainContext);

  // if (context) {
  //   const state = context[0];
  //   console.log(state)
  // }
  return (
    <>
      <ProviderWrapper>
        <MetaHead pageTitle={pageTitle} description={description} />
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
        <Footer />
      </ProviderWrapper>
    </>
  );
};

const ProviderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <MainContextProvider>
      {children}
    </MainContextProvider>
  )
}

export default MainLayout;
