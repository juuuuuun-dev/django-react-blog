import React from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Index from './pages/Index';
import Header from './components/common/Header';
import 'antd/dist/antd.css';

function App() {
  const { Footer, Sider, Content } = Layout;

  return (
    <div className='App'>
      <Layout>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={Index} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
