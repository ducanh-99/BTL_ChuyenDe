import Home from "../components/Home/Home";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import MaterialManager from "../components/Material/MaterialManager";

function MaterialRoute(props) {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={path}>
        <MaterialManager />
      </Route>
    </Switch>
  );
}

export default MaterialRoute;
