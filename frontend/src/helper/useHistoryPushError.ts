import React from 'react';
import { useHistory } from 'react-router-dom';

export const useHistoryPushError = () => {
  const history = useHistory()
  return React.useMemo(() => {
    const pushError = (status: number) => {
      if (status) {
        history.push(`/error?status=${status}`)
      }
    }
    return [pushError]
  }, [history]);

}