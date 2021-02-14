import React from 'react';
import { useHistory } from 'react-router-dom';

import MarkdownContent from '../../components/common/MarkdownContent';
import { MainContext } from '../../context/mainContext';
import { createLdJsonTypeWebSite } from '../../helper/ldJson';
import { createMeta } from '../../helper/meta';
import { useHistoryPushError } from '../../helper/useHistoryPushError';
import { retrieve } from '../../service/main/aboutMe';
import { AboutMeDetail } from '../../types/aboutMe';

const Index: React.FC = () => {
  const [pushError] = useHistoryPushError();
  const [data, setData] = React.useState<AboutMeDetail>();
  const [state, dispatch] = React.useContext(MainContext);
  const history = useHistory();


  const fetchData = React.useCallback(async () => {
    try {
      const res = await retrieve();
      const meta = createMeta({
        title: state.init?.siteSettings.name,
        url: state.init?.url + history.location.pathname,
        description: state.init?.siteSettings.description,
        image: state.init?.siteSettings.main_image,
      })
      const ldJson = createLdJsonTypeWebSite({ init: state.init });
      dispatch({ type: 'SET_META', payload: { meta: meta } })
      dispatch({ type: 'SET_LD_JSON', payload: { ldJson: [ldJson] } })
      dispatch({ type: 'SET_PAGE_TITLE', payload: { pageTitle: res.data.page_title } })
      setData(res.data)
    } catch (e) {
      if (e.response && e.response.status) {
        pushError(e.response.status)
      }
    }
  }, [pushError, dispatch, state.init, history.location.pathname]);

  React.useEffect(() => {
    if (state.init) {
      fetchData();
    }
  }, [fetchData, state.init])

  return (
    <>
      <h3 className="page-title" data-testid="page-title">{data?.page_title}</h3>
      <MarkdownContent name="about-me" content={data?.content}></MarkdownContent>
    </>
  )
}

export default Index;