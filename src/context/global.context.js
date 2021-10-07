import React, { createContext, useState } from "react";

export const GlobalContext = createContext({});
export const GlobalContextProvider = GlobalContext.Provider;

function GlobalContainer({ children }) {
  const [updateData, setUpdateData] = useState(false);
  return (
    <GlobalContextProvider value={[updateData, setUpdateData]}>
      {children}
    </GlobalContextProvider>
  );
}

export default GlobalContainer;
