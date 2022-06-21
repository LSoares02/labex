import React, { useContext, useState, useEffect, createContext } from "react";
import { useHistory } from "react-router-dom";

import { getAccounts, getResources } from "../helpers/apiCalls";

const GlobalStateContext = createContext({});

export default function GlobalStateProvider({ children }) {
  const history = useHistory();

  const [example, setExample] = useState("");

  return (
    <GlobalStateContext.Provider
      value={{
        example,
        setExample,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }

  return context;
}
