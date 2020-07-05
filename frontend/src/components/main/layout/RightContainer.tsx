import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useParams } from 'react-router-dom';

import { MainContext } from '../../../context/mainContext';
import AboutMe from '../rightContents/AboutMe';
import CategoryLinkList from '../rightContents/CategoryLinkList';
import PostSearchInput from '../rightContents/PostSearchInput';
import RecentPostList from '../rightContents/RecentPostList';
import TagLinkList from '../rightContents/TagLinkList';

const RightContainer: React.FC = () => {
  const [{ init }, dispatch] = React.useContext(MainContext);
  console.log({ init })
  const { slug } = useParams();
  return (
    <>
      <div className="right-contents-section">
        <LazyLoadImage
          alt="test"
          width={"100%"}
          src={`/assets/images/right.jpg`}
        />
      </div>
      <AboutMe author={init?.author} />
      <PostSearchInput />
      <RecentPostList posts={init?.recentPosts} />
      <CategoryLinkList categories={init?.categories} slug={slug} />
      <TagLinkList tags={init?.tags} slug={slug} />
    </>
  )
}

export default RightContainer;