import 'moment/locale/ja';
import '../../less/AntDesign/calendar.less';

import { Calendar } from 'antd';
import moment from 'moment';
import React from 'react';

moment.locale('ja');

const Dashboard = () => {
  const onPanelChange = (value: any, mode: any) => {

  }
  return (
    <>
      <h4>At the moment, This is just a calendar</h4>
      <Calendar onPanelChange={onPanelChange} />
    </>
  );
};

export default Dashboard;
