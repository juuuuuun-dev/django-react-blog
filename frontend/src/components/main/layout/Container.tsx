import React from 'react';
import { Route } from 'react-router-dom';
import { navList } from '../../../config/main';
import { Spin } from 'antd';
import { MainContext } from '../../../context/mainContext';

const RouteContentList = navList.map((item, index) => (
  <Route path={item.path} exact={item.exact} key={index} >
    <item.component />
    {/* <div className="container" >
      <h3 className="container__h3" > {item.title} </h3>
      <item.component />
    </div> */}
  </Route>
));

const Container = () => {
  const { state } = React.useContext(MainContext);
  return (
    <Spin spinning={state.loading} tip="Loading..." >
      {RouteContentList}
    </Spin>
  );
};

export default Container
