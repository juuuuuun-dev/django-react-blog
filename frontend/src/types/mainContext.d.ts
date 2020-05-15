export type MainState = {
  loading: boolean;
}

export type ProviderProps = [
  MainState,
  React.Dispatch<Actions>,
];