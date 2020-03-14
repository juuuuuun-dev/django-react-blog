import React from 'react';
import { Layout } from 'antd';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainLayout from './components/main/layout/MainLayout';
import AdminLayout from './components/admin/layout/AdminLayout';

// import 'antd/dist/antd.css';

import './less/app.less';

function App() {
  return (
    <div className="App">

      <Layout>
        <Router>
          <Switch>
            <Route exact path={["/", "/articles"]}>
              <MainLayout />
            </Route>
            <Route exact path={["/admin/dashboard", "/admin/login"]}>
              <AdminLayout />
            </Route>
          </Switch>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
