import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import sty from "_styles";
import global from "_scenes/login/Global";
import firebase from "../login/FirebaseConfig";
import HistoryItemCard from "../../components/counter/HistoryItemCard";

const CounterHistoryTab = ({ navigation }) => {
  const user = global.user;
  const [orderList, setOrderList] = useState([]);

  // CounterHistoryTabNavigation = navigation;

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
      .where("orderStatus", "==", "3")
      .orderBy("orderCompletedTime", "desc")
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
          History <MaterialIcons name="history-edu" size={24} color="black" />
        </Text>
        <View style={sty.titleDivider} />
      </View>
      {/* Content */}
      <View style={{ flex: 13, marginTop: 10 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={orderList}
          keyExtractor={(order) => order.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("HistoryDetailScreen", {
                    order: item,
                  });
                }}
              >
                <HistoryItemCard order={item} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={{ height: 50 }} />
    </View>
  );
};

const localStyle = StyleSheet.create({});

// export let CounterHistoryTabNavigation = {};

export default CounterHistoryTab;
