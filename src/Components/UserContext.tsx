import { createContext, useContext } from "react";
export type GlobalContent = {
  user: string;
  setUser: (c: string) => void;
};
export const MyGlobalContext = createContext<GlobalContent>({
  user: "Guest",
  setUser: () => {},
});
export const useGlobalContext = () => useContext(MyGlobalContext);
