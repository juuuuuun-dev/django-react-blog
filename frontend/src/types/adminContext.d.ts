export type AdminState = {
  isSiderShow: boolean;
  loading: boolean;
  hasToken: boolean;
  username: string;
  thumb: string;
  isStaff: boolean;
  pageSize: number;
  dateFormat: string;
  dateTimeFormat: string;
}

export type providerProps = [
  AdminState,
  React.Dispatch<Actions>,
];