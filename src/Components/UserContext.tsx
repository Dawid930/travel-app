import React, { createContext, useState } from 'react';

export type User = {
    name: string
    email: string
    id: string

};

export type LoginContextType = {
  userContext: User,
  setUserContext: React.Dispatch<React.SetStateAction<User>>
};

type LoginContextProviderProps = {
    children: React.ReactNode
};

export const LoginContext = createContext({} as LoginContextType);

export const LoginContextProvider = ({ children }: LoginContextProviderProps) => {

    const [userContext, setUserContext] = useState<User>({name: 'Guest', email: "", id: ""})
    
    return (
        <LoginContext.Provider value={{ userContext, setUserContext }}>
            {children}
        </LoginContext.Provider>
    )
};