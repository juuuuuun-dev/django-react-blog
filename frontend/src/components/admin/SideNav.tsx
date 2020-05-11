import React from 'react';
import { Menu, Layout, Popover, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { get } from 'local-storage';
import { navList } from '../../config/admin';
import { AdminContext } from '../../context/adminContext';
import { logout } from '../../service/admin/auth';
import { useHistory } from 'react-router-dom';

import { UserOutlined } from '@ant-design/icons';

export interface NavProps {
  background: string;
}

const SideNav = ({ background }: NavProps) => {
  console.log("SideNav");
  const { Sider } = Layout;
  const { state, dispatch } = React.useContext(AdminContext);
  const username: string = get('username');
  const thumb: string = get('thumb');
  const history = useHistory();
  // @todo 配列に
  const [selectedKey, setSelectedKey] = React.useState<string>('0');

  const curretSelectedKey = React.useCallback((): void => {
    const pathname = history.location.pathname;
    navList.forEach((value, index) => {
      if (!value.hiddenNav) {
        const reg = new RegExp(value.path);
        const found = pathname.match(reg);
        if (found) {
          console.log({ index })
          setSelectedKey('1');
          return;
        }
      }
    })
    // setSelectedKey(1);
  }, []);
  React.useEffect(() => {
    curretSelectedKey();
  }, [curretSelectedKey]);
  console.log({ selectedKey })
  return (
    <>
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        trigger={null}
        width="200"
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
        <Popover content={<div style={{ cursor: "pointer" }} onClick={() => logout(history)}>Logout</div>} placement="bottom" trigger="click">
          <div className="username">
            <Avatar size="small" src={thumb} icon={<UserOutlined />} />
            <span className="username__text">{username}</span>
          </div>
        </Popover>
        <Menu theme="dark" style={{ background: background }} mode="inline" defaultSelectedKeys={["0"]}>
          {navList.map((item, index) => {
            if (!item.hiddenNav) {
              return (
                <Menu.Item key={index}>
                  <Link data-testid={`side-nav-${item.id}`} to={item.path}>{item.title}</Link>
                </Menu.Item>
              );
            }
            return null
          })}
        </Menu>
      </Sider>
    </>
  );
};

export default SideNav;
