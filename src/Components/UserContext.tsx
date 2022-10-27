import React, { createContext, useState } from "react";
import { AUTH_EMAIL, AUTH_ID, AUTH_NAME } from "../constants";

export type User = {
  name: string;
  email: string;
  id: string;
};

export type LoginContextType = {
  userContext: User;
  setUserContext: React.Dispatch<React.SetStateAction<User>>;
};

type LoginContextProviderProps = {
  children: React.ReactNode;
};

export const LoginContext = createContext({} as LoginContextType);

export const LoginContextProvider = ({
  children,
}: LoginContextProviderProps) => {
  const [userContext, setUserContext] = useState<User>({
    name: localStorage.getItem(AUTH_NAME),
    email: localStorage.getItem(AUTH_EMAIL),
    id: localStorage.getItem(AUTH_ID),
  });

  return (
    <LoginContext.Provider value={{ userContext, setUserContext }}>
      {children}
    </LoginContext.Provider>
  );
};
