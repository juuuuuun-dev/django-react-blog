import React from 'react';

import { MainContext } from '../../context/mainContext';

const Footer: React.FC = () => {
  const [{ init, copyrightStartYear }] = React.useContext(MainContext);
  const nowYear = new Date().getFullYear();
  const currnetYear = copyrightStartYear !== nowYear ? `-${nowYear}` : '';
  return (
    <>
      <footer className='footer'>
        <div className='footer-container'>
          <span data-testid="footer-copyright">&copy; {copyrightStartYear}{currnetYear} {init?.siteSettings.name}</span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
