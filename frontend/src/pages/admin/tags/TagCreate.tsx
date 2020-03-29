import React from 'react';
import { create } from '../../../service/tags';
import { AdminContext } from '../../../context/adminContext';
import TagForm from '../../../components/admin/form/TagForm'
import toast from '../../../components/common/toast';
import { useHistory, useParams } from 'react-router-dom';

const TagCreate: React.FC = () => {
  const { state, dispatch } = React.useContext(AdminContext);
  const history = useHistory();

  const onSubmit = async (values: any) => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const data = {
        name: values.name,
      };
      const res = await create(data);
      if (res.status === 201) {
        dispatch({ type: 'SET_LOADING', payload: { loading: false } });
        toast({ type: 'SUCCESS' });
        history.push("/admin/tags");
      }
    } catch {
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      toast({ type: 'ERROR' });
    }
  }
  return (
    <>
      <TagForm onSubmit={onSubmit} />
    </>
  );
};

export default TagCreate;
