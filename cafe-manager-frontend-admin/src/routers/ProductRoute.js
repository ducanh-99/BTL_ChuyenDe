import Home from "../components/Home/Home";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProductManager from "../components/Product/ProductManager";

function ProductRoute(props) {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={path}>
        <ProductManager />
      </Route>
    </Switch>
  );
}

export default ProductRoute;
