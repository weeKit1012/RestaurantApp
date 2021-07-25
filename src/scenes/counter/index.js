import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

import CounterHistoryTab from "_scenes/counter/HistoryTab";
import CounterOrderTab from "_scenes/counter/OrderTab";
import CounterBillTab from "_scenes/counter/BillTab";
import CounterNotificationTab from "_scenes/counter/NotificationTab";

import { CounterHistoryTabNavigation } from "./HistoryTab";

export default () => {
  const CounterTabNavigatorConfig = {
    initialRouteName: "CounterHistoryTab",
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
            <FontAwesome
              name="reorder"
              size={24}
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
            <FontAwesome5
              name="dollar-sign"
              size={24}
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
            headerShown: true,
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
            <FontAwesome
              name="history"
              size={24}
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
              name="notifications"
              size={24}
              color={focused ? "#fb863c" : "#748c94"}
            />
          </View>
        ),
      },
    },
  };

  return [CounterTabNavigatorConfig, CounterRouteConfigs];
};
