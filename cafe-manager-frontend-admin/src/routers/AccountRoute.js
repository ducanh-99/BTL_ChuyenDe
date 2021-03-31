import Home from "../components/Home/Home";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AccountManager from "../components/Account/AccountManager";

function AccountRoute(props) {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={path}>
        <AccountManager />
      </Route>
    </Switch>
  );
}

export default AccountRoute;
