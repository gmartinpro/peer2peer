import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "../../pages/home";

export enum Routes {
  HOME = "/",
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={Routes.HOME} exact component={Home} />
        <Route component={() => <>404</>} />
      </Switch>
    </BrowserRouter>
  );
}
