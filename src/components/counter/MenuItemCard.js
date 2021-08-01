import React, { Component } from "react";
import { View, Image, Text, StyleSheet } from "react-native";

import sty from "_styles";

const MenuItemCard = ({ result }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#C6C6C6",
      }}
    >
      <Image style={localStyle.image} source={{ uri: result.foodImageUrl }} />
      <View style={{ flexDirection: "column", paddingVertical: 30 }}>
        <Text style={localStyle.name}>{result.foodName}</Text>
        <Text style={localStyle.label}>
          $ {result.foodPrice} .{" "}
          {result.foodStatus == "1" ? (
            <Text>Active</Text>
          ) : (
            <Text>Inactive</Text>
          )}
        </Text>
      </View>
    </View>
  );
};

const localStyle = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
    borderColor: "#f98640",
    borderWidth: 1,
    marginRight: 20,
    marginBottom: 10,
  },
  name: {
    fontFamily: "inter-bold",
  },
  label: {
    color: "grey",
    fontFamily: "inter-regular",
  },
});

export default MenuItemCard;
