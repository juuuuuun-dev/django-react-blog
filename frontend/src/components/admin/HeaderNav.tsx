import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <>
      <div style={{
        float: 'right',
      }}>
        <Link to="/" target="_blank">To Site</Link>
      </div>
    </>
  );
};

export default Nav;
