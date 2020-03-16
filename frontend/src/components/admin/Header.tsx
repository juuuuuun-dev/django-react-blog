import React from 'react';
import { Layout, Drawer, Row, Col } from 'antd';
import { useWindowSize } from '@react-hook/window-size';
import { AdminContext } from '../../context/adminContext';
import { MenuUnfoldOutlined, MenuFoldOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import Nav from './Nav';

export interface HeaderProps {
  headerHeight: string;
}

const Header = ({ headerHeight }: HeaderProps) => {
  const { Header } = Layout;
  const [showDrawer, setShowDrawer] = React.useState<boolean>(false);
  const [width] = useWindowSize();
  const { state, dispatch } = React.useContext(AdminContext);
  const toggle = () => {
    dispatch({
      type: 'SIDER_TOGGLE',
    });
  };
  const navOnClick = (): void => {
    console.log('click');
  };
  return (
    <>
      <Header
        style={{
          height: headerHeight,
          background: '#ffffff',
          padding: '0 20px',
          // position: 'fixed',
          // top: 0,
          // left: 0,
          // width: '100%'
        }}
      >
        <Row>
          <Col flex="30px" style={{ fontSize: '18px', lineHeight: headerHeight }}>
            {React.createElement(state.isSiderShow ? MenuFoldOutlined : MenuUnfoldOutlined, {
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
};

export interface HumbergerProps {
  showDrawer: boolean;
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}
const Humberger = ({ showDrawer, setShowDrawer }: HumbergerProps) => {
  return (
    <div style={{ float: 'right' }}>
      {!showDrawer && <MenuOutlined onClick={() => setShowDrawer(true)} />}
      {showDrawer && <CloseOutlined onClick={() => setShowDrawer(false)} />}
    </div>
  );
};

export default Header;
