import React from 'react';
import Header from '../Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../../../pages/admin/Login';
import Articles from '../../../pages/Articles';

export interface MainLayoutProps {
    children: React.ReactNode;
    match: any
}

const AdminLayout = ({ children, match }: MainLayoutProps) => {
    console.log('adminLayout');
    console.log(match)
    return (
        <>
            <Header />
            <Switch>
                <Route exact path="/admin/login" component={Login} />
            </Switch>
        </>
    );
};

export default AdminLayout;
