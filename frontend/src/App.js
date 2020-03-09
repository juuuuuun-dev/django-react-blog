import React from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Login from "./components/pages/Login"
import Index from "./components/pages/Index"
import 'antd/dist/antd.css'

function App() {
  const { Header, Footer, Sider, Content } = Layout;

  return (
    <div className="App">
      <Header theme="white" className="site-layout-background">
        <div className="logo"></div>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Router>
        <Link to="/">Top</Link>
        <Link to="/login">Login</Link>
        <Switch>
          <Content style={{ margin: '24px 16px 0' }}>
            <Route exact path='/' component={Index} />
            <Route exact path='/login' component={Login} />
          </Content>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
