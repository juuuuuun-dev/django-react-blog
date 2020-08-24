import React from 'react';

import MarkdownContent from '../../components/common/MarkdownContent';
import { MainContext } from '../../context/mainContext';
import { useHistoryPushError } from '../../helper/useHistoryPushError';
import { retrieve } from '../../service/main/aboutMe';
import { AboutMeDetail } from '../../types/aboutMe';

const Index: React.FC = () => {
  const [pushError] = useHistoryPushError();
  const [data, setData] = React.useState<AboutMeDetail>();
  const context = React.useContext(MainContext);
  const dispatch = context[1];

  const fetchData = React.useCallback(async () => {
    try {
      const res = await retrieve();
      setData(res.data)
      dispatch({ type: 'SET_PAGE_TITLE', payload: { pageTitle: res.data.page_title } })
      dispatch({ type: 'SET_DESCRIPTION', payload: { description: res.data.page_title } })
    } catch (e) {
      if (e.response && e.response.status) {
        pushError(e.response.status)
      }
    }
  }, [pushError]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData])

  return (
    <>
      <h3 className="page-title" data-testid="page-title">{data?.page_title}</h3>
      <MarkdownContent content={data?.content}></MarkdownContent>
    </>
  )
}

export default Index;