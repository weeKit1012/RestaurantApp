import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View,TouchableOpacity, StyleSheet, FlatList, Alert, Image } from "react-native";
import firebase from "../login/FirebaseConfig";

// import sty from "_styles";
import sty from "../../styles";
import Styles from "../../styles/kitchenStyling"
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { styles } from "styled-system";


const CurrentOrderDetail = ({ navigation }) => {
  const order = navigation.getParam("order");
  const orderId = navigation.getParam("orderId");
  const userId = navigation.getParam("userId");
  const [foodList, setFoodList] = useState([]);
  useEffect(() => {
    const tempArray = [];
    order.orderFoods.forEach((id) => {
      async function fetchData() {
        await firebase
          .firestore()
          .collection("foods")
          .doc(id)
          .get()
          .then((documentSnapshot) => {
            let obj = documentSnapshot.data();
            obj.id = id;
            tempArray.push(obj);
            setFoodList(tempArray);
          });
      }

      fetchData();
    });
  }, []);


  const updateOrderStatus = async () => {
    
    let currentTime = "";
    currentTime = Math.floor(new Date().getTime() / 1000.0);

    await firebase
      .firestore()
      .collection("orders")
      .doc(order.id)
      .update({ orderStatus: "2", orderCompletedTime: currentTime })
      .then(() => {
        navigation.goBack();
      });
  }

  const declineOrderStatus = async () => { 
    let reason = "Rejected by Kitchen side";
    await firebase
      .firestore()
      .collection("orders")
      .doc(order.id)
      .update({ orderStatus: "4", rejectReason: reason })
      .then(() => {
        console.log("Order rejected");
        navigation.goBack();
      });
  }

  return (
    <SafeAreaView style={Styles.kitchenOrderContainer}>
      <View style={Styles.kitchenDetailsOrderHeaderContainer}>
      <Text style={{fontSize:24, fontWeight:'bold'}}>Order Id: {JSON.stringify(orderId)} </Text>
      <Text style={{fontSize:24, fontWeight:'bold'}}>CustomerID: {JSON.stringify(userId)} </Text>
      </View>
      
      <View style={{flex: 0.7}}>
      <FlatList
            showsVerticalScrollIndicator={false}
            data={foodList}
            keyExtractor={(food) => food.id}
            renderItem={({ item }) => {
              return (
                <View style={Styles.kitchenOrderDetailCardContainer}> 
                <View style={{flex:0.2, height:120, padding: 10}}>
                <Image style={{ resizeMode:'contain', height:100}} source={item.foodImageUrl}/></View>
                <View style={{flex:0.6, height:120, padding:10, flexDirection:'column'}}>
                <Text style={{flex: 0.4, fontSize:24}}>{item.foodName}</Text>
                <Text style={{flex: 0.3, fontSize:18}}>Price: RM. {item.foodPrice}</Text>
                <Text style={{flex: 0.3, fontSize:18}}>Order Quantity: 1 </Text></View>
                </View>
                
              )}
            }
          />
      </View>

      <View style={{flex:0.3}}>
        <Text style={{fontSize:24, fontWeight:'bold'}}>Total Price: RM {order.orderTotal} </Text>
        <View style = {{flexDirection:'row', alignContent:'center', justifyContent:'center'}}>
            {order.orderStatus == "1" ? (
            <View style={{flexDirection:"row"}}>
            <TouchableOpacity
            style={StyleLocal.button }
              onPress={updateOrderStatus}
              
            >
              <Text style={StyleLocal.buttonText}>
                Proceed Order
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={StyleLocal.buttonReject }
              onPress={declineOrderStatus}>
              <Text style={StyleLocal.buttonText}>
                Decline Order
              </Text>
            </TouchableOpacity>
            </View>
            
          ) : (
            <Text>This order is completed</Text>
          )}

            </View>
      </View>
</SafeAreaView>
  );
};

const StyleLocal = StyleSheet.create({
  button: {
    height: 60,
    width: 250,
    backgroundColor: "#f98640",
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 40,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonReject: {
    height: 60,
    width: 250,
    backgroundColor: "red",
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 40,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "inter-bold",
    color: "#fff",
    justifyContent: "center",
    fontSize: 20,
  },
});

export default CurrentOrderDetail;
