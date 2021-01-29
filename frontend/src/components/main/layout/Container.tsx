import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';

import { navList } from '../../../config/main';
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
        <Suspense fallback={<div></div>}>
          {RouteContentList}
        </Suspense>
      </Spin>
    );
  }, [loading]);
};

export default Container
