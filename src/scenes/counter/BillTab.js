import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import sty from "_styles";
import global from "../login/Global";
import firebase from "../login/FirebaseConfig";
import OrderitemCard from "../../components/counter/OrderItemCard";

const CounterBillTab = ({ navigation }) => {
  const user = global.user;
  const [orderList, setOrderList] = useState([]);

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
      .where("orderStatus", "==", "2")
      .orderBy("orderCreatedTime", "desc")
      .get()
      .then((querySnapshot) => {
        const orderArray = [];
        querySnapshot.forEach((documentSnapshot) => {
          var obj = documentSnapshot.data();
          obj.id = documentSnapshot.id;
          orderArray.push(obj);
        });

        // console.log(orderArray);
        setOrderList(orderArray);
      });
  };

  return (
    <View style={sty.container}>
      {/* Header */}
      <View style={{ flex: 1, marginTop: 10, backgroundColor: "transparent" }}>
        <Text style={sty.titleText}>
          Bill <AntDesign name="bank" size={24} color="black" />
        </Text>
        <View style={sty.titleDivider} />
      </View>
      {/* Content */}
      <View style={{ flex: 13 }}>
        <Text style={localStyle.sectionHeader}>Completed Order</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={orderList}
          keyExtractor={(order) => order.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("OrderDetailScreen", {
                    order: item,
                  });
                }}
              >
                <OrderitemCard order={item} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={{ height: 50 }} />
    </View>
  );
};

const localStyle = StyleSheet.create({
  sectionHeader: {
    fontFamily: "inter-bold",
    fontSize: 20,
  },
});

export default CounterBillTab;
