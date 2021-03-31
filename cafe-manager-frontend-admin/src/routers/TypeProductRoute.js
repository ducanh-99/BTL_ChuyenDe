import Home from "../components/Home/Home";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import TypeProductManager from "../components/Product/TypeProductManager";

function TypeProductRoute(props) {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={path}>
        <TypeProductManager />
      </Route>
    </Switch>
  );
}

export default TypeProductRoute;
