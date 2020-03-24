import React from 'react';
import { AdminContext } from '../../../context/adminContext';
import { list } from '../../../service/tags';

const Tags: React.FC = () => {
  const endPoint = '/tags/admin-tag/';
  const { state, dispatch } = React.useContext(AdminContext);

  React.useEffect(() => {
    if (state.token !== '') {
      fetchData(state.token);
    }
  }, [state.token]);

  const fetchData = async (token: string) => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });

    const res = await list();
    if (res.status === 200) {
      console.log(res.data);
    }
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
  };

  return <>tag index</>;
};

export default Tags;
