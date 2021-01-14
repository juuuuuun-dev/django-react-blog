import { Col, Layout, Row } from 'antd';
import React from 'react';

import { MenuOutlined } from '@ant-design/icons';

import { AdminContext } from '../../context/adminContext';
import { HeaderProps } from '../../types/components/admin/header';
import HeaderNav from './HeaderNav';

const Header: React.FC<HeaderProps> = ({ headerHeight }) => {
  const { Header } = Layout;
  const dispatch = React.useContext(AdminContext)[1];
  const toggle = React.useCallback(() => {
    dispatch({ type: 'SIDER_TOGGLE' });
  }, [dispatch]);
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
              <HeaderNav />
            </Col>
          </Row>
          <div className="logo"></div>
        </Header>
      </>
    );
  }, [headerHeight, toggle]);
};

export default Header;
