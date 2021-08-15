import React, { useEffect, useState } from "react";
import { Text,  View, TouchableOpacity, FlatList } from "react-native";
import sty from "../../styles";
import { useToast } from "react-native-styled-toast";
import firebase from "../login/FirebaseConfig";
import { MaterialIcons} from "@expo/vector-icons";

import OrderItem from "../../components/kitchen/CurrentOrderComponent"; //file 

const KitchenCurrentOrderTab = ({ navigation }) => {
  const { toast } = useToast();
  const [orderList, setOrderList] = useState([]);

  KitchenCurrentOrderTabNavigation = navigation;
  useEffect(() => {
    getOrderList();
}, []);

  const getOrderList = async () => {
    // console.log("called");
    await firebase
      .firestore()
      .collection("orders")
      .where("orderStatus", "==", "1")
      .get()
      .then((querySnapshot) => {
        const orderArray = [];
        querySnapshot.forEach((documentSnapshot) => {
          var obj = documentSnapshot.data();
          var id = documentSnapshot.id;
          obj.id = documentSnapshot.id;

          orderArray.push(obj);
        });
        setOrderList(orderArray);
      });
  };

return(
  <View style={sty.container}>
    <View style={{flexDirection:'row'}}>
    <Text style={{ marginLeft:15, fontSize:24, fontWeight:'bold', marginBottom:15, justifyContent:'flex-start'}}>Click the order to proceed it</Text>
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

    <View style={{flex:0.9}}>
     <FlatList
            showsVerticalScrollIndicator={false}
            data={orderList}
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
                  <OrderItem order={item} />
                </TouchableOpacity>
              );
            }}
          /></View>
  </View>
);
  
};

export let KitchenCurrentOrderTabNavigation = {};
export default KitchenCurrentOrderTab;
