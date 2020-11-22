import { Col, Drawer, Layout, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { useWindowSize } from '@react-hook/window-size';

import { MainContext } from '../../context/mainContext';
import Humberger from './ Humberger';
import Nav from './Nav';

const Header: React.FC = () => {
  const [state] = React.useContext(MainContext);
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
            position: 'fixed',
            zIndex: 10,
            width: "100%",
            top: 0,
          }}
        >
          <div className="header-container">
            <Row>
              <Col>
                <Link to="/">
                  <h1 className="app-title" data-testid="app-title">
                    {state.init?.siteSettings.logo
                      ? <picture>
                        <source media={`(max-width: ${state.breakPoint.sm - 1}px)`} srcSet={`${state.init?.siteSettings.logo} 1x`}></source>
                        <source media={`(min-width: ${state.breakPoint.sm}px)`} srcSet={`${state.init?.siteSettings.logo_mini} 1x`}></source>
                        <img height="56" src={state.init?.siteSettings.logo} alt={state.init?.siteSettings.name} />
                      </picture>
                      : state.init?.siteSettings.name
                    }
                  </h1>
                </Link>
              </Col>

              <Col flex="auto">
                {width > 600 && (
                  <Nav
                    mode="horizontal"
                    categories={state.init?.categories}
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
          <Nav mode="inline" categories={state.init?.categories} setShowDrawer={setShowDrawer} styles={{}} />
        </Drawer>
      </>
    );
  }, [state, showDrawer, width])
};

export default Header;
