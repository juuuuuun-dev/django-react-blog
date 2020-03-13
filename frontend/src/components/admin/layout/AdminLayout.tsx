import React from 'react';
import Header from '../Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../../../pages/admin/Login';
import Articles from '../../../pages/Articles';

export interface MainLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: MainLayoutProps) => {
  console.log('adminLayout');
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/admin/login" component={Login} />
        {/* <Route exact path="/articles" component={Articles} /> */}
      </Switch>
    </>
  );
};

export default AdminLayout;
