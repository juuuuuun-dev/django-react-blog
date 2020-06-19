import { GlobalModalConfig, InitState, MainState } from '../types/mainContext';

const SET_LOADING = 'SET_LOADING' as const;
const SET_INIT = 'SET_INIT' as const;
const SET_GLOBAL_MODAL_CONFIG = 'SET_GLOBAL_MODAL_CONFIG' as const;

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: {
    loading,
  },
});

export const setInit = (init: InitState) => ({
  type: SET_INIT,
  payload: {
    init: {
      author: init?.author,
      categories: init?.categories,
      tags: init?.tags
    }
  }
});

export const setGlobalModalConfig = (config: GlobalModalConfig) => ({
  type: SET_GLOBAL_MODAL_CONFIG,
  payload: {
    globalModalConfig: {
      title: config.title,
      type: config.type,
      content: config.content
    },
  },
});

export type Actions =
  | ReturnType<typeof setLoading>
  | ReturnType<typeof setInit>
  | ReturnType<typeof setGlobalModalConfig>;

export const mainReducer = (state: MainState, action: Actions) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload.loading };
    case SET_INIT:
      return { ...state, init: action.payload.init };
    case SET_GLOBAL_MODAL_CONFIG:
      return { ...state, conifg: action.payload.globalModalConfig };
  }
};
