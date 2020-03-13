import React from 'react';
import Header from '../Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from '../../../pages/Index';
import Articles from '../../../pages/Articles';

export interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  console.log('MainLayout');
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/articles" component={Articles} />
      </Switch>
    </>
  );
};

export default MainLayout;
