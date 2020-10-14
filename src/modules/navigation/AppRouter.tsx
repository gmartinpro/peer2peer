/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Discussion } from "../../pages/discussion";
import { Home } from "../../pages/home";
import { DiscussionContextProvider } from "../discussion/DiscussionContext";

export enum Routes {
  HOME = "/",
  DISCUSSION = "/discussion/:id",
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <DiscussionContextProvider>
        <Switch>
          <Route path={Routes.HOME} exact component={Home} />
          <Route path={Routes.DISCUSSION} exact component={Discussion} />
          <Route component={() => <>404</>} />
        </Switch>
      </DiscussionContextProvider>
    </BrowserRouter>
  );
}
