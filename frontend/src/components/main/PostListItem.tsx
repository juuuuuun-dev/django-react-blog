import React from 'react';
import { Card } from 'antd';
import { IPostData } from '../../types/posts'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';

interface IProps {
  post: IPostData;
}

const PostListItem: React.FC<IProps> = ({ post }) => {
  const { Meta } = Card;

  return (
    <>
      <div className="post">
        <Card
          hoverable
          style={{ width: "100%" }}
          cover={
            <LazyLoadImage
              alt="test"
              src={`/assets/images/b01-750x460.jpg`}
            />
          }
        >
          <Meta
            title={post.title}
            description={`${post.created_at} | ${post.category.name} | `}
          />
          Wes Anderson banjo you probably haven’t heard of them cred, XOXO deep v kale chips Kickstarter viral. Swag meggings jean shorts chillwave seitan disrupt. Meditation flexitarian authentic organic, you probably haven’t heard of them taxidermy fap pop-up. Trust fund Tumblr Schlitz Banksy Austin squid. Paleo wayfarers twee ugh Sartorial street art gastropub pork belly tofu […]
        </Card>
      </div>
    </>
  );
};


export default PostListItem;
