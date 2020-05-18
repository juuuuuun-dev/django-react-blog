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
      const data = {
        title: values.title,
        content: values.content,
        is_show: values.is_show || false,
        category: values.category,
        tag: values.tag,
      };
      const res = await create(data);
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
  const onChange = (value: any) => {
    console.log("onChange")
    console.log(value);
  }
  return (
    <>
      <Suspense fallback={<h1>Loading profile...</h1>}>
        <Form onSubmit={onSubmit} onChange={onChange} formItem={formItem} error={error} />
      </Suspense>
    </>
  );
};

export default Create;
