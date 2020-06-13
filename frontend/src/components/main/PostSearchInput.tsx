import { Input } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { StringParam, useQueryParam } from 'use-query-params';

import { SearchOutlined } from '@ant-design/icons';

const PostSearchInput: React.FC = () => {
  const { Search } = Input;
  const history = useHistory();
  const [search] = useQueryParam('search', StringParam);

  const handleQuerySearch = (search: string): void => {
    if (search) {
      const url = encodeURI(`/?search=${search}`)
      history.push(url)
    }
  }
  return (
    <>
      <Search placeholder="search" allowClear aria-label="input-query-search" defaultValue={search || undefined} onSearch={(value) => handleQuerySearch(value)} enterButton={<SearchOutlined aria-label="submit-query-search" />} />
    </>
  )
}

export default PostSearchInput