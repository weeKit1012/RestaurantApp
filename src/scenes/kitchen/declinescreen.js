import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert, Image } from "react-native";

import { useToast } from "react-native-styled-toast";
import Styles from "../../styles/kitchenStyling"
import firebase from "../login/FirebaseConfig";

const DeclineScreen = ({navigation}) => {
  const [orderDetail, setorderDetail] = useState([]);
  const [reasonValue, setReasonValue] = useState("")
  const orderId = navigation.getParam("orderID");
  const userId = navigation.getParam("userID");
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      const tempArray = [];
      await firebase
      .firestore()
      .collection("orders")
      .where(firebase.firestore.FieldPath.documentId(), "==", orderId)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const obj = doc.data();
            tempArray.push(obj);
            tempTest.push(doc.data());
            console.log(doc.data());
          });
        }
        setorderDetail(tempArray)

      })
      .catch((error) => {
        console.log(error);
      });
  }
  fetchData();
  }, []);

  
  const declineOrder = async () => { 
    let reason = reasonValue;
    {reasonValue == "" ?(
      await firebase
      .firestore()
      .collection("orders")
      .doc(orderId)
      .update({ orderStatus: "4", rejectReason: "Rejected by kitchen" })
      .then(() => {
        console.log("Order rejected" + reason);
        toast({ message: "This order status is updated" });
        navigation.popToTop();
      })
    ): (
      await firebase
      .firestore()
      .collection("orders")
      .doc(orderId)
      .update({ orderStatus: "4", rejectReason: reason })
      .then(() => {
        console.log("Order rejected" + reason);
        toast({ message: "This order status is updated" });
        navigation.popToTop();
      })
    )}

    }
    

  return (
    <SafeAreaView style={Styles.kitchenOrderContainer}>
    <View style={Styles.kitchenDetailsOrderHeaderContainer, {flex: 0.15, backgroundColor:'#ff9966'}}>
    <Text style={{fontSize:24, fontWeight:'bold'}}>Order Rejection for</Text>
    <Text style={{fontSize:24, fontWeight:'bold'}}>Order Id: {orderId} </Text>
    <Text style={{fontSize:24, fontWeight:'bold'}}>CustomerID: {JSON.stringify(userId)} </Text>
    </View>
      <View style={{flex: 0.6, marginTop: 18}}>
      <Text style={{fontSize: 18}}>Reason: </Text>
      <TextInput style={Styles.kitchenTextInput} onChangeText={reasonValue => setReasonValue(reasonValue)} value={reasonValue} placeholder="Put your reason here"></TextInput>
      <View style={{alignItems: "center", backgroundColor: "transparent", marginTop: 24}}>
      <TouchableOpacity
            style={Styles.kitchenButton }
            onPress={declineOrder}
            >
              <Text style={Styles.kitchenButtonText}>
                Proceed to cancel
              </Text>
            </TouchableOpacity>
            </View>
            </View>
    </SafeAreaView>
  );
};


export default DeclineScreen;
