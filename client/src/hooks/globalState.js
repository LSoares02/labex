import React, { useContext, useState, createContext, useEffect } from "react";

const GlobalStateContext = createContext({});

export default function GlobalStateProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [account, setAccount] = useState(null);

  const [loading, setLoading] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);
  const [detailsId, setDetailsId] = useState(null);

  const [openLogin, setOpenLogin] = useState(false);
  const [openActivityRegister, setOpenActivityRegister] = useState(false);

  const [extensionPosts, setExtensionPosts] = useState(null);
  const [filtered, setFiltered] = useState(extensionPosts);

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredByPage, setFilteredByPage] = useState([]);
  const [filteredBySearch, setFilteredBySearch] = useState([]);

  return (
    <GlobalStateContext.Provider
      value={{
        account,
        setAccount,
        language,
        setLanguage,
        loading,
        setLoading,
        extensionPosts,
        setExtensionPosts,
        filtered,
        setFiltered,
        openDetails,
        setOpenDetails,
        detailsId,
        setDetailsId,
        openLogin,
        setOpenLogin,
        openActivityRegister,
        setOpenActivityRegister,
        currentPage,
        setCurrentPage,
        filteredByPage,
        setFilteredByPage,
        filteredBySearch,
        setFilteredBySearch,
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
