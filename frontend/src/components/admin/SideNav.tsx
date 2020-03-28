import React from 'react';
import { Menu, Layout, Popover, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { get } from 'local-storage';
import { navList } from '../../config/admin';
import { AdminContext, logout } from '../../context/adminContext';
import { useHistory } from 'react-router-dom';

import { UserOutlined } from '@ant-design/icons';

export interface NavProps {
  background: string;
}

const SideNav = ({ background }: NavProps) => {
  const { Sider } = Layout;
  const { state, dispatch } = React.useContext(AdminContext);
  const username: string = get('username');
  const history = useHistory();
  return (
    <>
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        trigger={null}
        width="150"
        style={{ background: background }}
        onBreakpoint={broken => {
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
        <Popover content={<a onClick={() => logout(history)}>Logout</a>} placement="bottom" trigger="click">
          <div className="username">
            <Avatar size="small" icon={<UserOutlined />} />
            <span className="username__text">{username}</span>
          </div>
        </Popover>
        <Menu theme="dark" style={{ background: background }} mode="inline" defaultSelectedKeys={['1']}>
          {navList.map((item, index) => {
            if (!item.hiddenNav) {
              return (
                <Menu.Item key={index}>
                  <Link to={item.path}>{item.title}</Link>
                </Menu.Item>
              );
            }
          })}
        </Menu>
      </Sider>
    </>
  );
};

export default SideNav;
