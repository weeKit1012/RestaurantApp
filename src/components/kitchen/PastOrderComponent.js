import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { padding } from "styled-system";
import firebase from "../../scenes/login/FirebaseConfig";
const styles = StyleSheet.create({
  bookItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#AAAAAA",
    borderBottomWidth: 2,
    padding: 5,
    height: 175,
  },
  cover: { flex: 1, height: 150, resizeMode: "contain" },
  info: {
    flex: 3,
    alignItems: "flex-end",
    flexDirection: "column",
    alignSelf: "center",
    padding: 20,
  },
  orderID: { fontSize: 18, marginBottom: 5, fontWeight: "bold" },
  CustomerID: { fontSize: 18, marginBottom: 5 },
  tableLocation: { fontSize: 18, marginBottom: 10 },
  foodComment: {
    fontSize: 12,
    marginBottom: 5,
    fontStyle: "italic",
    color: "#a6a6a6",
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(193, 250, 35,1.0)",
  },

  cardLayout: {
    flexDirection: "row",
    padding: 10,
    height: 150,
    flex: 1,
    margin: 5,
  },

  kitchenCardContainer: {
    borderColor: "black",
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "#000",
    shadowRadius: 10,
    shadowOpacity: 1,
    flex: 1,
    margin: 10,
    borderRadius: 15,
  },

  cardText: {
    flex: 0.4,
  },
});

const PastOrderitem = ({ order }) => {
  const [completionDate, setCompletionDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [orderID, setOrderID] = useState("");
  useEffect(() => {
    try {
      getData();
    } catch (error) {}
  }, []);

  const getData = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(order.userId)
      .get()
      .then((documentSnapshot) => {
        let obj = documentSnapshot.data();

        setCompletionDate(obj.table);
        setCustomer(order.userId);
        setOrderID(order.orderCreatedTime);
      });
  };

  return (
    <View style={styles.kitchenCardContainer}>
      <View style={styles.cardLayout}>
        <Text style={styles.orderID}>OrderID: {orderID} </Text>
        <Text style={styles.CustomerID}>CustomerID: {customer}</Text>
        <Text style={styles.tableLocation}>Complete at: {completionDate}</Text>
      </View>
    </View>
  );
};

export default PastOrderitem;
