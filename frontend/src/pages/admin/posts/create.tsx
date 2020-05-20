import React, { useState, Suspense } from 'react';
import { create, postFormItem } from '../../../service/admin/posts';
import { AdminContext } from '../../../context/adminContext';
import Form from '../../../components/admin/form/PostForm';
import toast from '../../../components/common/toast';
import { PostFormItem } from '../../../types/posts'
import { useHistory } from 'react-router-dom';

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
      const params = new FormData();
      params.append('title', values.title);
      params.append('content', values.content);
      params.append('is_show', values.is_show);
      params.append('category', values.category);
      params.append('tag', values.tag);
      if (values.cover) {
        params.append('cover', values.cover);
      }
      const res = await create(params);
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
      <Suspense fallback={<h1>Loading profile...</h1>}>
        <Form onSubmit={onSubmit} formItem={formItem} error={error} />
      </Suspense>
    </>
  );
};

export default Create;
