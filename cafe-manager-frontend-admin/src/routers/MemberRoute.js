import Home from "../components/Home/Home";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import MemberManager from "../components/Member/MemberManager";

function MemberRoute(props) {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={path}>
        <MemberManager />
      </Route>
    </Switch>
  );
}

export default MemberRoute;
