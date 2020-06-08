import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { NumberParam, useQueryParam } from 'use-query-params';

import img from '../assets/error.jpg';
import { statusCodes } from '../config/statusCodes';

const Error: React.FC = () => {
  const [status] = useQueryParam('status', NumberParam);
  const [errorCode, setErrorCode] = React.useState<number | undefined>()
  React.useEffect(() => {
    if (status) {
      setErrorCode(status)
    } else {
      setErrorCode(404)
    }
  }, [status])
  const history = useHistory();
  return (
    <div>
      <div><img src={img} width="175" alt="error" /></div>
      <h3>{errorCode}</h3>
      {errorCode && statusCodes[errorCode].name}<p></p>
      <Button onClick={() => history.push('/')}>Back to home page</Button>
    </div>
  );
};

export default Error;
