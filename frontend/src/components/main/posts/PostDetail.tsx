import '../../../less/main/posts/postDetail.less';

import { Divider } from 'antd';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useHistory } from 'react-router-dom';

import { MainContext } from '../../../context/mainContext';
import { PostDetailProps } from '../../../types/posts';
import MarkdownContent from '../../common/MarkdownContent';
import { GoogleAds } from '../ads/GoogleAds';
import SnsShare from '../SNS/Share';
import EntryData from './EntryData';

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  const [{ init }] = React.useContext(MainContext);
  const history = useHistory();
  return React.useMemo(() => {
    return (
      <>
        <article className="post-detail">
          <h1 className="post-detail__title" data-testid='post-detail-title'>{post.title}</h1>
          <EntryData post={post} showUpdateAt={true} showCategory={true} showTag={true} />
          {post.cover_media && post.cover_media.cover &&
            <LazyLoadImage
              alt={post.title}
              data-testid="post-detail-cover"
              className="post-detail__cover"
              src={post.cover_media.cover}
              style={{ marginRight:"30px" }}
            />
          }
          
          <SnsShare title={post.title} url={init?.url + history.location.pathname} />
          <GoogleAds
            client={process.env.REACT_APP_GOOGLE_ADS_CLIENT}
            slot={process.env.REACT_APP_GOOGLE_ADS_SLOG_POST_TOP_RECTANGLE}
            format="rectangle"
            style={{display:"block", width:"300px", height: "250px"}}
            responsive={false}
          />
          <MarkdownContent name="post-detail" content={post.content} />
          <Divider orientation="right" style={{marginBottom: 60}}>
            <SnsShare title={post.title} url={init?.url + history.location.pathname} />
          </Divider>

          <GoogleAds
            client={process.env.REACT_APP_GOOGLE_ADS_CLIENT}
            slot={process.env.REACT_APP_GOOGLE_ADS_SLOT_POST_TOP_HORIZONAL}
            format="auto"
          />
        </article>
      </>
    );
  }, [post, init, history])
};


export default PostDetail;
