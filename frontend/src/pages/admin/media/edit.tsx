import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import DeleteBtn from '../../../components/admin/DeleteBtn';
import Form from '../../../components/admin/form/MediaForm';
import toast from '../../../components/common/toast';
import { AdminContext } from '../../../context/adminContext';
import { destroy, retrieve, update } from '../../../service/admin/media';
import { MediaDetail } from '../../../types/media';

const MediaEdit: React.FC = () => {
  const redirectPath = "/admin/media";
  const [state, dispatch] = React.useContext(AdminContext);
  const [data, setData] = React.useState<MediaDetail | undefined>();
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
      const params = new FormData();
      params.append('name', values.name);
      params.append('width', values.width);
      params.append('height', values.height);
      if (values.file) {
        params.append('file', values.file);
      }

      const res = await update(id, params);
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
      <DeleteBtn isStaff={state.isStaff} onDelete={onDelete} />
      <Form data={data} isStaff={state.isStaff} onSubmit={onSubmit} error={error} />
    </>
  );
};

export default MediaEdit;
