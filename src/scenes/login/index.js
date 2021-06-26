import React from "react";
import { SafeAreaView, Text, TouchableHighlight } from "react-native";
import sty from "_styles";

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={sty.container}>
      <Text style={sty.title}>Screen : Login</Text>

      <TouchableHighlight onPress={() => navigation.navigate("Home")}>
        <Text>Go to Home</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

export default LoginScreen;
