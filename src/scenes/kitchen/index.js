import KitchenCurrentOrderTab from "./currentorder";
import KitchenPastOrderTab from "./pastorder";
import FavMenuTab from "./favmenu";
import KitchenPastOrderTabNavigation from "./pastorder";
import KitchenCurrentOrderTabNavigation from "./currentorder";
import CurrentOrderDetail from "./currentorderdetail";
import DeclineScreen from "./declinescreen"
import OtherFeatureTab from "./otherfeature"
import LoginScreen from "../login";
import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import { View } from "react-native";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

export const KitchenTabNavigatorConfig = {
  initialRouteName: "OtherFeatureTab",
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

 export const KitChenRouteConfigs = {
  KitchenCurrentOrderTab: {
    screen: createStackNavigator(
      {
        KitchenCurrentOrderTab: {
          screen: KitchenCurrentOrderTab,
          navigationOptions: {
            headerShown: true,
            headerTitle: "Order List",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#fb863c",
              height: 60,
            },
            headerTitleStyle: {
              fontFamily: "inter-bold",
            },
          },
        },
        CurrentOrderDetailTab:{
          screen: CurrentOrderDetail,
          navigationOptions:{}
          },
          DeclineScreen:{
            screen:DeclineScreen,
            navigationOptions:{},
          },
      },
      { initialRouteName: "KitchenCurrentOrderTab" }
    ),
    navigationOptions: {
      tabBarLabel: "Current Order",
      tabBarIcon: ({ focused }) => (
        <View
          style={{ alignItems: "center", justifyContent: "center", top: 3 }}
        >
          <FontAwesome
            name="clipboard"
            size={24}
            color={focused ? "#fb863c" : "#748c94"}
          />
        </View>
      ),
    },
  },

  KitchenPastOrderTab: {
    screen: createStackNavigator(
      {
      KitchenPastOrderTab: {
        screen: KitchenPastOrderTab,
        navigationOptions: {
          headerShown: true,
          headerTitle: "Past Order",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fb863c",
            height: 60,
          },
          headerTitleStyle: {
            fontFamily: "inter-bold",
          },
        },
      },
      CurrentOrderDetailTab: {
        screen: CurrentOrderDetail,
        navigationOptions: {},
      },
    },{ initialRouteName: "KitchenPastOrderTab"}
    ),
    navigationOptions: {
      title: "Past Order",
      tabBarLabel: "Past Order",
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

  OtherFeatureTab: {
    screen: createStackNavigator(
      {
        OtherFeatureTab:{
      screen: OtherFeatureTab,
      navigationOptions:{
        headerShown: true,
        headerTitle: "Other feature",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#fb863c",
          height: 60,
        },
        headerTitleStyle: {
          fontFamily: "inter-bold",
        },
},
    },
      FavMenuTab: {
        screen: FavMenuTab,
        navigationOptions: {},
      },
    },{ initialRouteName: "OtherFeatureTab"}
    ),
    navigationOptions: {
      title: "Other Feature",
      tabBarLabel: "Other Feature",
      // for icon
      tabBarIcon: ({ focused }) => (
        <View
          style={{ alignItems: "center", justifyContent: "center", top: 3 }}
        >
          <FontAwesome
            name="star"
            size={24}
            color={focused ? "#fb863c" : "#748c94"}
          />
        </View>
      ),
    },
  },
};


