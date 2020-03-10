import React from 'react';
import { Layout } from 'antd';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Index from './pages/Index';
import Header from './components/common/Header';
// import 'antd/dist/antd.css';

import './less/app.less';

function App() {
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
