import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { TagLinkListProps } from '../../../types/components/main/rightContents';
import { Tag } from '../../common/Tag';
import RightContentSection from './RightContentSection';

const TagLinkList: React.FC<TagLinkListProps> = ({ tags }) => {
  const { slug } = useParams();

  return (
    <>
      {tags && <RightContentSection title="Tags">
        <div data-testid="right-contents-tag-link-list">
          {tags.map((value, index) => {
            let active = false;
            if (value.slug === slug) {
              active = true
            }
            return (<Tag key={index} active={active}><Link data-testid={`right-contents-tag-link-${value.slug}`} to={`/tags/${value.slug}`}>{value.name}</Link></Tag>)
          })}
        </div>
      </RightContentSection>}
    </>
  )
}

export default TagLinkList;
