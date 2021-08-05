import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  SectionList,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import sty from "../../styles";
import { useToast } from "react-native-styled-toast";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import firebase from "../login/FirebaseConfig";

import OrderItem from "../../components/kitchen/CurrentOrderComponent"; //file

const KitchenCurrentOrderTab = ({ navigation }) => {
  const { toast } = useToast();
  const [userId, setuserId] = useState("");
  const [orderId, setorderId] = useState("");
  const [orderList, setOrderList] = useState([]);

  KitchenCurrentOrderTabNavigation = navigation;

  useEffect(() => {
    try {
      var handle = setInterval(getOrderList, 5000);

      return () => {
        clearInterval(handle);
      };
    } catch (error) {}
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
          obj.id = documentSnapshot.id;
          orderArray.push(obj);
        });
        setOrderList(orderArray);
      });
  };

  return (
    <View style={sty.container}>
      <Text
        style={{
          marginLeft: 15,
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 15,
        }}
      >
        Click the order to proceed it
      </Text>
      <View style={{ flex: 0.9 }}>
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
                    orderId: item.orderCreatedTime,
                    userId: item.userId,
                  });
                }}
              >
                <OrderItem order={item} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export let KitchenCurrentOrderTabNavigation = {};
export default KitchenCurrentOrderTab;
