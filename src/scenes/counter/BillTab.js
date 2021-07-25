import React from "react";
import { Text, SafeAreaView } from "react-native";

import sty from "_styles";
import global from "../login/Global";

export default function CounterBillTab() {
  const user = global.user;

  return (
    <SafeAreaView style={sty.container}>
      <Text style={sty.title}>This is Bill Tab</Text>
      <Text style={sty.title}>{user.userId}</Text>
    </SafeAreaView>
  );
}
