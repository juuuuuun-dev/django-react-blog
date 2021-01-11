import { stat } from 'fs';
import { set } from 'local-storage';
import React from 'react';

import ProfileForm from '../../components/admin/form/ProfileForm';
import toast from '../../components/common/toast';
import { AdminContext } from '../../context/adminContext';
import { retrieve, update } from '../../service/admin/profile';
import { ProfileDetail } from '../../types/profile';

const Profile: React.FC = () => {
  const [state, dispatch] = React.useContext(AdminContext);
  const [data, setData] = React.useState<ProfileDetail | undefined>();

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
      const params = new FormData();
      params.append('public_name', values.public_name);
      params.append('url', values.url);
      params.append('message', values.message);
      if (values.avator) {
        params.append('avator', values.avator);
      }
      const res = await update(params);
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      set<string>('thumb', res.data.thumb);
      dispatch({ type: 'SET_THUMB', payload: { thumb: res.data.thumb } });
      toast({ type: 'SUCCESS' });
    } catch {
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      toast({ type: 'ERROR' });
    }
  };
  return (
    <>
      <ProfileForm data={data} isStaff={state.isStaff} onSubmit={handleSubmit} />
    </>
  );
};

export default Profile;
