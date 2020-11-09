import { Layout, Menu } from 'antd';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { groupNavList, navList } from '../../config/admin';
import { AdminContext } from '../../context/adminContext';
import SideNavAvator from './SideNavAvator';

const SideNav = () => {
  const { Sider } = Layout;
  const { SubMenu } = Menu;
  const [{ isSiderShow }, dispatch] = React.useContext(AdminContext);
  const history = useHistory();
  const pathname = history.location.pathname;

  const curretSelectedKey = React.useMemo(() => {
    const [res] = navList.filter(value => value.path === pathname);
    let id = '';
    if (res && res.id) {
      id = res.id;
    } else if (res && res.parentId) {
      id = res.parentId;
    }
    let keyIndex = 0;
    navList.forEach((value, index) => {
      if (value.id === id) {
        keyIndex = index;
        return
      };
    })
    return keyIndex.toString();
  }, [pathname]);


  return React.useMemo(() => {
    return <>
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        trigger={null}
        width="200"
        onBreakpoint={broken => {
          if (broken) {
            dispatch({ type: 'SIDER_HIDE' });
          } else {
            dispatch({ type: 'SIDER_SHOW' });
          }
        }}
        collapsed={!isSiderShow}
      >
        <SideNavAvator />
        <Menu theme="dark" mode="inline" selectedKeys={[curretSelectedKey]}>
          {navList.map((item, index) => {
            if (!item.hiddenNav && !item.group) {
              return (
                <Menu.Item key={index} icon={item.icon ? <item.icon /> : null}>
                  <Link data-testid={`side-nav-${item.id}`} to={item.path}>{item.title}</Link>
                </Menu.Item>
              );
            }
            return null
          })}
          {/* group nav */}
          {groupNavList.map((gItem, gIndex) => {
            return (
              <SubMenu key={gItem.id} title={gItem.title} icon={gItem.icon ? <gItem.icon /> : null}>
                {navList.map((item, index) => {
                  if (gItem.id == item.group) {
                    return (
                      <Menu.Item key={index}>
                        <Link data-testid={`side-nav-${item.id}`} to={item.path}>{item.title}</Link>
                      </Menu.Item>
                    );
                  }
                })}
              </SubMenu>
            )
          })}
        </Menu>
      </Sider>
    </>
  }, [isSiderShow, curretSelectedKey, dispatch])
};

export default SideNav;
