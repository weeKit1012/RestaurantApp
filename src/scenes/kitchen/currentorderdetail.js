import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View,TouchableOpacity, StyleSheet, FlatList, Alert, Image } from "react-native";
import firebase from "../login/FirebaseConfig";
import { unixToLocale } from "../../utils/TimeConverter";
import { useToast } from "react-native-styled-toast";
import Styles from "../../styles/kitchenStyling"


const CurrentOrderDetail = ({ navigation }) => {
  const order = navigation.getParam("order");
  const userId = navigation.getParam("userId");
  const [foodList, setFoodList] = useState([]);
  const orderId = order.id
  const { toast } = useToast();
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
    const increment = firebase.firestore.FieldValue.increment(1);
    let currentTime = "";
    currentTime = Math.floor(new Date().getTime() / 1000.0);
    order.orderFoods.forEach((id) => {
      async function fetchData() {
        await firebase
          .firestore()
          .collection("foods")
          .doc(id)
          .update({foodPopularity: increment})
          .then(() => {
            toast({ message: "This order status is updated" });
          });
          }
          fetchData();
    });

    await firebase
      .firestore()
      .collection("orders")
      .doc(order.id)
      .update({ orderStatus: "2", orderCompletedTime: currentTime})
      .then(() => {      
        navigation.goBack();
      });
  }



  return (
    <SafeAreaView style={Styles.kitchenOrderContainer}>
      <View style={{flex:0.9}}>
      <View style={Styles.kitchenDetailsOrderHeaderContainer}>
      <Text style={{fontSize:24, fontWeight:'bold'}}>Order Id: {order.id} </Text>
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
            <View
          style={{
            flex: 1.5,
            alignItems: "center",
            backgroundColor: "transparent",
            flexDirection:'row', alignContent:'center', justifyContent:'center'
          }}
        >
          {order.orderStatus == "1" ? (
            <View style={{flexDirection:"row"}}>
            <TouchableOpacity
            style={Styles.kitchenButton }
              onPress={updateOrderStatus}
            >
              <Text style={Styles.kitchenButtonText}>
                Proceed Order
              </Text>
            </TouchableOpacity>
            

            <TouchableOpacity
            style={Styles.buttonReject }
                  onPress={() => {
                    navigation.navigate("DeclineScreen", {
                      orderID: orderId,
                      userID: userId,
                    });
                  }}
                >
                  <Text style={Styles.kitchenButtonText}>
                Decline Order
              </Text>
                </TouchableOpacity>
            </View>
          ) : (
            <View />
          )}
          {order.orderStatus == "3" ? (
            <Text style={{fontSize:18}}>This order was completed at {unixToLocale(order.orderCompletedTime)}</Text>
          ) : (
            <View/>
          )}
          {order.orderStatus == "4" ? (
            <View>
            <Text style={{fontSize:18}}>This order was decline</Text>
            <Text style={{fontSize:18}}>Cancel reason : {order.rejectReason}</Text>
            </View>
          ) : (
            <View/>
          )}
        </View>
      </View>
      </View>
</SafeAreaView>
  );
};


export default CurrentOrderDetail;
