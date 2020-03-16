export interface AdminState {
  isSiderShow: boolean;
  adminLogin: boolean;
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
  adminLogin: false,
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
const ADMIN_LOGIN = 'ADMIN_LOGIN' as const;
const SET_PROFILE = 'SET_PROFILE' as const;
const SET_USERNAME = 'SET_USERNAME' as const;

export const siderShow = () => ({
  type: SIDER_SHOW,
});
export const siderHide = () => ({
  type: SIDER_HIDE,
});
export const siderToggle = () => ({
  type: SIDER_TOGGLE,
});
export const adminLogin = () => ({
  type: ADMIN_LOGIN,
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
  | ReturnType<typeof adminLogin>
  | ReturnType<typeof setProfile>
  | ReturnType<typeof setUsername>;

export const adminReducer = (state: AdminState, action: Actions) => {
  switch (action.type) {
    case SIDER_SHOW:
      return { ...state, isSiderShow: true };
    case SIDER_HIDE:
      return { ...state, isSiderShow: false };
    case SIDER_TOGGLE:
      return { ...state, isSiderShow: state.isSiderShow ? false : true };
    case ADMIN_LOGIN:
      return { ...state, adminLogin: true };
    case SET_PROFILE:
      return { ...state, profile: action.payload.profile };
    case SET_USERNAME:
      return { ...state, username: action.payload.username };
  }
};
