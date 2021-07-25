import React, { useEffect } from "react";
import { Button, SafeAreaView, Text, TouchableHighlight } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useToast } from "react-native-styled-toast";

import sty from "_styles";

const CounterHistoryTab = ({ navigation }) => {
  const { toast } = useToast();
  const userObj = navigation.getParam("userObj");
  console.log(userObj.userId);

  CounterHistoryTabNavigation = navigation;

  useEffect(() => {
    toast({ message: "Login successfully" });
  }, []);

  return (
    <SafeAreaView style={sty.container}>
      <Text style={sty.title}>Tab : Counter History</Text>

      <TouchableHighlight onPress={() => navigation.navigate("Login")}>
        <Text style={sty.subTitle}>Go to Login</Text>
      </TouchableHighlight>

      <Text style={sty.title}>{userObj.userId}</Text>
    </SafeAreaView>
  );
};

export let CounterHistoryTabNavigation = {};

export default CounterHistoryTab;
