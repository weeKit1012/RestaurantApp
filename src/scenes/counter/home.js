import React from "react";
import { SafeAreaView, Text, TouchableHighlight } from "react-native";

const CounterHomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Screen : Counter Home</Text>

      <TouchableHighlight onPress={() => navigation.navigate("Login")}>
        <Text>Go to Login</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

export default CounterHomeScreen;
