import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  return (
    <View style={localStyle.backgroundStyle}>
      <Ionicons name="search" style={localStyle.iconStyle} />
      <TextInput
        style={localStyle.inputStyle}
        placeholder="Search"
        value={term}
        onChangeText={onTermChange}
        autoCapitalize="none"
        autoCorrect={false}
        onEndEditing={onTermSubmit}
      />
    </View>
  );
};

const localStyle = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#CFCFCF",
    height: 50,
    borderRadius: 5,
    flexDirection: "row",
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
    fontFamily: "inter-regular",
  },
  iconStyle: {
    fontSize: 35,
    color: "black",
    alignSelf: "center",
    marginHorizontal: 10,
  },
});

export default SearchBar;
