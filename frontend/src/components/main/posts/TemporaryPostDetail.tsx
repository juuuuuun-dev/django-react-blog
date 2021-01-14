import { Skeleton } from 'antd';
import React from 'react';

const temporaryPostDetail: React.FC = () => {
  return (
    <>
      <Skeleton />
      <br />
      <Skeleton.Image />
      <br />
      <Skeleton />
      <Skeleton />
    </>
  )
}

export default temporaryPostDetail