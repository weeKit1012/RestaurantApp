import React, { Component } from "react";
import { SafeAreaView, Text, TextInput, Image, StyleSheet } from "react-native";

import sty from "_styles";

const CounterNotificationTab = () => {
  return (
    <SafeAreaView style={sty.container}>
      <Text style={sty.title}>This is Notification Tab</Text>
      <TextInput
        style={{ borderWidth: 1, height: 40, width: 120, margin: 12 }}
      />
      <Image
        style={localStyle.image}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/reactnative-restaurantapp.appspot.com/o/Mashed%20Potatoes.jpg?alt=media&token=6c4e7b37-5c02-4f48-8cde-24243ef016eb",
        }}
      />
    </SafeAreaView>
  );
};

const localStyle = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
  },
});

export default CounterNotificationTab;
