export interface AdminState {
  isSiderShow: boolean;
  loading: boolean;
  hasToken: boolean;
  username: string;
  pageSize: number;
}
export const initState: AdminState = {
  isSiderShow: true,
  loading: false,
  hasToken: false,
  username: '',
  pageSize: 1,
};

const SIDER_SHOW = 'SIDER_SHOW' as const;
const SIDER_HIDE = 'SIDER_HIDE' as const;
const SIDER_TOGGLE = 'SIDER_TOGGLE' as const;
const SET_HAS_TOKEN = 'SET_HAS_TOKEN' as const;
const SET_USERNAME = 'SET_USERNAME' as const;
const SET_LOADING = 'SET_LOADING' as const;

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

export const setUsername = (username: string) => ({
  type: SET_USERNAME,
  payload: {
    username: username,
  },
});

export type Actions =
  | ReturnType<typeof siderShow>
  | ReturnType<typeof siderHide>
  | ReturnType<typeof siderToggle>
  | ReturnType<typeof setHasToken>
  | ReturnType<typeof setUsername>
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
    case SET_LOADING:
      return { ...state, loading: action.payload.loading };
  }
};
