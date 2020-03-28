import React from 'react';
import { retrieve, update } from '../../../service/tags';
import { AdminContext } from '../../../context/adminContext';
import TagForm from '../../../components/admin/form/TagForm'
import { ITagData } from '../../../types/tags';
import toast from '../../../components/common/toast';

import { Table, Input, Button } from 'antd';
import searchColumn from "../../../components/admin/searchColumn"
import { Link, useRouteMatch, useParams } from 'react-router-dom';


const TagEdit: React.FC = () => {
  const { state, dispatch } = React.useContext(AdminContext);
  const [data, setData] = React.useState<ITagData | undefined>();
  const { id } = useParams();
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

  const onSubmit = async (values: any) => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const data = {
        name: values.name,
      };
      const res = await update(id, data);
      if (res.status === 200) {
        dispatch({ type: 'SET_LOADING', payload: { loading: false } });
        toast({ type: 'SUCCESS' });
      }
    } catch {
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      toast({ type: 'ERROR' });
    }
  }
  return (
    <>
      <TagForm data={data} onSubmit={onSubmit} />
    </>
  );
};

export default TagEdit;
