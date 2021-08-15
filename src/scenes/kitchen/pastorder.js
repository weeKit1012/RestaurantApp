import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View,TouchableOpacity,  FlatList } from "react-native";
import firebase from "../login/FirebaseConfig";
import {MaterialIcons} from "@expo/vector-icons";
import sty from "../../styles";

import {PastOrderitem, PastOrderitemDecline} from "../../components/kitchen/PastOrderComponent"; 


const KitchenPastOrderTab = ({ navigation, Component }) => {
  const [completeOrderList, setCompleteOrderList] = useState([]);
  const [declineOrderList, setDeclineOrderList] = useState([]);
  KitchenPastOrderTabNavigation = navigation;

  useEffect(() => {
    getOrderList();
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
          orderArray.push(obj)
        });
        setDeclineOrderList(orderArray);
      });
  };

  //add the button to load it
 return(
  <View style={sty.container}>
    <View style={{flexDirection:'row'}}>

<Text style={{ marginLeft:15, fontSize:24, fontWeight:'bold', marginBottom:5, justifyContent:'flex-start'}}>Click the order to proceed it</Text>
<MaterialIcons.Button
            name="refresh"
            size={24}
            color="black"
            backgroundColor="transparent"
            borderRadius={20}
            onPress={() => {
              getOrderList();
            }}
          />
                     
        </View>
    <View style={{flexDirection:"row"}}>
      <View style={{flex:0.5, padding: 20}}>
        <Text style={{fontSize:24, margin:10}}>Completed Order</Text>
        <View style={{flexDirection:"column", flex:0.7}}>
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
                      orderId: item.orderID,
                      userId: item.userId
                    });
                  }}
                >
                  <PastOrderitem order={item} />
                </TouchableOpacity>
              );
            }}
          />
      </View></View>

      
      <View style={{flex:0.5, padding: 20}}>
      <Text style={{fontSize:24, margin:15}}>Rejected Order</Text>
      <View style={{flexDirection:"column", flex:0.7}}>
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
                      orderId: item.orderID,
                      userId: item.userId
                    });
                  }}
                >
                  <PastOrderitemDecline order={item} />
                </TouchableOpacity>
              );
            }}
          />
          </View>
      </View>
    </View>
  </View>
);
};

export let KitchenPastOrderTabNavigation = {};

export default KitchenPastOrderTab;
