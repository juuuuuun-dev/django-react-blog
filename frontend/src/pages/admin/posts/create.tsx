import React from 'react';
import { create, postFormItem } from '../../../service/posts';
import { AdminContext } from '../../../context/adminContext';
import Form from '../../../components/admin/form/PostForm';
import toast from '../../../components/common/toast';
import { IPostFormItem } from '../../../types/posts'
import { useHistory } from 'react-router-dom';

const Create: React.FC = () => {
  const { state, dispatch } = React.useContext(AdminContext);
  const [formItem, setFormItem] = React.useState<IPostFormItem | undefined>();
  const [error, setError] = React.useState({});
  const history = useHistory();
  React.useEffect(() => {
    if (state.hasToken) {
      fetchData();
    }
  }, [state.hasToken]);
  const fetchData = async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    const res = await postFormItem();
    if (res.status === 200) {
      setFormItem(res.data);
    }
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
  };
  const onSubmit = async (values: any) => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const data = {
        title: values.title,
        content: values.content,
        is_show: values.is_show,
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
  return (
    <>
      <Form onSubmit={onSubmit} formItem={formItem} error={error} />
    </>
  );
};

export default Create;
