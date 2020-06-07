export type GlobalModalConfig = {
  title: string | null,
  type: string | null,
  content: string | null,
}

export type MainState = {
  loading: boolean;
  globalModalConfig: GlobalModalConfig,
}


export type ProviderProps = [
  MainState,
  React.Dispatch<Actions>,
];