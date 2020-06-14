import React from 'react';
import { useHistory } from 'react-router-dom';

import TagForm from '../../../components/admin/form/TagForm';
import toast from '../../../components/common/toast';
import { AdminContext } from '../../../context/adminContext';
import { create } from '../../../service/admin/tags';

const TagCreate: React.FC = () => {
  const dispatch = React.useContext(AdminContext)[1];
  const [error, setError] = React.useState({})
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
        history.push("/admin/tags");
      }
    } catch (e) {
      if (e.response.data) {
        setError(e.response.data)
      }
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      toast({ type: 'ERROR' });
    }
  }
  return (
    <>
      <TagForm onSubmit={onSubmit} error={error} />
    </>
  );
};

export default TagCreate;
