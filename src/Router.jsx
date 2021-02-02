import React from 'react';
import { Switch, Route } from 'react-router';
import { SignUp, SignIn, Home } from './templates';

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"(/)?"} component={Home} />
    </Switch>
  );
};
export default Router;
