import React from 'react';
import { adminReducer, AdminState, initState, Actions } from './adminReducer';
import { get as storageGet } from 'local-storage';
import { setToken, get } from '../helper/client'
import axios from 'axios'

const verifyAuthToken = async () => {
    const token = storageGet('token');
    if (token) {
        setToken(token)
        get('user/verify-auth/')
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.log(e)
            })
        // console.log(token)
        // const res = await axios.get('http://localhost:8000/api/v1/user/verify-auth/', {
        //     headers: { 'Authorization': token }
        // })
    }
}

interface AdminContextProviderProps {
    children: React.ReactNode;
}
interface IContextProps {
    state: AdminState;
    dispatch: React.Dispatch<Actions>;
}
export const AdminContext = React.createContext({} as IContextProps);

export const AdminContextProvider = ({ children }: AdminContextProviderProps) => {
    React.useEffect(() => {
        verifyAuthToken();
    })
    const [state, dispatch] = React.useReducer(adminReducer, initState)
    const value = { state, dispatch }
    return (
        <>
            <AdminContext.Provider value={value}>
                {children}
            </AdminContext.Provider>
        </>
    );
}
