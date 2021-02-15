import { Menu } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { CategoryDetail } from '../../types/categories';

export interface NavProps {
  mode?: 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline' | undefined;
  styles: object;
  categories: { [key: string]: CategoryDetail } | undefined;
  setShowDrawer?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav = ({ mode, styles, categories, setShowDrawer }: NavProps) => {
  const { SubMenu } = Menu;

  const handleClick = () => {
    if (setShowDrawer) {
      setShowDrawer(false);
    }
  }
  return (
    <>
      <Menu mode={mode} selectedKeys={['1']} style={styles}>
        <SubMenu
          title="Category"
          data-testid="nav-sub-menu-category"
        >
          {categories && Object.keys(categories).map(key => {
            return <Menu.Item key={`nav-category-${key}`}><NavLink data-testid={`nav-category-${categories[key].slug}`} onClick={handleClick} to={`/categories/${categories[key].slug}`}>{categories[key].name}</NavLink></Menu.Item>
          })}
        </SubMenu>
        <Menu.Item>
          <NavLink onClick={handleClick} to="/about">About me</NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default Nav;
