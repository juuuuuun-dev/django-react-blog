import React from 'react';
import Header from '../Header';
import { Route, Switch } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Dashboard from '../../../pages/admin/Dashboard';
import Login from '../../../pages/admin/Login';
import "../../../less/layout/admin.less"
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  FormOutlined,
} from '@ant-design/icons';

export interface MainLayoutProps {
  children: React.ReactNode;
  match: any
}

const AdminLayout = () => {
  console.log('adminLayout');
  const { Sider, Content } = Layout;
  const [collapsed, setcCollapsed] = React.useState(false)
  return (
    <>
      <Header />
      <div className="contents">
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          width="150"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}>
          <div className="logo" />
          <Menu theme="dark" style={{ background: "#3f3f3f" }} mode="inline" defaultSelectedKeys={['1']}>
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

        <Switch>
          <Route path="/admin/dashboard" component={Dashboard} />
          <Route path="/admin/login" component={Login} />
        </Switch>
      </div>
    </>
  );
};

export default AdminLayout;
