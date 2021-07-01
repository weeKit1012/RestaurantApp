import React from "react";
import { View, Image } from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import CounterHomeScreen from "_scenes/counter/home";
import CounterOrderListScreen from "_scenes/counter/order";
import CounterBillTab from "_scenes/counter/bill";

export default () => {
  const CounterTabNavigatorConfig = {
    initialRouteName: "CounterHomeScreen",
    // header: null,
    // headerMode: "none",
    tabBarOptions: {
      showLabel: true,
      showIcon: true,
      activeTintColor: "#e32f45",
      style: {
        position: "absolute",
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: "#ffffff",
        borderRadius: 15,
        height: 60,
      },
    },
  };

  const CounterRouteConfigs = {
    CounterHomeScreen: {
      screen: createStackNavigator({
        CounterHomeScreen: {
          screen: CounterHomeScreen,
          navigationOptions: {
            headerTitle: "History Title",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#A3EBB1",
              height: 70,
            },
          },
        },
      }),
      navigationOptions: {
        title: "History Title",
        tabBarLabel: "History",
        tabBarIcon: ({ focused }) => (
          <View
            style={{ alignItems: "center", justifyContent: "center", top: 3 }}
          >
            <Image
              source={require("_assets/images/icon-history.png")}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? "#e32f45" : "#748c94",
              }}
            />
          </View>
        ),
      },
    },
    CounterOrderListScreen: {
      screen: CounterOrderListScreen,
      navigationOptions: {
        tabBarLabel: "Order",
        tabBarIcon: ({ focused }) => (
          <View
            style={{ alignItems: "center", justifyContent: "center", top: 3 }}
          >
            <Image
              source={require("_assets/images/icon-order.png")}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? "#e32f45" : "#748c94",
              }}
            />
          </View>
        ),
      },
    },
    CounterBillTab: {
      screen: CounterBillTab,
      navigationOptions: {
        tabBarLabel: "Bill",
        tabBarIcon: ({ focused }) => (
          <View
            style={{ alignItems: "center", justifyContent: "center", top: 3 }}
          >
            <Image
              source={require("_assets/images/icon-bill.png")}
              resizeMode="contain"
              style={{
                width: 45,
                height: 45,
                tintColor: focused ? "#e32f45" : "#748c94",
              }}
            />
          </View>
        ),
      },
    },
  };

  return [CounterTabNavigatorConfig, CounterRouteConfigs];
};
