import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard/index";
import GlobalStateProvider from "./hooks/globalState";

export default function Routes() {
  return (
    <BrowserRouter>
      <GlobalStateProvider>
        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </GlobalStateProvider>
    </BrowserRouter>
  );
}
