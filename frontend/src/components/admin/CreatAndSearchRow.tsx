import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

export interface IProps {
  pathname: string;
  search: string | null | undefined;
  handleQuerySearch: (str: string) => void;
}

const CreateAndSearchRow = ({ pathname, search, handleQuerySearch }: IProps) => {
  const { Search } = Input;
  return (
    <Row className="create-search-row">
      <Col flex="1 1 120px">
        <Link data-testid="create-btn" to={`${pathname}/create`}><Button type="primary" style={{ marginBottom: "10px" }}>CREATE</Button></Link>
      </Col>
      <Col flex="0 1 300px">
        <Search placeholder="search" defaultValue={search || undefined} onSearch={(value) => handleQuerySearch(value)} enterButton />
      </Col>
    </Row>
  );
};

export default CreateAndSearchRow;
