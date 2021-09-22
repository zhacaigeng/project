import React, { useContext } from "react";

const AppContext = React.createContext({});
export const AppContextProvider = AppContext.Provider;
export const AppContextConsuer = AppContext.Consumer;

export default function useAppContext() {
    return useContext(AppContext);
}