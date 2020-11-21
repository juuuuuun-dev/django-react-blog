import { keyBy } from 'lodash';
import React from 'react';

import { useHistoryPushError } from '../helper/useHistoryPushError';
import { getInit } from '../service/main/init';
import { MainState, ProviderProps } from '../types/mainContext';
import { mainReducer } from './mainReducer';

export const mainState: MainState = {
  init: undefined,
  loading: false,
  appTitle: process.env.REACT_APP_TITLE || "SITE NAME",
  pageTitle: "",
  meta: [],
  ldJson: [],
  copyrightStartYear: parseInt(process.env.REACT_APP_COPYRIGHT_START_YEAR || "2020"),
  dateFormat: process.env.REACT_APP_DATE_FORMAT || "YYYY-MM-DD",
  dateTimeFormat: process.env.REACT_APP__DATETIME_FORMAT || "YYYY-MM-DD hh:mm:ss",
  globalModalConfig: {
    title: null,
    type: null,
    content: null,
  },
  breakPoint: {
    xs: 480,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1600,
  }
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
            categories: keyBy(res.data?.categories, 'id'),
            tags: res.data.tags,
            recentPosts: res.data.recent_posts,
            siteSettings: {
              name: res.data.site_settings.name,
              description: res.data.site_settings.description,
              main_image: res.data.site_settings.main_image,
              logo: res.data.site_settings.logo,
              logo_mini: res.data.site_settings.logo_mini,
            },
            pageSize: res.data.page_size,
            url: res.data.url,
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

