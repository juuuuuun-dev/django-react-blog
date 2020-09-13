import { Col, Drawer, Layout, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { useWindowSize } from '@react-hook/window-size';

import { MainContext } from '../../context/mainContext';
import Humberger from './ Humberger';
import Nav from './Nav';

const Header: React.FC = () => {
  const [{ init }] = React.useContext(MainContext);
  const headerHeight = '60px';
  const { Header } = Layout;
  const [showDrawer, setShowDrawer] = React.useState<boolean>(false);
  const [width] = useWindowSize();
  return React.useMemo(() => {
    return (
      <>
        <Header
          style={{
            height: headerHeight,
            background: '#ffffff',
            boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.05)",

          }}
        >
          <div className="header-container">
            <Row>
              <Col flex="100px"><Link to="/"><h1 className="app-title" data-testid="app-title">{init?.siteSettings.title}</h1></Link></Col>
              <Col flex="auto">
                {width > 600 && (
                  <Nav
                    mode="horizontal"
                    categories={init?.categories}
                    styles={{
                      lineHeight: headerHeight,
                      float: 'right',
                    }}
                  />
                )}
                {width <= 600 && <Humberger showDrawer={showDrawer} setShowDrawer={setShowDrawer} />}
              </Col>
            </Row>
          </div>
        </Header>

        <Drawer
          placement="right"
          closable={false}
          className="nav-drawer"
          onClose={() => setShowDrawer(false)}
          visible={showDrawer}
          style={{
            top: headerHeight,
          }}
        >
          <Nav mode="inline" categories={init?.categories} setShowDrawer={setShowDrawer} styles={{}} />
        </Drawer>
      </>
    );
  }, [init, showDrawer, width])
};

export default Header;
