import React from 'react';
import Header from '../Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from '../../../pages/Index';
import Articles from '../../../pages/Articles';

export interface MainLayoutProps {
  match: any
}

const MainLayout = () => {
  console.log('MainLayout');
  return (
    <>
      <Header />
      <div className="contents">
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/articles" component={Articles} />
        </Switch>
      </div >
    </>
  );
};

export default MainLayout;
