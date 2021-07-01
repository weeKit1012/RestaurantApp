import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AuthNavigator from "./auth-navigator";
import CounterAppNavigator from "./app-counter-navigator";
import KitchenAppNavigator from "./app-kitchen-navigator";

const RootNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    CounterAppNavigator: CounterAppNavigator,
    KitchenAppNavigator: KitchenAppNavigator,
  },
  {
    initialRouteName: "Auth",
  }
);

export default createAppContainer(RootNavigator);
