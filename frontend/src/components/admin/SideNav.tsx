import React from 'react';
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { navList } from '../../config/admin';
import { AdminContext } from '../../context/adminContext';
import { useHistory } from 'react-router-dom';
import SideNavAvator from './SideNavAvator';

const SideNav = ({ background }: { background: string; }) => {
  const { Sider } = Layout;
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
        style={{ background: background }}
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
        <Menu theme="dark" style={{ background: background }} mode="inline" selectedKeys={[curretSelectedKey]}>
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
  }, [isSiderShow, curretSelectedKey, background, dispatch])
};

export default SideNav;
