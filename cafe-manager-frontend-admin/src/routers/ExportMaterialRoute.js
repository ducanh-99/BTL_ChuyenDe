import Home from "../components/Home/Home";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ExportMaterial from "../components/Material/ExportMaterial";

function ImportMaterialRoute(props) {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={path}>
        <ExportMaterial />
      </Route>
    </Switch>
  );
}

export default ImportMaterialRoute;
