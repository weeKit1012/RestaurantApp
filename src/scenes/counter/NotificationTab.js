import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useToast } from "react-native-styled-toast";

// import sty from "_styles";
import sty from "../../styles";
import firebase from "../login/FirebaseConfig";

const CounterNotificationTab = () => {
  const [listLength, setListLength] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    try {
      var handle = setInterval(getOrderList, 5000);

      return () => {
        clearInterval(handle);
      };
    } catch (error) {}
  }, []);

  // useMemo(() => {
  //   toast({ message: "Go Kitchen" });
  // }, [listLength]);

  const getOrderList = async () => {
    await firebase
      .firestore()
      .collection("orders")
      .where("orderStatus", "==", "2")
      .get()
      .then((querySnapshot) => {
        const orderArray = [];
        querySnapshot.forEach((documentSnapshot) => {
          var obj = documentSnapshot.data();
          obj.id = documentSnapshot.id;
          orderArray.push(obj);
        });

        setListLength(orderArray.length);
      });
  };

  return (
    <View style={sty.container}>
      <View style={{ flex: 1, marginTop: 10, backgroundColor: "transparent" }}>
        <Text style={sty.titleText}>
          Notification{" "}
          <Ionicons
            name="notifications-circle-outline"
            size={24}
            color="black"
          />
        </Text>
        <View style={sty.titleDivider} />
      </View>
      <View style={{ flex: 13, marginTop: 10 }}>
        <FlatList />
      </View>
    </View>
  );
};

const localStyle = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
  },
  // titleText: {
  //   fontFamily: "inter-bold",
  //   fontSize: 30,
  // },
  // titleDivider: {
  //   marginTop: 5,
  //   height: 1,
  //   backgroundColor: "black",
  //   opacity: 0.2,
  // },
});

export default CounterNotificationTab;
