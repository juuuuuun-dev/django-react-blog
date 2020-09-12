import React from 'react';
import { NavLink } from 'react-router-dom';

import { CategoryLinkListProps } from '../../../types/components/main/rightContents';
import RightContentSection from './RightContentSection';

const CategoryLinkList: React.FC<CategoryLinkListProps> = ({ categories }) => {
  return (
    <>
      {categories && <RightContentSection title="Categories">
        <ul className="right-contents-list" data-testid="right-contents-category-link-list">
          {categories && Object.keys(categories).map(key => {
            return (<NavLink style={{ color: "" }} key={key} to={`/categories/${categories[key].slug}`} data-testid={`right-contents-category-link-${categories[key].slug}`}><li className="right-contents-list__item">{categories[key].name}</li></NavLink>)
          })}
          {/* {categories.map((value, index) => {
            return (<NavLink style={{ color: "" }} key={index} to={`/categories/${value.slug}`} data-testid={`right-contents-category-link-${value.slug}`}><li className="right-contents-list__item">{value.name}</li></NavLink>)
          })} */}
        </ul>
      </RightContentSection>}
    </>
  )
}

export default CategoryLinkList;
