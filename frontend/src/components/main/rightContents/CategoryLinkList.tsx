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
            return (<li className="right-contents-list__item"><NavLink className="right-contents-list__item-link" title={categories[key].name} key={key} to={`/categories/${categories[key].slug}`} data-testid={`right-contents-category-link-${categories[key].slug}`}>{categories[key].name}</NavLink></li>)
          })}

        </ul>
      </RightContentSection>}
    </>
  )
}

export default CategoryLinkList;
