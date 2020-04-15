export interface MainState {
  loading: boolean;
}
export const initState: MainState = {
  loading: false,
};

const SET_LOADING = 'SET_LOADING' as const;

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: {
    loading,
  },
});

export type Actions =
  | ReturnType<typeof setLoading>;

export const mainReducer = (state: MainState, action: Actions) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload.loading };
  }
};
