export interface AdminState {
  isSiderShow: boolean;
  loading: boolean;
  token: string;
  username: string;
  profile: IProfile;
}
export interface IProfile {
  avator: string;
  message: string;
  url: string;
}

export const initState: AdminState = {
  isSiderShow: true,
  loading: false,
  token: '',
  username: '',
  profile: {
    avator: '',
    message: '',
    url: '',
  },
};

const SIDER_SHOW = 'SIDER_SHOW' as const;
const SIDER_HIDE = 'SIDER_HIDE' as const;
const SIDER_TOGGLE = 'SIDER_TOGGLE' as const;
const SET_TOKEN = 'SET_TOKEN' as const;
const SET_PROFILE = 'SET_PROFILE' as const;
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
export const setToken = (token: string) => ({
  type: SET_TOKEN,
  payload: {
    token,
  },
});
export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: {
    loading,
  },
});
export const setProfile = (profile: IProfile) => ({
  type: SET_PROFILE,
  payload: {
    profile: profile,
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
  | ReturnType<typeof setToken>
  | ReturnType<typeof setProfile>
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
    case SET_TOKEN:
      return { ...state, token: action.payload.token };
    case SET_PROFILE:
      return { ...state, profile: action.payload.profile };
    case SET_USERNAME:
      return { ...state, username: action.payload.username };
    case SET_LOADING:
      return { ...state, loading: action.payload.loading };
  }
};
