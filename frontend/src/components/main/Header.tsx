import { Col, Drawer, Layout, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { useWindowSize } from '@react-hook/window-size';

import { MainContext } from '../../context/mainContext';
import Nav from './Nav';

const Header: React.FC = () => {
  const [{ init, appTitle }] = React.useContext(MainContext);
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

        }}
      >
        <div className="header-container">
          <Row>
            <Col flex="100px"><Link to="/"><div>{appTitle}</div></Link></Col>
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
};

export interface HumbergerProps {
  showDrawer: boolean;
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}
const Humberger = ({ showDrawer, setShowDrawer }: HumbergerProps) => {
  return (
    <div className="humberger">
      {!showDrawer && <div className="humberger-button" onClick={() => setShowDrawer(true)}><MenuOutlined className="humberger-button__icon" /></div>}
      {showDrawer && <div className="humberger-button" onClick={() => setShowDrawer(false)}><CloseOutlined className="humberger-button__icon" /></div>}
    </div>
  );
};

export default Header;
