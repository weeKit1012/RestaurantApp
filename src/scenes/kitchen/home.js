import React from "react";
import { SafeAreaView, Text, Button } from "react-native";
import sty from "_styles";
import global from "../login/Global";

const KitchenHomeScreen = ({ navigation }) => {
  const userObj = navigation.getParam("userObj");
  const user = global.user;

  return (
    <SafeAreaView style={sty.container}>
      <Text>This is Kitchen Home</Text>
      <Text>{userObj.userId}</Text>
      <Text>{user.userId}</Text>
      <Button
        title="Back to login"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </SafeAreaView>
  );
};

export default KitchenHomeScreen;
