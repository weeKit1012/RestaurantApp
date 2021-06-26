import React from "react";
import { SafeAreaView, Text, TouchableHighlight } from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Screen : Login</Text>

      <TouchableHighlight onPress={() => navigation.navigate("Home")}>
        <Text>Go to Home</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

export default LoginScreen;
