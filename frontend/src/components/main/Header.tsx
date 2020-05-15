import React from 'react';
import { Layout, Drawer, Row, Col } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { useWindowSize } from '@react-hook/window-size';
import Nav from './Nav';

const Header: React.FC = () => {
  const headerHeight = '60px';
  const { Header } = Layout;
  const [showDrawer, setShowDrawer] = React.useState<boolean>(false);
  const [width] = useWindowSize();

  const navOnClick = (): void => { };
  return (
    <>
      <Header
        style={{
          height: headerHeight,
          background: '#ffffff',
          boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.05)",
          // position: 'fixed',
          // top: 0,
          // left: 0,
          // width: '100%'
        }}
      >
        <div className="header-container">
          <Row>
            <Col flex="100px">Logo</Col>
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
        </div>
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
