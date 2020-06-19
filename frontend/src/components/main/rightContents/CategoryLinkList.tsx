import React from 'react';
import { Link } from 'react-router-dom';

import { CategoryDetail } from '../../../types/categories';

type props = {
  categories: CategoryDetail[] | undefined
}
const CategoryLinkList: React.FC<props> = ({ categories }) => {
  return (
    <>
      {categories && <div className="right-contents-section">
        <h3 className="right-contents-section__title">Categories</h3>
        <ul className="right-contents-list">
          {categories.map((value, index) => {
            return (<Link key={index} to={`/categories/${value.slug}`}><li className="right-contents-list__item">{value.name}</li></Link>)
          })}
        </ul>
      </div>}
    </>
  )
}

export default CategoryLinkList;
