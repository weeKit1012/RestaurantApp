import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import sty from "../../styles";
import firebase from "../login/FirebaseConfig";
import OrderitemCard from "../../components/counter/OrderItemCard";

const CounterOrderTab = ({ navigation }) => {
  const [orderList, setOrderList] = useState([]);
  const [processList, setProcessList] = useState([]);

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
      .where("orderStatus", "==", "0")
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

    await firebase
      .firestore()
      .collection("orders")
      .where("orderStatus", "in", ["1"])
      .get()
      .then((querySnapshot) => {
        const processArray = [];
        querySnapshot.forEach((documentSnapshot) => {
          var obj = documentSnapshot.data();
          obj.id = documentSnapshot.id;
          processArray.push(obj);
        });

        // console.log(orderArray);
        setProcessList(processArray);
      });
  };

  return (
    <View style={sty.container}>
      {/* Header */}
      <View style={{ flex: 1, marginTop: 10, backgroundColor: "transparent" }}>
        <Text style={sty.titleText}>
          Order <Ionicons name="fast-food-outline" size={24} color="black" />
        </Text>
        <View style={sty.titleDivider} />
      </View>
      {/* Content */}
      <View style={{ flex: 13 }}>
        <View style={{ flex: 1 }}>
          <Text style={localStyle.sectionHeader}>Pending Order</Text>
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
        <View style={{ flex: 1, marginTop: 5 }}>
          <Text style={localStyle.sectionHeader}>Process Order</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={processList}
            keyExtractor={(order) => order.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("OrderDetailScreen", { order: item });
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
    </View>
  );
};

const localStyle = StyleSheet.create({
  sectionHeader: {
    fontFamily: "inter-bold",
    fontSize: 20,
  },
});

export default CounterOrderTab;
