import React from 'react';
import { Layout } from 'antd';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainLayout from './components/main/layout/MainLayout';
import AdminLayout from './components/admin/layout/AdminLayout';
import LoginLayout from './components/login/layout/LoginLayout';
import { adminPathList } from './config/admin';

import './less/app.less';

function App() {


  return (
    <div className="App">
      <Layout>
        <Router>
          <Switch>
            <Route exact path={['/', '/articles']}>
              <MainLayout />
            </Route>
            <Route exact path={adminPathList}>
              <AdminLayout />
            </Route>
            <Route path={['/login', '/password-reset', '/password-reset-confirm/:uid/:token/']}>
              <LoginLayout />
            </Route>
          </Switch>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
