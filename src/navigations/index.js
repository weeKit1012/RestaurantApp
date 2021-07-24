//WARNING: DONT SIMPLY MODIFY THIS FILE

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AuthNavigator from "./auth-navigator";
import CounterAppNavigator from "./app-counter-navigator";
import KitchenAppNavigator from "./app-kitchen-navigator";
import CustomerAppNavigator from "./app-customer-navigation";

const RootNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    CounterAppNavigator: CounterAppNavigator,
    KitchenAppNavigator: KitchenAppNavigator,
    CustomerAppNavigator: CustomerAppNavigator,
  },
  {
    initialRouteName: "Auth",
  }
);

export default createAppContainer(RootNavigator);
