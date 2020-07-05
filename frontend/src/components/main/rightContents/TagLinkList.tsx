import { Tag } from 'antd';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { TagLinkListProps } from '../../../types/rightContents';
import RightContentSection from './RightContentSection';

const TagLinkList: React.FC<TagLinkListProps> = ({ tags, slug }) => {
  console.log({ slug })
  return (
    <>
      {tags && <RightContentSection title="Tags">
        <div data-testid="right-contents-tag-link-list">
          {tags.map((value, index) => {
            let color = '';
            if (value.slug == slug) {
              color = "#444"
            }
            return (<Tag color={color} key={index}><Link data-testid={`right-contents-tag-link-${value.slug}`} to={`/tags/${value.slug}`}>{value.name}</Link></Tag>)
          })}
        </div>
      </RightContentSection>}
    </>
  )
}

export default TagLinkList;
