import { createBottomTabNavigator } from "react-navigation-tabs";

import CounterIndex from "_scenes/counter";

const [CounterTabNavigatorConfig, CounterRouteConfigs] = CounterIndex();

const CounterAppNavigator = createBottomTabNavigator(
  CounterRouteConfigs,
  CounterTabNavigatorConfig
);

export default CounterAppNavigator;
