import { createContext, useContext } from "react";
export type GlobalContent = {
  user: string;
  setUser: (c: string) => void;
};
export const MyGlobalContext = createContext<GlobalContent>({
  user: "Guest", // set a default value
  setUser: () => {},
});
export const useGlobalContext = () => useContext(MyGlobalContext);
