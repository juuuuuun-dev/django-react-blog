import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import PostSearchInput from '../PostSearchInput';

const RightContainer: React.FC = () => {

  return (
    <>
      <LazyLoadImage
        alt="test"
        width={"100%"}
        src={`/assets/images/right.jpg`}
        style={{ marginBottom: 30 }}
      />
      <PostSearchInput />
    </>
  )
}

export default RightContainer;