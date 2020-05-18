import React from 'react';
import { Layout, Drawer, Row, Col } from 'antd';
import { useWindowSize } from '@react-hook/window-size';
import { AdminContext } from '../../context/adminContext';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { HeaderProps, HumbergerProps } from '../../types/header';
import Nav from './Nav';

const Header: React.FC<HeaderProps> = ({ headerHeight }) => {
  const { Header } = Layout;
  const [showDrawer, setShowDrawer] = React.useState<boolean>(false);
  const [width] = useWindowSize();
  const dispatch = React.useContext(AdminContext)[1];
  const toggle = React.useCallback(() => {
    dispatch({ type: 'SIDER_TOGGLE' });
  }, [dispatch]);
  const navOnClick = (): void => { };
  return React.useMemo(() => {
    return (
      <>
        <Header
          style={{
            height: headerHeight,
            background: '#ffffff',
            padding: '0 20px',
            borderBottom: '1px solid #eee'
          }}
        >
          <Row>
            <Col flex="30px" style={{ fontSize: '18px', lineHeight: headerHeight }}>
              {React.createElement(MenuOutlined, {
                className: 'trigger',
                onClick: toggle,
              })}
            </Col>
            <Col flex="40px" style={{ lineHeight: headerHeight }}>
              <h2 className="logo">Admin</h2>
            </Col>
            <Col flex="auto">
              {width > 600 && (
                <Nav
                  mode="horizontal"
                  styles={{
                    lineHeight: headerHeight,
                    float: 'right',
                  }}
                />
              )}
              {width <= 600 && <Humberger showDrawer={showDrawer} setShowDrawer={setShowDrawer} />}
            </Col>
          </Row>
          <div className="logo"></div>
        </Header>

        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={() => setShowDrawer(false)}
          visible={showDrawer}
          style={{
            top: headerHeight,
          }}
        >
          <Nav mode="vertical" handleClick={navOnClick} styles={{}} />
        </Drawer>
      </>
    );
  }, [showDrawer, width, headerHeight, toggle]);
};

const Humberger: React.FC<HumbergerProps> = ({ showDrawer, setShowDrawer }) => {
  return (
    <div style={{ float: 'right' }}>
      {!showDrawer && <MenuOutlined onClick={() => setShowDrawer(true)} />}
      {showDrawer && <CloseOutlined onClick={() => setShowDrawer(false)} />}
    </div>
  );
};

export default Header;
