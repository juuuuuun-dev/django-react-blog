import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { ApartmentOutlined } from '@ant-design/icons';

export interface NavProps {
  mode?: 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline' | undefined;
  styles: object;
  handleClick?: () => void;
}

const Nav = ({ mode, styles, handleClick }: NavProps) => {
  const { SubMenu } = Menu;
  console.log('nav');
  return (
    <>
      <Menu mode={mode} defaultSelectedKeys={['1']} style={styles}>
        <Menu.Item>
          <Link to="/">Top</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/articles">Articles</Link>
        </Menu.Item>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <ApartmentOutlined />
              Category
            </span>
          }
        >
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item>
          <Link to="/admin/login">Login</Link>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default Nav;
