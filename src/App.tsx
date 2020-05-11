import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/places/new" component={NewPlace} />
          <Route path="/" component={Users} />
          <Redirect to="/" />
        </Switch>
      </main>
    </React.Fragment>
  );
};

export default App;
