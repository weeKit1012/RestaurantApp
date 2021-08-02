import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import firebase from "_scenes/login/FirebaseConfig";
import sty from "_styles";
import { unixToLocale } from "../../utils/TimeConverter";

const HistoryItemCard = ({ order }) => {
  const [table, setTable] = useState("");
  useEffect(() => {
    try {
      getTable();
    } catch (error) {}
  }, []);

  const getTable = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(order.userId)
      .get()
      .then((documentSnapshot) => {
        let obj = documentSnapshot.data();

        setTable(obj.table);
      });
  };

  return (
    <View style={localStyle.card}>
      <Ionicons name="fast-food-outline" style={localStyle.icon} />
      <View
        style={{
          flexDirection: "column",
          backgroundColor: "transparent",
          flex: 1,
          alignItems: "center",
        }}
      >
        <Text style={sty.normalText}>From Table {table}</Text>
        <Text style={localStyle.blurLabel}>
          {unixToLocale(order.orderCompletedTime)}
        </Text>
      </View>
    </View>
  );
};

const localStyle = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#CFCFCF",
    height: 100,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 50,
    color: "black",
    marginHorizontal: 20,
  },
  blurLabel: {
    fontFamily: "inter-bold",
    opacity: 0.3,
    fontSize: 9,
  },
});

export default HistoryItemCard;
