import React from 'react';
import { mainReducer, MainState, initState, Actions } from './mainReducer';
// import { useHistory } from 'react-router-dom';

interface MainContextProviderProps {
  children: React.ReactNode;
}
interface IContextProps {
  state: MainState;
  dispatch: React.Dispatch<Actions>;
}
export const MainContext = React.createContext({} as IContextProps);

export const MainContextProvider = ({ children }: MainContextProviderProps) => {
  const [state, dispatch] = React.useReducer(mainReducer, initState);
  const value = { state, dispatch };

  React.useEffect(() => {
    const fn = async () => {

    };
    fn();
  }, []);

  return (
    <>
      <MainContext.Provider value={value}>{children}</MainContext.Provider>
    </>
  );
};

