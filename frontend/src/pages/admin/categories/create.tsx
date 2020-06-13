import React from 'react';
import { useHistory } from 'react-router-dom';

import Form from '../../../components/admin/form/CategoryForm';
import toast from '../../../components/common/toast';
import { AdminContext } from '../../../context/adminContext';
import { create } from '../../../service/admin/categories';

const Create: React.FC = () => {
  const dispatch = React.useContext(AdminContext)[1];
  const [error, setError] = React.useState({});
  const history = useHistory();

  const onSubmit = async (values: any) => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const data = {
        name: values.name,
        slug: values.slug,
      };
      const res = await create(data);
      if (res.status === 201) {
        dispatch({ type: 'SET_LOADING', payload: { loading: false } });
        toast({ type: 'SUCCESS' });
        history.push('/admin/categories');
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
