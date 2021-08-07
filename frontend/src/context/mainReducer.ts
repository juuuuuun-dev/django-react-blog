import { InitState, MainState } from '../types/mainContext';
import { MetaType } from '../types/meta';

const SET_LOADING = 'SET_LOADING' as const;
const SET_INIT = 'SET_INIT' as const;
const SET_PAGE_TITLE = 'SET_PAGE_TITLE' as const;
const SET_META = 'SET_META' as const;
const SET_LD_JSON = 'SET_LD_JSON' as const;

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: {
    loading,
  },
});

export const setPageTitle = (pageTitle: string) => ({
  type: SET_PAGE_TITLE,
  payload: {
    pageTitle,
  },
});

export const setMeta = (meta: MetaType) => ({
  type: SET_META,
  payload: {
    meta,
  },
});

export const setJsonLd = (JsonLd: []) => ({
  type: SET_LD_JSON,
  payload: {
    JsonLd,
  },
});

export const setInit = (init: InitState) => ({
  type: SET_INIT,
  payload: {
    init: init
  }
});



export type Actions =
  | ReturnType<typeof setLoading>
  | ReturnType<typeof setPageTitle>
  | ReturnType<typeof setInit>
  | ReturnType<typeof setMeta>
  | ReturnType<typeof setJsonLd>;

export const mainReducer = (state: MainState, action: Actions) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload.loading };
    case SET_PAGE_TITLE:
      return { ...state, pageTitle: action.payload.pageTitle };
    case SET_INIT:
      return { ...state, init: action.payload.init };
    case SET_META:
      return { ...state, meta: action.payload.meta };
    case SET_LD_JSON:
      return { ...state, JsonLd: action.payload.JsonLd };
  }
};
