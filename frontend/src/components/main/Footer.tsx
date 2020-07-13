import React from 'react';

import { MainContext } from '../../context/mainContext';

const Footer: React.FC = () => {
  const [{ domain, copyrightStartYear }] = React.useContext(MainContext);
  const nowYear = new Date().getFullYear();
  const currnetYear = copyrightStartYear !== nowYear ? `-${nowYear}` : '';
  return (
    <>
      <footer className='footer'>
        <div className='footer-container'>

          <span data-testid="footer-copyright">&copy; {copyrightStartYear}{currnetYear} {domain}</span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
