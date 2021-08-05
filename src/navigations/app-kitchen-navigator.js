import { createBottomTabNavigator } from "react-navigation-tabs";

import {KitChenRouteConfigs, KitchenTabNavigatorConfig} from "../scenes/kitchen"


const KitchenAppNavigator = createBottomTabNavigator(
  KitChenRouteConfigs,
  KitchenTabNavigatorConfig
);

export default KitchenAppNavigator;
