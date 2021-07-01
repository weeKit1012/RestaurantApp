import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TouchableHighlight, Button } from "react-native";
import sty from "_styles";

const LoginScreen = ({ navigation }) => {
  const [role, setRole] = useState({ userId: "123", userRole: "Counter" });
  const [route, setRoute] = useState(null);

  const LoginButtonPressed = () => {
    if (role.userRole === "Kitchen") {
      setRoute("KitchenHomeScreen");
    }
    if (role.userRole === "Counter") {
      setRoute("CounterHomeScreen");
    }
  };

  useEffect(() => {
    if (route != null) {
      navigation.navigate(route);
    }
  }, [route]);

  return (
    <SafeAreaView style={sty.container}>
      <Text style={sty.title}>Screen : Login</Text>

      <TouchableHighlight onPress={() => LoginButtonPressed()}>
        <Text>Go to Home</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

export default LoginScreen;
