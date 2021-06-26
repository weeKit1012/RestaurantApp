import { createBottomTabNavigator } from "react-navigation-tabs";

import CounterHomeScreen from "_scenes/counter/home";
import CounterOrderListScreen from "_scenes/counter/orderlist";

const TabNavigatorConfig = {
  initialRouteName: "Home",
  header: null,
  headerMode: "none",
};

const RouteConfigs = {
  Home: {
    screen: CounterHomeScreen,
  },
  OrderList: {
    screen: CounterOrderListScreen,
  },
};

const AppNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;
