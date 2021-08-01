import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";

import CounterHistoryTab from "_scenes/counter/HistoryTab";
import CounterOrderTab from "_scenes/counter/OrderTab";
import CounterBillTab from "_scenes/counter/BillTab";
import CounterNotificationTab from "_scenes/counter/NotificationTab";

import CounterTab from "_scenes/counter/CounterTab";
import MenuListScreen from "_scenes/counter/MenuList";
import MenuAddScreen from "_scenes/counter/MenuAdd";
import MenuModifyScreen from "_scenes/counter/MenuModify";

import { CounterHistoryTabNavigation } from "./HistoryTab";

export default () => {
  const CounterTabNavigatorConfig = {
    initialRouteName: "CounterTab",
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      activeTintColor: "#e32f45",
      style: {
        position: "absolute",
        elevation: 0,
        backgroundColor: "#ffffff",
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
        height: 80,
      },
    },
  };

  const CounterRouteConfigs = {
    CounterOrderTab: {
      screen: CounterOrderTab,
      navigationOptions: {
        tabBarLabel: "Order",
        tabBarIcon: ({ focused }) => (
          <View
            style={{ alignItems: "center", justifyContent: "center", top: 3 }}
          >
            <Ionicons
              name="fast-food-outline"
              size={30}
              color={focused ? "#fb863c" : "#748c94"}
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
            <AntDesign
              name="bank"
              size={30}
              color={focused ? "#fb863c" : "#748c94"}
            />
          </View>
        ),
      },
    },
    CounterHistoryTab: {
      screen: createStackNavigator({
        CounterHistoryTab: {
          screen: CounterHistoryTab,
          navigationOptions: {
            headerShown: false,
            headerTitle: "History Title",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#d8ffb0",
              height: 90,
            },
            headerTitleStyle: {
              fontFamily: "inter-bold",
            },
            headerRight: () => (
              <MaterialIcons.Button
                name="logout"
                size={24}
                color="black"
                backgroundColor="#d8ffb0"
                onPress={() => {
                  CounterHistoryTabNavigation.navigate("Login");
                }}
              />
            ),
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
            <MaterialIcons
              name="history-edu"
              size={30}
              color={focused ? "#fb863c" : "#748c94"}
            />
          </View>
        ),
      },
    },
    CounterNotificationTab: {
      screen: CounterNotificationTab,
      navigationOptions: {
        tabBarLabel: "Notification",
        tabBarIcon: ({ focused }) => (
          <View
            style={{ alignItems: "center", justifyContent: "center", top: 3 }}
          >
            <Ionicons
              name="notifications-circle-outline"
              size={30}
              color={focused ? "#fb863c" : "#748c94"}
            />
          </View>
        ),
      },
    },
    CounterTab: {
      screen: createStackNavigator(
        {
          CounterTab: {
            screen: CounterTab,
            navigationOptions: {},
          },
          MenuListScreen: {
            screen: MenuListScreen,
            navigationOptions: {},
          },
          MenuAddScreen: {
            screen: MenuAddScreen,
            navigationOptions: {},
          },
          MenuModifyScreen: {
            screen: MenuModifyScreen,
            navigationOptions: {},
          },
        },
        {
          initialRouteName: "CounterTab",
          headerMode: "none",
        }
      ),
      navigationOptions: {
        tabBarLabel: "Counter",
        tabBarIcon: ({ focused }) => (
          <View
            style={{ alignItems: "center", justifyContent: "center", top: 3 }}
          >
            <Ionicons
              name="ios-menu"
              size={30}
              color={focused ? "#fb863c" : "#748c94"}
            />
          </View>
        ),
      },
    },
  };

  return [CounterTabNavigatorConfig, CounterRouteConfigs];
};
