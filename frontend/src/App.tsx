import 'antd/dist/antd.less';
import './less/app.less';

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import ScrollToTop from './components/common/ScrollToTop';
import MainLayout from './components/main/layout/MainLayout';
import { adminPathList } from './config/admin';
import { mainPathList } from './config/main';
import { AdminContextProvider } from './context/adminContext';
import { MainContextProvider } from './context/mainContext';

const AdminLayout = React.lazy(() => import('./components/admin/layout/AdminLayout'));
const LoginLayout = React.lazy(() => import('./components/login/layout/LoginLayout'));
const ErrorLayout = React.lazy(() => import('./components/error/layout/ErrorLayout'));
function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  );
}

export default App;
