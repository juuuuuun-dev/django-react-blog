import React from 'react';
import { Layout } from 'antd';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainLayout from './components/main/layout/MainLayout';
import AdminLayout from './components/admin/layout/AdminLayout';
import Login from './pages/admin/Login';

// import 'antd/dist/antd.css';

import './less/app.less';

function App() {
    return (
        <div className="App">
            <Layout>
                <Router>
                    {/* <Switch> */}
                    <Route exact path={["/", "/articles"]} component={MainLayout} />
                    <Route exact path={["/admin", "/admin/login"]} component={AdminLayout}>
                        {/* <Route path="/" component={Login} /> */}
                    </Route>
                    {/* </Switch> */}
                    {/* <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/admin/home" component={AdminHome} />
          </Switch> */}
                </Router>
            </Layout>
        </div>
    );
}

export default App;
