import React from 'react';

import { useHistoryPushError } from '../helper/useHistoryPushError';
import { getInit } from '../service/main/init';
import { MainState, ProviderProps } from '../types/mainContext';
import { mainReducer } from './mainReducer';

export const mainState: MainState = {
  init: undefined,
  loading: false,
  pageSize: parseInt(process.env.REACT_APP_PAGE_SIZE || "20"),
  globalModalConfig: {
    title: null,
    type: null,
    content: null,
  },
};

export const MainContext = React.createContext({} as ProviderProps);
export const MainContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(mainReducer, mainState);
  const providerValue = React.useMemo((): ProviderProps => [state, dispatch], [state, dispatch]);
  const [pushError] = useHistoryPushError();

  const fetchData = React.useCallback(async () => {
    try {
      const res = await getInit();
      dispatch({
        type: 'SET_INIT', payload: {
          init: {
            author: res.data.author,
            categories: res.data.categories,
            tags: res.data.tags,
            recentPosts: res.data.recent_posts,
          }
        }
      });
    } catch (e) {
      if (e.response && e.response.status) {
        pushError(e.response.status)
      }
    }
  }, [pushError])

  React.useEffect(() => {
    fetchData()
  }, [fetchData]);

  return React.useMemo(() => {
    return (
      <>
        <MainContext.Provider value={providerValue}>{children}</MainContext.Provider>
      </>
    )
  }, [providerValue, children])
};

