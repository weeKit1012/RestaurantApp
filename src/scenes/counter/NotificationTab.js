import React, { Component } from "react";
import { SafeAreaView, Text, TextInput } from "react-native";

import sty from "_styles";

const CounterNotificationTab = () => {
  return (
    <SafeAreaView style={sty.container}>
      <Text style={sty.title}>This is Notification Tab</Text>
      <TextInput
        style={{ borderWidth: 1, height: 40, width: 120, margin: 12 }}
      />
    </SafeAreaView>
  );
};

export default CounterNotificationTab;
