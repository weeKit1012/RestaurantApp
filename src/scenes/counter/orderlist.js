import React from "react";
import { SafeAreaView, Text, TouchableHighlight } from "react-native";

const CounterOrderListScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Screen : Counter Order List</Text>

      <TouchableHighlight onPress={() => navigation.navigate("Login")}>
        <Text>Go to Login</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

export default CounterOrderListScreen;
