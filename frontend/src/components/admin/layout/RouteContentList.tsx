import React from 'react';
import { Route } from 'react-router-dom';
import { navList } from '../../../config/admin';

const RouteContentList = navList.map((item, index) => (
  <Route path={item.path} key={index}>
    <div className="container">
      <h3>{item.title}</h3>
      <item.component />
    </div>
  </Route>
));

export default RouteContentList;
