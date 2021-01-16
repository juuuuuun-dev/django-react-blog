import { Skeleton } from 'antd';
import React from 'react';

const temporaryPostDetail: React.FC = () => {
  return (
    <>
      <Skeleton active />
      <br />
      <Skeleton.Image />
      <br />
      <Skeleton active />
      <Skeleton active />
    </>
  )
}

export default temporaryPostDetail