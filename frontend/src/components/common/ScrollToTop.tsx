import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const ScrollToTop: React.FC<RouteComponentProps> = ({ history }) => {
  React.useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    })
    return () => {
      unlisten();
    }
  }, [])
  return (null)
}

export default withRouter(ScrollToTop);
