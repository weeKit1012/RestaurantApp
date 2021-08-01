import React, { useEffect } from "react";
import { Button, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
// import { useToast } from "react-native-styled-toast";

import sty from "_styles";
import global from "_scenes/login/Global";

const CounterHistoryTab = ({ navigation }) => {
  // const { toast } = useToast();
  // const userObj = navigation.getParam("userObj");
  const user = global.user;

  CounterHistoryTabNavigation = navigation;

  // useEffect(() => {
  //   toast({ message: "Login successfully" });
  // }, []);

  return (
    <SafeAreaView style={sty.container}>
      <Text style={sty.titleText}>Tab : Counter History</Text>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={sty.normalText}>Go to Login</Text>
      </TouchableOpacity>

      {/* <Text style={sty.title}>{userObj.userId}</Text> */}
      <Text style={sty.normalText}>{user.lastLogin}</Text>
    </SafeAreaView>
  );
};

export let CounterHistoryTabNavigation = {};

export default CounterHistoryTab;
