import Home from "../components/Home/Home";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ImportMaterial from "../components/Material/ImportMaterial";

function ExportMaterialRoute(props) {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={path}>
        <ImportMaterial />
      </Route>
    </Switch>
  );
}

export default ExportMaterialRoute;
