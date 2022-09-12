import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import GlobalStateProvider from "./hooks/globalState";

import Dashboard from "./pages/Activities/index";
import Home from "./pages/Home/index";
import Faculty from "./pages/Faculty";
import Social from "./pages/Social";
import Register from "./pages/Register";
import ActivityDetails from "./pages/ActivityDetails";
import ActivityRegister from "./pages/ActivityRegister";

export default function Pages() {
  return (
    <BrowserRouter>
      <GlobalStateProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/activities" element={<Dashboard />} />
          <Route
            exact
            path="/activities/:activityID"
            element={<ActivityDetails />}
          />
          <Route exact path="/faculty" element={<Faculty />} />
          <Route exact path="/social" element={<Social />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/activities/register"
            element={<ActivityRegister />}
          />
        </Routes>
      </GlobalStateProvider>
    </BrowserRouter>
  );
}
