import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { MainContext } from '../../../context/mainContext';
import CategoryLinkList from '../rightContents/CategoryLinkList';
import PostSearchInput from '../rightContents/PostSearchInput';
import RecentPostList from '../rightContents/RecentPostList';
import TagLinkList from '../rightContents/TagLinkList';

const RightContainer: React.FC = () => {
  const [{ init }, dispatch] = React.useContext(MainContext);
  console.log({ init })

  return (
    <>
      <div className="right-contents-section">
        <LazyLoadImage
          alt="test"
          width={"100%"}
          src={`/assets/images/right.jpg`}
        />
      </div>
      <PostSearchInput />
      <RecentPostList posts={init?.recentPosts} />
      <CategoryLinkList categories={init?.categories} />
      <TagLinkList tags={init?.tags} />
    </>
  )
}

export default RightContainer;