export type AdminState = {
  isSiderShow: boolean;
  loading: boolean;
  hasToken: boolean;
  username: string;
  thumb: string;
  pageSize: number;
}


export type providerProps = [
  AdminState,
  React.Dispatch<Actions>,
];