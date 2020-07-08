import React from 'react';
import { NavLink } from 'react-router-dom';

import { CategoryLinkListProps } from '../../../types/rightContents';
import RightContentSection from './RightContentSection';

const CategoryLinkList: React.FC<CategoryLinkListProps> = ({ categories }) => {
  return (
    <>
      {categories && <RightContentSection title="Categories">
        <ul className="right-contents-list" data-testid="right-contents-category-link-list">
          {categories.map((value, index) => {
            return (<NavLink style={{ color: "" }} key={index} to={`/categories/${value.slug}`} data-testid={`right-contents-category-link-${value.slug}`}><li className="right-contents-list__item">{value.name}</li></NavLink>)
          })}
        </ul>
      </RightContentSection>}
    </>
  )
}

export default CategoryLinkList;
