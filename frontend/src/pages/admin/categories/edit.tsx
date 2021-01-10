import { stat } from 'fs';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import DeleteBtn from '../../../components/admin/DeleteBtn';
import Form from '../../../components/admin/form/CategoryForm';
import toast from '../../../components/common/toast';
import { AdminContext } from '../../../context/adminContext';
import { destroy, retrieve, update } from '../../../service/admin/categories';
import { CategoryDetail } from '../../../types/categories';

const Edit: React.FC = () => {
  const [state, dispatch] = React.useContext(AdminContext);
  const [data, setData] = React.useState<CategoryDetail | undefined>();
  const [error, setError] = React.useState({})

  const { id } = useParams();
  const history = useHistory();

  const fetchData = React.useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const res = await retrieve(id);
      setData(res.data);
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
    } catch (e) {
      toast({ type: 'ERROR' });
    }
  }, [dispatch, id]);

  React.useEffect(() => {
    if (state.hasToken) fetchData();
  }, [fetchData, state.hasToken]);

  // edit
  const onSubmit = async (values: any) => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const data = {
        name: values.name,
        slug: values.slug,
      };
      const res = await update(id, data);
      if (res.status === 200) {
        dispatch({ type: 'SET_LOADING', payload: { loading: false } });
        toast({ type: 'SUCCESS' });
        history.push("/admin/categories");
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
        history.push("/admin/categories");
      }
    } catch {
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      toast({ type: 'ERROR' });
    }
  }
  return (
    <>
      <DeleteBtn onDelete={onDelete} />
      <Form data={data} onSubmit={onSubmit} isStaff={state.isStaff} error={error} />
    </>
  );
};

export default Edit;
