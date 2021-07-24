import { createBottomTabNavigator } from "react-navigation-tabs";

import {
  CustomerRouteConfigs,
  CustomerTabNavigatorConfig,
} from "../scenes/customer";

const CustomerAppNavigator = createBottomTabNavigator(
  CustomerRouteConfigs,
  CustomerTabNavigatorConfig
);

export default CustomerAppNavigator;
