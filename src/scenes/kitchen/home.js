import React from "react";
import { SafeAreaView, Text, Button } from "react-native";
import sty from "_styles";

const KitchenHomeScreen = ({ navigation }) => {
  const userObj = navigation.getParam("userObj");

  return (
    <SafeAreaView style={sty.container}>
      <Text>This is Kitchen Home</Text>
      <Text>{userObj.userId}</Text>
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
