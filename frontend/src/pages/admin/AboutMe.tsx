import React from 'react';

import AboutMeForm from '../../components/admin/form/AboutMeForm';
import toast from '../../components/common/toast';
import { AdminContext } from '../../context/adminContext';
import { retrieve, update } from '../../service/admin/aboutMe';
import { AboutMeDetail } from '../../types/aboutMe';

const Profile: React.FC = () => {
  const [state, dispatch] = React.useContext(AdminContext);
  const [data, setData] = React.useState<AboutMeDetail | undefined>();

  const fetchData = React.useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const res = await retrieve();
      setData(res.data);
    } catch (e) {
      toast({ type: "ERROR" });
    }
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
  }, [dispatch]);

  React.useEffect(() => {
    if (state.hasToken) fetchData();
  }, [fetchData, state.hasToken]);

  const handleSubmit = async (values: any) => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      await update(values);
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      toast({ type: 'SUCCESS' });
    } catch {
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      toast({ type: 'ERROR' });
    }
  };
  return (
    <>
      <AboutMeForm data={data} onSubmit={handleSubmit} />
    </>
  );
};

export default Profile;
