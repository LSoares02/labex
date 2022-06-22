import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard/index";

import GlobalStateProvider from "./hooks/globalState";

export default function Pages() {
  return (
    <BrowserRouter>
      <GlobalStateProvider>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
        </Routes>
      </GlobalStateProvider>
    </BrowserRouter>
  );
}
