import React from 'react';
import { retrieve } from '../../../service/tags';
import { AdminContext } from '../../../context/adminContext';
import { Table, Input, Button } from 'antd';
import searchColumn from "../../../components/admin/searchColumn"
import { Link, useRouteMatch, useParams } from 'react-router-dom';


interface IData {
  id: number;
  key: number;
  name: string;
  updated_at: string;
  created_at: string;
}
const TagEdit: React.FC = () => {
  const { state, dispatch } = React.useContext(AdminContext);
  const [data, setData] = React.useState<IData[]>([]);
  const { id } = useParams();
  React.useEffect(() => {
    if (state.hasToken) {
      fetchData();
    }
  }, [state.hasToken]);
  console.log(data)
  const fetchData = async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    const res = await retrieve(id);
    if (res.status === 200) {
      setData(res.data);
    }
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
  };
  return (
    <>
      edit
    </>
  );
};

export default TagEdit;
