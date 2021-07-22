import React from 'react';

import { MainContext } from '../../../context/mainContext';
import AboutMe from '../rightContents/AboutMe';
import CategoryLinkList from '../rightContents/CategoryLinkList';
import PostSearchInput from '../rightContents/PostSearchInput';
import RecentPostList from '../rightContents/RecentPostList';
import { RightVerticalAds } from '../rightContents/RightVerticalAds';
import TagLinkList from '../rightContents/TagLinkList';

const RightContainer: React.FC = () => {
  const [{ init }] = React.useContext(MainContext);
  return (
    <>
      <RightVerticalAds />
      <AboutMe author={init?.author} />
      <PostSearchInput />
      <RecentPostList posts={init?.recentPosts} />
      <CategoryLinkList categories={init?.categories} />
      <TagLinkList tags={init?.tags} />
    </>
  );
};

export default RightContainer;
