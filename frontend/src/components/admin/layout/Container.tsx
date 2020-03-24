import React from 'react';
import { Route } from 'react-router-dom';
import { navList } from '../../../config/admin';
import { Spin } from 'antd';
import { AdminContext } from '../../../context/adminContext';

const RouteContentList = navList.map((item, index) => (
  <Route path={item.path} key={index}>
    <div className="container">
      <h3 className="container__h3">{item.title}</h3>
      <item.component />
    </div>
  </Route>
));

const Container = () => {
  const { state, dispatch } = React.useContext(AdminContext);
  const [now, setNow] = React.useState(new Date());
  // @todo refresh
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
      console.log('setInt');
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, [now]);
  return (
    <Spin spinning={state.loading} tip="Loading...">
      {RouteContentList}
    </Spin>
  );
};

export default Container;
