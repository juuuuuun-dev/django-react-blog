import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

export interface IProps {
  pathname: string;
  search: string | null | undefined;
  handleQuerySearch: (str: string) => void;
}

const CreateAndSearchRow = ({ pathname, search, handleQuerySearch }: IProps) => {
  const { Search } = Input;
  return (
    <>
      <Row className="create-search-row">
        <Col flex="1 1 120px">
          <Link data-testid="create-btn" to={`${pathname}/create`}><Button type="primary" style={{ marginBottom: "10px" }}>CREATE</Button></Link>
        </Col>
        <Col flex="0 1 300px">
          <Search placeholder="search" allowClear aria-label="input-query-search" defaultValue={search || undefined} onSearch={(value) => handleQuerySearch(value)} enterButton={<SearchOutlined aria-label="submit-query-search" />} />
        </Col>
      </Row>
      {search && <Row>
        <Col data-testid="result-query-search-text" style={{ fontSize: "0.8rem" }}>search: {search}</Col>
      </Row>
      }
    </>
  );
};

export default CreateAndSearchRow;
