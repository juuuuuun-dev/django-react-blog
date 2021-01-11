import React from 'react';
import { useHistory } from 'react-router';

import SiteSettingForm from '../../components/admin/form/SiteSettingForm';
import toast from '../../components/common/toast';
import { AdminContext } from '../../context/adminContext';
import { retrieve, update } from '../../service/admin/siteSettings';
import { SiteSettingConfig, SiteSettingDetail } from '../../types/siteSettings';

const SiteSettings: React.FC = () => {
  const [state, dispatch] = React.useContext(AdminContext);
  const [data, setData] = React.useState<SiteSettingDetail | undefined>();
  const [config, setConfig] = React.useState<SiteSettingConfig | undefined>();
  const history = useHistory()


  const fetchData = React.useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const res = await retrieve();
      setData(res.data.data);
      setConfig(res.data.config);
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
      params.append('name', values.name);
      params.append('description', values.description);
      params.append('delete_logo', values.delete_logo);
      params.append('delete_main_image', values.delete_main_image);
      if (values.logo) {
        params.append('logo', values.logo);
      }
      if (values.main_image) {
        params.append('main_image', values.main_image);
      }
      await update(params);
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      toast({ type: 'SUCCESS' });
      history.go(0);
      window.scrollTo(0, 0);
    } catch {
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      toast({ type: 'ERROR' });
    }
  };
  return (
    <>
      <SiteSettingForm data={data} isStaff={state.isStaff} config={config} onSubmit={handleSubmit} />
    </>
  );
};

export default SiteSettings;
