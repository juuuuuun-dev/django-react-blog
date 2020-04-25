import React from 'react';
import { Calendar } from 'antd';

const Dashboard = () => {
  const onPanelChange = (value: any, mode: any) => {

  }
  return (
    <>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
      <br />
    </>
  );
};

export default Dashboard;
