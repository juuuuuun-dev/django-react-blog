import React from 'react';
import Header from '../Header';
import { Route, Switch } from 'react-router-dom';
import Index from '../../../pages';
import Articles from '../../../pages/Articles';
import { Layout, Breadcrumb, Row, Col } from 'antd';
import '../../../less/main/main.less';

const MainLayout = () => {
  const { Content } = Layout;
  return (
    <>
      <Header />
      <Content className="site-layout">
        <div className="main-container site-layout-background">
          <Row>
            <Col flex="1 1 587px">
              <div className="contents">
                <Switch>
                  <Route exact path="/" component={Index} />
                  <Route exact path="/articles" component={Articles} />
                </Switch>
              </div>
            </Col>
            <Col className="right-contents" flex="0 1 300px">
              right
            </Col>
          </Row>
        </div>

      </Content>
    </>
  );
};

export default MainLayout;
