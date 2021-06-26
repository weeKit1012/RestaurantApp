import React from "react";
import { SafeAreaView, Text, TouchableHighlight } from "react-native";
import sty from "_styles";

const CounterHomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={sty.container}>
      <Text style={sty.title}>Screen : Counter Home</Text>

      <TouchableHighlight onPress={() => navigation.navigate("Login")}>
        <Text>Go to Login</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

export default CounterHomeScreen;
