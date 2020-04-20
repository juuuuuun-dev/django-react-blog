import React from 'react';
import { retrieve, update, destroy } from '../../../service/admin/media';
import { AdminContext } from '../../../context/adminContext';
import Form from '../../../components/admin/form/MediaForm'
import { IMediaData } from '../../../types/media';
import toast from '../../../components/common/toast';
import { useHistory, useParams } from 'react-router-dom';
import DeleteBtn from '../../../components/admin/DeleteBtn';

const MediaEdit: React.FC = () => {
  const redirectPath = "/admin/media";
  const { state, dispatch } = React.useContext(AdminContext);
  const [data, setData] = React.useState<IMediaData | undefined>();
  const [error, setError] = React.useState({})

  const { id } = useParams();
  const history = useHistory();
  React.useEffect(() => {
    if (state.hasToken) {
      fetchData();
    }
  }, [state.hasToken]);
  const fetchData = async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    const res = await retrieve(id);
    if (res.status === 200) {
      setData(res.data);
    }
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
  };

  // edit
  const onSubmit = async (values: any) => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const params = new FormData();
      params.append('name', values.name);
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
        toast({ type: 'SUCCESS' });
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
      <Form data={data} onSubmit={onSubmit} error={error} />
    </>
  );
};

export default MediaEdit;