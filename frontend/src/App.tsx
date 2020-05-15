import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainLayout from './components/main/layout/MainLayout';
import AdminLayout from './components/admin/layout/AdminLayout';
import LoginLayout from './components/login/layout/LoginLayout';
import { adminPathList } from './config/admin';
import { mainPathList } from './config/main';
import { QueryParamProvider } from 'use-query-params';

import './less/app.less';

function App() {
  return (
    <div className="App">
      <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
          <Switch>
            <Route exact path={mainPathList}>
              <MainLayout />
            </Route>
            <Route exact path={adminPathList}>
              <AdminLayout />
            </Route>
            <Route path={['/login', '/password-reset', '/password-reset-confirm/:uid/:token/']}>
              <LoginLayout />
            </Route>
          </Switch>
        </QueryParamProvider>
      </Router>
    </div>
  );
}

export default App;
