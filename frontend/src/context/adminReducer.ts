import { AdminState } from '../types/adminContext';

const SIDER_SHOW = 'SIDER_SHOW' as const;
const SIDER_HIDE = 'SIDER_HIDE' as const;
const SIDER_TOGGLE = 'SIDER_TOGGLE' as const;
const SET_HAS_TOKEN = 'SET_HAS_TOKEN' as const;
const SET_USERNAME = 'SET_USERNAME' as const;
const SET_THUMB = 'SET_THUMB' as const;
const SET_LOADING = 'SET_LOADING' as const;
const SET_PAGE_SIZE = 'SET_PAGE_SIZE' as const;


export const siderShow = () => ({
  type: SIDER_SHOW,
});
export const siderHide = () => ({
  type: SIDER_HIDE,
});
export const siderToggle = () => ({
  type: SIDER_TOGGLE,
});
export const setHasToken = (hasToken: boolean) => ({
  type: SET_HAS_TOKEN,
  payload: {
    hasToken,
  },
});
export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: {
    loading,
  },
});

export const setPageSize = (pageSize: number) => ({
  type: SET_PAGE_SIZE,
  payload: {
    pageSize,
  },
});

export const setUsername = (username: string) => ({
  type: SET_USERNAME,
  payload: {
    username: username,
  },
});

export const setThumb = (thumb: string) => ({
  type: SET_THUMB,
  payload: {
    thumb: thumb,
  },
});

export type Actions =
  | ReturnType<typeof siderShow>
  | ReturnType<typeof siderHide>
  | ReturnType<typeof siderToggle>
  | ReturnType<typeof setHasToken>
  | ReturnType<typeof setUsername>
  | ReturnType<typeof setThumb>
  | ReturnType<typeof setPageSize>
  | ReturnType<typeof setLoading>;

export const adminReducer = (state: AdminState, action: Actions) => {
  switch (action.type) {
    case SIDER_SHOW:
      return { ...state, isSiderShow: true };
    case SIDER_HIDE:
      return { ...state, isSiderShow: false };
    case SIDER_TOGGLE:
      return { ...state, isSiderShow: state.isSiderShow ? false : true };
    case SET_HAS_TOKEN:
      return { ...state, hasToken: action.payload.hasToken };
    case SET_USERNAME:
      return { ...state, username: action.payload.username };
    case SET_THUMB:
      return { ...state, thumb: action.payload.thumb };
    case SET_LOADING:
      return { ...state, loading: action.payload.loading };
    case SET_PAGE_SIZE:
      return { ...state, pageSize: action.payload.pageSize };
  }
};
