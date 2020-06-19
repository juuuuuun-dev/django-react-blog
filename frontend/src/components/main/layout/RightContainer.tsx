import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { MainContext } from '../../../context/mainContext';
import CategoryLinkList from '../rightContents/CategoryLinkList';
import PostSearchInput from '../rightContents/PostSearchInput';

const RightContainer: React.FC = () => {
  const [{ init }, dispatch] = React.useContext(MainContext);
  console.log({ init })

  return (
    <>
      <LazyLoadImage
        alt="test"
        width={"100%"}
        src={`/assets/images/right.jpg`}
        style={{ marginBottom: 30 }}
      />
      <PostSearchInput />
      <CategoryLinkList categories={init?.categories} />
      <CategoryLinkList categories={init?.categories} />
    </>
  )
}

export default RightContainer;