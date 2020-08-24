import React from 'react';
import { Helmet } from 'react-helmet';

import { MainContext } from '../../context/mainContext';

const MetaHead: React.FC = () => {
  const [{ appTitle, pageTitle, description }] = React.useContext(MainContext);

  return (
    <>
      <Helmet data-testid="helmet" defaultTitle={appTitle} titleTemplate={`%s | ${appTitle}`}>
        <meta charSet='utf-8' />
        {pageTitle && <title>{pageTitle}</title>}
        {description && <meta name="description" content={description} />}
      </Helmet>
    </>
  )
}

export default MetaHead;