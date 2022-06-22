import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import Routes from "./routes";
import GlobalStateProvider from "./hooks/globalState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStateProvider>
      <Routes />
    </GlobalStateProvider>
  </React.StrictMode>
);
