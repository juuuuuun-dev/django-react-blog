import '../../../less/main/main.less';

import { Col, Layout, Row } from 'antd';
import React, { useContext } from 'react';

import MetaHead from '../../../components/common/MetaHead';
import { MainContext } from '../../../context/mainContext';
import Footer from '../Footer';
import GlobalModal from '../GlobalModal';
import Header from '../Header';
import Container from './Container';
import RightContainer from './RightContainer';

const MainLayout: React.FC = () => {
  const { Content } = Layout;
  const [{ pageTitle, description, meta, ldJson }] = useContext(MainContext);
  return (
    <>
      <MetaHead pageTitle={pageTitle} description={description} meta={meta} />
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
    </>
  );
};


export default MainLayout;
