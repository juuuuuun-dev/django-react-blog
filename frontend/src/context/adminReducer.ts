export interface AdminState {
  isSiderShow: boolean,
  adminLogin: boolean
}
export const initState: AdminState = {
  isSiderShow: true,
  adminLogin: false,
}

const SIDER_SHOW = 'SIDER_SHOW' as const;
const SIDER_HIDE = 'SIDER_HIDE' as const;
const SIDER_TOGGLE = 'SIDER_TOGGLE' as const;
const ADMIN_LOGIN = 'ADMIN_LOGIN' as const;

export const siderShow = () => ({
  type: SIDER_SHOW,
})
export const siderHide = () => ({
  type: SIDER_HIDE,
})
export const siderToggle = () => ({
  type: SIDER_TOGGLE,
})
export const adminLogin = () => ({
  type: ADMIN_LOGIN,
})

export type Actions = (
  | ReturnType<typeof siderShow>
  | ReturnType<typeof siderHide>
  | ReturnType<typeof siderToggle>
  | ReturnType<typeof adminLogin>
);

export const adminReducer = (state: AdminState, action: Actions) => {
  switch (action.type) {
    case SIDER_SHOW:
      return { ...state, isSiderShow: true, }
    case SIDER_HIDE:
      return { ...state, isSiderShow: false, }
    case SIDER_TOGGLE:
      return { ...state, isSiderShow: state.isSiderShow ? false : true, }
    case ADMIN_LOGIN:
      return { ...state, adminLogin: true, }
  }
}