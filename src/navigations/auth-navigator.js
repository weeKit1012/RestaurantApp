//WARNING: DONT SIMPLY MODIFY THIS FILE

import React, { useState, useEffect } from "react";

import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "_scenes/login";
import SignUpScreen from "../scenes/login/SignUp";

const AuthNavigatorConfig = {
  initialRouteName: "Login",
  header: null,
  headerMode: "none",
};

const RouteConfigs = {
  Login: LoginScreen,
  SignUp: SignUpScreen,
};

const AuthNavigator = createStackNavigator(RouteConfigs, AuthNavigatorConfig);

export default AuthNavigator;
