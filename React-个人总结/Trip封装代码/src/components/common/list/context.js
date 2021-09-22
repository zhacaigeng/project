import React, { useContext } from 'react'

const ListContext = React.createContext();
export const ListContextProvider = ListContext.Provider;
export const ListContextConsumer = ListContext.Consumer;

export function useListContext() {
    return useContext(ListContext);
}