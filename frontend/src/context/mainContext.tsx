import React from 'react';
import { mainReducer, initState } from './mainReducer';
import { ProviderProps } from '../types/mainContext';

export const MainContext = React.createContext({} as ProviderProps);
export const MainContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(mainReducer, initState);
  const providerValue = React.useMemo((): ProviderProps => [state, dispatch], [state, dispatch]);

  React.useEffect(() => {
    const fn = async () => {

    };
    fn();
  }, []);

  return React.useMemo(() => {
    return (
      <>
        <MainContext.Provider value={providerValue}>{children}</MainContext.Provider>
      </>
    )
  }, [providerValue, children])
};

