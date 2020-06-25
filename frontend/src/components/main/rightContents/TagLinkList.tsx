import { Tag } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { TagLinkListProps } from '../../../types/rightContents';
import RightContentSection from './RightContentSection';

const TagLinkList: React.FC<TagLinkListProps> = ({ tags }) => {
  return (
    <>
      {tags && <RightContentSection title="Tags">
        {tags.map((value, index) => {
          return (<Tag key={index}><Link to={`/tags/${value.slug}`}>{value.name}</Link></Tag>)
        })}

      </RightContentSection>}
    </>
  )
}

export default TagLinkList;
