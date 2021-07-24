import React from "react";
import { Text, SafeAreaView } from "react-native";
import sty from "_styles";

export default function CounterBillTab() {
  return (
    <SafeAreaView style={sty.container}>
      <Text style={sty.title}>This is Bill Tab</Text>
    </SafeAreaView>
  );
}
