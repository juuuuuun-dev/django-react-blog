import React from 'react';
import { useHistory } from 'react-router-dom';

import Form from '../../../components/admin/form/PostForm';
import toast from '../../../components/common/toast';
import { AdminContext } from '../../../context/adminContext';
import { create, postFormItem } from '../../../service/admin/posts';
import { PostFormItem } from '../../../types/posts';

const Create: React.FC = () => {
  const [state, dispatch] = React.useContext(AdminContext);
  const [formItem, setFormItem] = React.useState<PostFormItem | undefined>();
  const [error, setError] = React.useState({});
  const history = useHistory();

  const fetchData = React.useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    const res = await postFormItem();
    setFormItem(res.data);
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
  }, [dispatch]);

  React.useEffect(() => {
    if (state.hasToken) fetchData();
  }, [fetchData, state.hasToken]);

  const onSubmit = async (values: any) => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const res = await create(values);
      if (res.status === 201) {
        dispatch({ type: 'SET_LOADING', payload: { loading: false } });
        toast({ type: 'SUCCESS' });
        history.push('/admin/posts');
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
      <Form onSubmit={onSubmit} isStaff={state.isStaff} formItem={formItem} error={error} />
    </>
  );
};

export default Create;
