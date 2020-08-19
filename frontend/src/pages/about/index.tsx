import React from 'react';

import MarkdownContent from '../../components/common/MarkdownContent';
import { useHistoryPushError } from '../../helper/useHistoryPushError';
import { retrieve } from '../../service/main/aboutMe';
import { AboutMeDetail } from '../../types/aboutMe';

const Index: React.FC = () => {
  const [pushError] = useHistoryPushError();
  const [data, setData] = React.useState<AboutMeDetail>();

  const fetchData = React.useCallback(async () => {
    try {
      const res = await retrieve();
      setData(res.data)
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