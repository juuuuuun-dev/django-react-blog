import React from 'react';
import { Route } from 'react-router-dom';
import { navList } from '../../../config/admin';

const RouteContentList = navList.map(item => (
  <Route path={item.path}>
    <item.component />
  </Route>
));

export default RouteContentList;
