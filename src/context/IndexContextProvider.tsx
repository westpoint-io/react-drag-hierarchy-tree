import React, { createContext, useContext } from 'react';

const IndexContext = createContext({} as { index: number });

export function IndexContextProvider({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}): JSX.Element {
  return (
    <IndexContext.Provider value={{ index }}>{children}</IndexContext.Provider>
  );
}

export const useIndex = () => useContext(IndexContext);
