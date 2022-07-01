import React, { useContext, useState, createContext, useEffect } from "react";

import { getAccounts } from "../helpers/apiCalls";
import { login } from "../helpers/apiCalls";

const GlobalStateContext = createContext({});

export default function GlobalStateProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const [account, setAccount] = useState(null);
  const [savedAccount, setSavedAccount] = useState(
    JSON.parse(localStorage.getItem("@labex/account"))
  );
  const [accounts, setAccounts] = useState(null);

  const [loading, setLoading] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);
  const [detailsId, setDetailsId] = useState(null);

  const [openLogin, setOpenLogin] = useState(false);
  const [openActivityRegister, setOpenActivityRegister] = useState(false);

  const [extensionPosts, setExtensionPosts] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredByPage, setFilteredByPage] = useState([]);
  const [filteredBySearch, setFilteredBySearch] = useState(null);
  const [search, setSearch] = React.useState(null);

  //account stuff:
  const accountsApiCall = async () => {
    const accounts = await getAccounts();
    setAccounts(accounts.data);
  };
  const loginApiCall = async () => {
    const response = await login(savedAccount);
    if (response) {
      setAccount(response);
    }
  };
  useEffect(() => {
    if (!accounts) accountsApiCall();
    if (savedAccount) {
      loginApiCall();
    }
  }, []);
  useEffect(() => {
    if (!savedAccount) {
      localStorage.removeItem("@labex/account");
    }
  }, [savedAccount]);
  useEffect(() => {
    if (account) {
      delete account.adm;
      delete account.name;
      localStorage.setItem("@labex/account", JSON.stringify(account));
    }
  }, [account]);

  //extension activities stuff
  useEffect(() => {
    if (extensionPosts && !filteredBySearch) {
      setFilteredBySearch(extensionPosts.values);
    }
  }, [extensionPosts]);

  return (
    <GlobalStateContext.Provider
      value={{
        account,
        setAccount,
        accounts,
        setAccounts,
        savedAccount,
        setSavedAccount,
        language,
        setLanguage,
        loading,
        setLoading,
        extensionPosts,
        setExtensionPosts,
        search,
        setSearch,
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
