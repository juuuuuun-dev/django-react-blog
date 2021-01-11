import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import DeleteBtn from '../../../components/admin/DeleteBtn';
import TagForm from '../../../components/admin/form/TagForm';
import toast from '../../../components/common/toast';
import { AdminContext } from '../../../context/adminContext';
import { destroy, retrieve, update } from '../../../service/admin/tags';
import { TagDetail } from '../../../types/tags';

const TagEdit: React.FC = () => {
  const [state, dispatch] = React.useContext(AdminContext);
  const [data, setData] = React.useState<TagDetail | undefined>();
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
  // delete
  const onDelete = async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const res = await destroy(id);
      if (res.status === 204) {
        dispatch({ type: 'SET_LOADING', payload: { loading: false } });
        toast({ type: 'DELETE' });
        history.push("/admin/tags");
      }
    } catch {
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      toast({ type: 'ERROR' });
    }
  }
  return (
    <>
      <DeleteBtn isStaff={state.isStaff} onDelete={onDelete} />
      <TagForm data={data} isStaff={state.isStaff} onSubmit={onSubmit} error={error} />
    </>
  );
};

export default TagEdit;
