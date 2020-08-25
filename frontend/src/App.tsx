import './less/app.less';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import AdminLayout from './components/admin/layout/AdminLayout';
import ScrollToTop from './components/common/ScrollToTop';
import ErrorLayout from './components/error/layout/ErrorLayout';
import LoginLayout from './components/login/layout/LoginLayout';
import MainLayout from './components/main/layout/MainLayout';
import { adminPathList } from './config/admin';
import { mainPathList } from './config/main';
import { AdminContextProvider } from './context/adminContext';
import { MainContextProvider } from './context/mainContext';

function App() {
  return (
    <div className="App">
      <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
          <ScrollToTop />
          <Switch>
            <Route exact path={adminPathList}>
              <AdminContextProvider>
                <AdminLayout />
              </AdminContextProvider>
            </Route>
            <Route exact path={mainPathList}>
              <MainContextProvider>
                <MainLayout />
              </MainContextProvider>
            </Route>
            <Route path={['/login', '/password-reset', '/password-reset-confirm/:uid/:token/']}>
              <LoginLayout />
            </Route>
            <Route>
              <ErrorLayout />
            </Route>
          </Switch>
        </QueryParamProvider>
      </Router>
    </div>
  );
}

export default App;
