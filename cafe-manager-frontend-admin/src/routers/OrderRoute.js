import Home from "../components/Home/Home";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import OrderManager from "../components/Order/OrderManager";

function OrderRoute(props) {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={path}>
        <OrderManager />
      </Route>
    </Switch>
  );
}

export default OrderRoute;
