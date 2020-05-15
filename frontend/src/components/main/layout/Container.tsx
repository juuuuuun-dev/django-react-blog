import React from 'react';
import { Route } from 'react-router-dom';
import { navList } from '../../../config/main';
import { Spin } from 'antd';
import { MainContext } from '../../../context/mainContext';

const RouteContentList = navList.map((item, index) => (
  <Route path={item.path} exact={item.exact} key={index} >
    <item.component />
  </Route>
));

const Container = () => {
  const [{ loading }] = React.useContext(MainContext);
  return React.useMemo(() => {
    return (
      <Spin spinning={loading} tip="Loading..." >
        {RouteContentList}
      </Spin>
    );
  }, [loading]);
};

export default Container
