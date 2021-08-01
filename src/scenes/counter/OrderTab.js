import React from "react";
import { SafeAreaView, Text, TouchableHighlight } from "react-native";
import sty from "_styles";

const CounterOrderTab = ({ navigation }) => {
  return (
    <SafeAreaView style={sty.container}>
      <Text style={sty.titleText}>Tab : Counter Order List</Text>

      <TouchableHighlight onPress={() => navigation.navigate("Login")}>
        <Text style={{ fontFamily: "inter-regular" }}>Go to Login</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

export default CounterOrderTab;
