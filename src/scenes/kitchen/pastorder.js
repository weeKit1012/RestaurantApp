import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View,TouchableOpacity, StyleSheet, FlatList, Alert, Image } from "react-native";
import firebase from "../login/FirebaseConfig";

import sty from "../../styles";
import Styles from "../../styles/kitchenStyling"
import global from "../login/Global";
import PastOrderitem from "../../components/kitchen/PastOrderComponent"; 




const KitchenPastOrderTab = ({ navigation }) => {
  const [userId, setuserId] = useState("");
  const [orderId, setorderId] = useState("");
  const [completeOrderList, setCompleteOrderList] = useState([]);
  const [declineOrderList, setDeclineOrderList] = useState([]);
  KitchenPastOrderTabNavigation = navigation;

  useEffect(() => {
    try {
      var handle = setInterval(getOrderList, 2000);

      return () => {
        clearInterval(handle);
      };
    } catch (error) {}
  }, []);

  const getOrderList = async () => {
    await firebase
      .firestore()
      .collection("orders")
      .where("orderStatus", "==", "3")
      .get()
      .then((querySnapshot) => {
        const orderArray = [];
        querySnapshot.forEach((documentSnapshot) => {
          var obj = documentSnapshot.data();
          obj.id = documentSnapshot.id;
          orderArray.push(obj);
        });
        setCompleteOrderList(orderArray);
      });

      await firebase
      .firestore()
      .collection("orders")
      .where("orderStatus", "==", "4")
      .get()
      .then((querySnapshot) => {
        const orderArray = [];
        querySnapshot.forEach((documentSnapshot) => {
          var obj = documentSnapshot.data();
          obj.id = documentSnapshot.id;
          orderArray.push(obj);
        });
        setDeclinerOrderList(orderArray);
      });
  };

 return(
  <View style={sty.container}>
    <Text style={{ marginLeft:15, fontSize:24, fontWeight:'bold', marginBottom:15}}>Click the order to proceed it</Text>
    <View style={{flex:1, flexDirection:"row"}}>
      <View style={{flex:0.5, padding: 20}}>
        <Text>Completed Order</Text>
      <FlatList
            showsVerticalScrollIndicator={false}
            data={completeOrderList}
            keyExtractor={(order) => order.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("CurrentOrderDetailTab", {
                      order: item,
                      orderId: item.orderCreatedTime,
                      userId: item.userId
                    });
                  }}
                >
                  <PastOrderitem order={item} />
                </TouchableOpacity>
              );
            }}
          />
      </View>

      
      <View style={{flex:0.5, padding: 20}}>
      <Text>Rejected Order</Text>
      <FlatList
            showsVerticalScrollIndicator={false}
            data={declineOrderList}
            keyExtractor={(order) => order.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("CurrentOrderDetailTab", {
                      order: item,
                      orderId: item.orderCreatedTime,
                      userId: item.userId
                    });
                  }}
                >
                  <PastOrderitem order={item} />
                </TouchableOpacity>
              );
            }}
          />
      </View>
    </View>
  </View>
);
};

export let KitchenPastOrderTabNavigation = {};

export default KitchenPastOrderTab;
