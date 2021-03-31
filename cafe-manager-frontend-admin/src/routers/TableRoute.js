import Home from "../components/Home/Home";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import TableManager from "../components/Store/TableManager";

function TableRoute(props) {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={path}>
        <TableManager />
      </Route>
    </Switch>
  );
}

export default TableRoute;
