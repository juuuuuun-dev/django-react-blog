import { Menu } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { CategoryDetail } from '../../types/categories';

export interface NavProps {
  mode?: 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline' | undefined;
  styles: object;
  categories: CategoryDetail[] | undefined;
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
          title={
            <span className="submenu-title-wrapper">
              Category
            </span>
          }
        >
          {categories?.map((value, index) => {
            return <Menu.Item key={`nav-category-${index}`}><NavLink onClick={handleClick} to={`/categories/${value.slug}`}>{value.name}</NavLink></Menu.Item>
          })}
        </SubMenu>
        <Menu.Item>
          <NavLink to="/about">About me</NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default Nav;
