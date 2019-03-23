import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home/Home";
import Account from "../pages/Account/Account";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";

import SocialRedirect from "../pages/SocialRedirect/SocialRedirect";

import AuthenticatedRoute from "../hocs/AuthenticatedRoute";
import UnauthenticatedRoute from "../hocs/UnauthenticatedRoute";

export default ({ childProps }) =>
  <Switch>
    <AuthenticatedRoute path="/" exact component={Home} props={childProps} />
    <AuthenticatedRoute path="/account" exact component={Account} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <UnauthenticatedRoute path="/forgotpassword" exact component={ForgotPassword} props={childProps} />
    <UnauthenticatedRoute path="/resetpassword/:token" exact component={ResetPassword} props={childProps} />
    <UnauthenticatedRoute path="/socialredirect" exact component={SocialRedirect} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;


/*
*
* AuthenticatedRoute routes will only be available to logged in users, otherwise they will be
* redirected to the login page
*
* UnauthenticatedRoute routes will be available to logged out users, otherwise they will be
* redirected to the home page
*
*/