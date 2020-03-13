import React from 'react';
import Header from '../Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from '../../../pages/Index';
import Articles from '../../../pages/Articles';

export interface MainLayoutProps {
    children: React.ReactNode;
    match: any
}

const MainLayout = ({ children, match }: MainLayoutProps) => {
    console.log('MainLayout');
    console.log({ match })
    return (
        <>
            <Header />
            <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/articles" component={Articles} />
            </Switch>
        </>
    );
};

export default MainLayout;
