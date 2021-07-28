import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useToast } from "react-native-styled-toast";

import global from "_scenes/login/Global";
import sty from "_styles";

const CounterTab = ({ navigation }) => {
  const { toast } = useToast();
  const user = global.user;

  useEffect(() => {
    toast({ message: "Login successfully" });
  }, []);

  return (
    <View
      style={[
        sty.container,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Text>This is counter tab</Text>
    </View>
  );
};

const localStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CounterTab;
