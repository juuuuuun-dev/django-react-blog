import React from 'react';
import { Card } from 'antd';
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';

interface IProps {
  title: string;
  cover: string;
  description: string;
  category: {
    id: number,
    name: string
  }
}

const PostListItem: React.FC<IProps> = ({ title, cover, description, category }) => {
  const { Meta } = Card;

  return (
    <>
      <div className="post">
        <LazyLoadComponent>
          <Card
            hoverable
            style={{ width: "100%" }}
            cover={<img alt="test" src="/assets/images/photo-1436397543931-01c4a5162bdb-750x460.jpg" />}
          >
            <Meta
              title={title}
              description=" Wes Anderson banjo you probably haven’t heard of them cred, XOXO deep v kale chips Kickstarter viral. Swag meggings jean shorts chillwave seitan disrupt. Meditation flexitarian authentic organic, you probably haven’t heard of them taxidermy fap pop-up. Trust fund Tumblr Schlitz Banksy Austin squid. Paleo wayfarers twee ugh Sartorial street art gastropub pork belly tofu […]"
            />

          </Card>
        </LazyLoadComponent>
      </div>
    </>
  );
};


export default PostListItem;
