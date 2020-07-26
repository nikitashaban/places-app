import React, { Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "./reducers";
import { useAuth } from './shared/hooks/auth-hook'


import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";


const Users = React.lazy(() => import("./users/pages/Users"))
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"))
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"))
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"))
const Auth = React.lazy(() => import("./users/pages/Auth"))


const App: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.users);
  useAuth()

  let routes;
  if (!currentUser?.token) {
    routes = (
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/:userId/places" component={UserPlaces} />
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/:userId/places" component={UserPlaces} />
        <Route path="/places/new" component={NewPlace} />
        <Route path="/places/:placeId" component={UpdatePlace} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <>
      <MainNavigation />
      <main><Suspense fallback={<div className="center"><LoadingSpinner /></div>} >{routes}</Suspense></main>
    </>
  );
};

export default App;
