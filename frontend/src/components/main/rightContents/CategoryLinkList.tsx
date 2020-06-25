import React from 'react';
import { Link } from 'react-router-dom';

import { CategoryLinkListProps } from '../../../types/rightContents';
import RightContentSection from './RightContentSection';

const CategoryLinkList: React.FC<CategoryLinkListProps> = ({ categories }) => {
  return (
    <>
      {categories && <RightContentSection title="Categories">
        <ul className="right-contents-list">
          {categories.map((value, index) => {
            return (<Link key={index} to={`/categories/${value.slug}`}><li className="right-contents-list__item">{value.name}</li></Link>)
          })}
        </ul>
      </RightContentSection>}
    </>
  )
}

export default CategoryLinkList;
