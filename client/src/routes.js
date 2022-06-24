import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import GlobalStateProvider from "./hooks/globalState";

import Dashboard from "./pages/Activities/index";
import Home from "./pages/Home/index";
import Faculty from "./pages/Faculty";
import Social from "./pages/Social";

export default function Pages() {
  return (
    <BrowserRouter>
      <GlobalStateProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/activities" element={<Dashboard />} />
          <Route exact path="/faculty" element={<Faculty />} />
          <Route exact path="/social" element={<Social />} />
        </Routes>
      </GlobalStateProvider>
    </BrowserRouter>
  );
}
