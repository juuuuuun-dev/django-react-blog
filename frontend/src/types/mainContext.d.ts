export type GlobalModalConfig = {
  title: string | null,
  type: string | null,
  content: string | null,
}

export type MainState = {
  loading: boolean;
  pageSize: number;
  globalModalConfig: GlobalModalConfig,
}


export type ProviderProps = [
  MainState,
  React.Dispatch<Actions>,
];