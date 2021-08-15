import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import firebase from "../../scenes/login/FirebaseConfig";
import { unixToLocale } from "../../utils/TimeConverter";
const styles = StyleSheet.create({
  
  orderID: { fontSize: 18, marginBottom: 5, fontWeight:'bold' },
  CustomerID: { fontSize: 18, marginBottom: 5 },
  tableLocation: { fontSize: 18, marginBottom: 10 },
  foodComment:{ fontSize:12, marginBottom:5, fontStyle:'italic', color:'#a6a6a6'},

  cardLayout: {
    flexDirection: "row",
    padding: 10,
    height: 150,
    flex: 1,
    margin: 5,
  },
  
  kitchenCardContainer:{
    borderColor:'black', 
    borderWidth:1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 1,
    flex: 1,
    margin: 10,
    borderRadius: 15,
  },

});

const Orderitem = ({ order }) => {
    const [table, setTable] = useState("");
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

        setTable(obj.table);
      });
    };
  
    return (
        <View style={styles.kitchenCardContainer}>
        <View style={styles.cardLayout}>
            <Text style={styles.orderID}>Created At: {unixToLocale(order.orderCreatedTime)} </Text>
            <Text style={styles.CustomerID}>CustomerID: {order.userId}</Text>
            <Text style={styles.tableLocation}>Table no: {table}</Text>            
        </View></View>
    );
  };

export default Orderitem;
