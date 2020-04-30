import React from 'react';
import { create } from '../../../service/admin/media';
import { AdminContext } from '../../../context/adminContext';
import Form from '../../../components/admin/form/MediaForm';
import toast from '../../../components/common/toast';
import { useHistory } from 'react-router-dom';

const Create: React.FC = () => {
  const redirectPath = '/admin/media';
  const { state, dispatch } = React.useContext(AdminContext);
  const [error, setError] = React.useState({});
  const history = useHistory();
  React.useEffect(() => {
    if (state.hasToken) {
      fetchData();
    }
  }, [state.hasToken]);
  const fetchData = async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
  };
  const onSubmit = async (values: any) => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const params = new FormData();
      params.append('name', values.name);

      const res = await create(params);
      if (res.status === 201) {
        dispatch({ type: 'SET_LOADING', payload: { loading: false } });
        toast({ type: 'SUCCESS' });
        history.push(redirectPath);
      }
    } catch (e) {
      if (e.response.data) {
        setError(e.response.data);
      }
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      toast({ type: 'ERROR' });
    }
  };
  return (
    <>
      <Form onSubmit={onSubmit} error={error} />
    </>
  );
};

export default Create;
