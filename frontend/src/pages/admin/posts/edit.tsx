import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import DeleteBtn from '../../../components/admin/DeleteBtn';
import Form from '../../../components/admin/form/PostForm';
import toast from '../../../components/common/toast';
import { AdminContext } from '../../../context/adminContext';
import { destroy, retrieve, update } from '../../../service/admin/posts';
import { PostDetail, PostFormItem } from '../../../types/posts';

const Edit: React.FC = () => {
  const [state, dispatch] = React.useContext(AdminContext);
  const [data, setData] = useState<PostDetail | undefined>();
  const [formItem, setFormItem] = useState<PostFormItem | undefined>();
  const [error, setError] = useState({})
  const { id } = useParams();
  const history = useHistory();
  const redirectPath = "/admin/posts";

  const fetchData = React.useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const res = await retrieve(id);
      setData(res.data.post);
      setFormItem({ categories: res.data.categories, tags: res.data.tags });
    } catch (e) {
      toast({ type: 'ERROR' });
    }

    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
  }, [dispatch, id]);

  React.useEffect(() => {
    if (state.hasToken) fetchData();
  }, [fetchData, state.hasToken]);


  // edit
  const onSubmit = async (values: any) => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const res = await update(id, values);
      if (res.status === 200) {
        dispatch({ type: 'SET_LOADING', payload: { loading: false } });
        toast({ type: 'SUCCESS' });
        history.push(redirectPath);
      }
    } catch (e) {
      if (e.response.data) {
        setError(e.response.data)
      }
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      toast({ type: 'ERROR' });
    }
  }
  // delete
  const onDelete = async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const res = await destroy(id);
      if (res.status === 204) {
        dispatch({ type: 'SET_LOADING', payload: { loading: false } });
        toast({ type: 'DELETE' });
        history.push(redirectPath);
      }
    } catch {
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      toast({ type: 'ERROR' });
    }
  }

  return (
    <>
      <DeleteBtn onDelete={onDelete} />
      <Form data={data} formItem={formItem} onSubmit={onSubmit} error={error} />
    </>
  );
};

export default Edit;
