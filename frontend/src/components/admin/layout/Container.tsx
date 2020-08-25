import { Spin } from 'antd';
import React, { useMemo } from 'react';
import { Route } from 'react-router-dom';

import { navList } from '../../../config/admin';
import { AdminContext } from '../../../context/adminContext';

const RouteContentList = navList.map((item, index) => (
  <Route path={item.path} exact={item.exact} key={index} >
    <div className="container" >
      <h3 className="container__title" data-testid="container-title"> {item.title} </h3>
      <item.component />
    </div>
  </Route>
));

const Container = () => {
  const [{ loading }] = React.useContext(AdminContext);
  return useMemo(() => {
    return (
      <Spin spinning={loading} tip="Loading..." >
        {RouteContentList}
      </Spin>
    );
  }, [loading]);
};

export default Container
