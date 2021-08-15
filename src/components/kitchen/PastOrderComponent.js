import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { padding } from "styled-system";
import firebase from "../../scenes/login/FirebaseConfig";
import { unixToLocale } from "../../utils/TimeConverter";
const styles = StyleSheet.create({
 
  orderID: { fontSize: 12, marginBottom: 5, fontWeight:'bold' },
  CustomerID: { fontSize: 12, marginBottom: 5 },
  tableLocation: { fontSize: 12, marginBottom: 10 },
  foodComment:{ fontSize:8, marginBottom:5, fontStyle:'italic', color:'#a6a6a6'},
 
  cardLayout:{
    flexDirection: "horizontal",
    padding:10,
    height:150,
    flex:1,
    margin:5,
  },

  kitchenCardContainer:{
    borderColor:'black', 
    borderWidth:1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 1,
    flex:1,
    margin:10,
    borderRadius:15,
  },
});

const PastOrderitem = ({ order }) => {
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
        <View style={styles.kitchenCardContainer}>
        <View style={styles.cardLayout}>
            <Text style={styles.orderID}>OrderID: {order.id} </Text>
            <Text style={styles.CustomerID}>CustomerID: {order.userId}</Text>
            <Text style={styles.foodComment}>Complete at: {unixToLocale(order.orderCompletedTime)} for table no: {table}</Text>            

        </View></View>
    );
  };

  const PastOrderitemDecline = ({ order }) => {
    // const [completionDate, setCompletionDate] = useState("");
    // const [customer, setCustomer] = useState("");
    // const [orderID, setOrderID] = useState("");
    // const [reason, setReason] = useState("");
    // useEffect(() => {
    //   try {
    //     getData();
    //   } catch (error) {}
    // }, []);
  
    // const getData = async () => {
    //   await firebase
    //     .firestore()
    //     .collection("users")
    //     .doc(order.userId)
    //     .get()
    //     .then((documentSnapshot) => {
    //       let obj = documentSnapshot.data();
    //       setCompletionDate(obj.table);
    //       setCustomer(order.userId);
    //       setOrderID(order.orderCreatedTime);
    //       setReason(order.rejectReason);
    //     });
    // };
  
    return (
        <View style={styles.kitchenCardContainer}>
        <View style={styles.cardLayout}>
            <Text style={styles.orderID}>OrderID: {order.id} </Text>
            <Text style={styles.CustomerID}>CustomerID: {order.userId}</Text>
            <Text style={styles.foodComment}>Reason: {order.rejectReason}</Text>            

        </View></View>
    );
  };

export {PastOrderitem, PastOrderitemDecline};


