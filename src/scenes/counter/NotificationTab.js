import React, { Component } from "react";
import { View, Text, TextInput, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import sty from "_styles";

const CounterNotificationTab = () => {
  return (
    <View style={sty.container}>
      <View style={{ flex: 1, marginTop: 10, backgroundColor: "transparent" }}>
        <Text style={sty.titleText}>
          Notification{" "}
          <Ionicons
            name="notifications-circle-outline"
            size={24}
            color="black"
          />
        </Text>
        <View style={sty.titleDivider} />
      </View>
      <View style={{ flex: 9 }}>
        <TextInput
          style={{ borderWidth: 1, height: 40, width: 120, margin: 12 }}
        />
        <Image
          style={localStyle.image}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/reactnative-restaurantapp.appspot.com/o/Mashed%20Potatoes.jpg?alt=media&token=6c4e7b37-5c02-4f48-8cde-24243ef016eb",
          }}
        />
      </View>
    </View>
  );
};

const localStyle = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
  },
  // titleText: {
  //   fontFamily: "inter-bold",
  //   fontSize: 30,
  // },
  // titleDivider: {
  //   marginTop: 5,
  //   height: 1,
  //   backgroundColor: "black",
  //   opacity: 0.2,
  // },
});

export default CounterNotificationTab;
