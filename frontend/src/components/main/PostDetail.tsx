import React from 'react';
import { Card, Typography } from 'antd';
import { IPostData } from '../../types/posts'
import * as Showdown from "showdown";

import { LazyLoadImage } from 'react-lazy-load-image-component';
interface IProps {
  post: IPostData;
}

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const PostDetail: React.FC<IProps> = ({ post }) => {
  const { Meta } = Card;
  const { Paragraph } = Typography;

  return (
    <>
      <div className="post">
        <Card
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
          <div className="content" dangerouslySetInnerHTML={{ __html: converter.makeHtml(post.content) }}></div>
        </Card>
      </div>
    </>
  );
};


export default PostDetail;
