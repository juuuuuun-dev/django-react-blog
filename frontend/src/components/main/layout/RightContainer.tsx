import React from 'react';

import { MainContext } from '../../../context/mainContext';
import { GoogleAds } from '../ads/GoogleAds';
import AboutMe from '../rightContents/AboutMe';
import CategoryLinkList from '../rightContents/CategoryLinkList';
import PostSearchInput from '../rightContents/PostSearchInput';
import RecentPostList from '../rightContents/RecentPostList';
import TagLinkList from '../rightContents/TagLinkList';

const RightContainer: React.FC = () => {
  const [{ init }] = React.useContext(MainContext);
  return (
    <>
      <GoogleAds client={process.env.REACT_APP_GOOGLE_ADS_CLIENT} slot={process.env.REACT_APP_GOOGLE_ADS_SLOT_RIGHT} />
      <AboutMe author={init?.author} />
      <PostSearchInput />
      <RecentPostList posts={init?.recentPosts} />
      <CategoryLinkList categories={init?.categories} />
      <TagLinkList tags={init?.tags} />
    </>
  );
};

export default RightContainer;
