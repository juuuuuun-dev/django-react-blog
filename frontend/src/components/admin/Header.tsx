import React from 'react';
import { Layout, Drawer, Row, Col } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { useWindowSize } from '@react-hook/window-size';
import Nav from './Nav';

const Header = () => {
  const headerHeight = '50px';
  const { Header } = Layout;
  const [showDrawer, setShowDrawer] = React.useState<boolean>(false);
  const [width] = useWindowSize();

  const navOnClick = (): void => {
    console.log('click');
  };
  return (
    <>
      <Header
        style={{
          height: headerHeight,
          background: '#333333',
          padding: '0 20px',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%'
        }}
      >
        <Row>
          <Col flex="100px"><h1 className="logo" style={{ lineHeight: headerHeight }}>Admin</h1></Col>
          <Col flex="auto">
            {width > 600 && (
              <Nav
                theme="dark"
                mode="horizontal"
                styles={{
                  lineHeight: headerHeight,
                  float: 'right',
                  background: "#333333"
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
