import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const RightContainer = () => {
  return (
    <LazyLoadImage
      alt="test"
      width={"100%"}
      src={`/assets/images/right.jpg`}
    />
  )
}

export default RightContainer;