import React from 'react';


export interface AdminState {
  isSiderShow: boolean,
}
export const initState = {
  isSiderShow: true
}

const SIDER_SHOW = 'SIDER_SHOW' as const;
const SIDER_HIDE = 'SIDER_HIDE' as const;
const SIDER_TOGGLE = 'SIDER_TOGGLE' as const;

export const siderShow = () => ({
  type: SIDER_SHOW,
})
export const siderHide = () => ({
  type: SIDER_HIDE,
})
export const siderToggle = () => ({
  type: SIDER_TOGGLE,
})

export type Actions = (
  | ReturnType<typeof siderShow>
  | ReturnType<typeof siderHide>
  | ReturnType<typeof siderToggle>
);

export const adminReducer = (state: AdminState, action: Actions) => {
  switch (action.type) {
    case SIDER_SHOW:
      return { ...state, isSiderShow: true, }
    case SIDER_HIDE:
      return { ...state, isSiderShow: false, }
    case SIDER_TOGGLE:
      return { ...state, isSiderShow: state.isSiderShow ? false : true, }
  }
}