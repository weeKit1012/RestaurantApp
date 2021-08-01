import React, { Component } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const MenuListScreen = ({ navigation }) => {
  return (
    <View style={localStyle.view}>
      <View style={{ flex: 1 }}>
        <Text>Menu List</Text>
      </View>
      <View style={{ flex: 5 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("");
          }}
        >
          <Text>Add food</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const localStyle = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default MenuListScreen;
