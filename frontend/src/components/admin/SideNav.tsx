import React from 'react';
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { AdminContext } from '../../context/adminContext';

import { VideoCameraOutlined, UploadOutlined, FormOutlined } from '@ant-design/icons';

export interface NavProps {
  background: string;
}

const SideNav = ({ background }: NavProps) => {
  const { Sider } = Layout;
  const { state, dispatch } = React.useContext(AdminContext);
  console.log('nav');
  return (
    <>
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        trigger={null}
        width="150"
        style={{ background: background }}
        onBreakpoint={broken => {
          console.log({ broken });
          if (broken) {
            dispatch({ type: 'SIDER_HIDE' });
          } else {
            dispatch({ type: 'SIDER_SHOW' });
          }
        }}
        // state
        collapsed={!state.isSiderShow}
        onCollapse={(collapsed, type) => {
          // callback
          console.log(collapsed, type);
        }}
      >
        <div className="logo">Admin</div>
        <Menu theme="dark" style={{ background: background }} mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <FormOutlined />
            <span>Articles</span>
          </Menu.Item>
          <Menu.Item key="2">
            <VideoCameraOutlined />
            <span>nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <UploadOutlined />
            <span>nav 3</span>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default SideNav;
