import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import sty from "_styles";
import firebase from "_scenes/login/FirebaseConfig";

const OrderDetailScreen = ({ navigation }) => {
  const order = navigation.getParam("order");

  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    const tempArray = [];
    order.orderFoods.forEach((id) => {
      //   getFoods(id);
      async function fetchData() {
        await firebase
          .firestore()
          .collection("foods")
          .doc(id)
          .get()
          .then((documentSnapshot) => {
            // setFoodList([...foodList, documentSnapshot.data()]);
            let obj = documentSnapshot.data();
            obj.id = id;
            tempArray.push(obj);
            // console.log(tempArray);
            setFoodList(tempArray);
          });
      }

      fetchData();
    });
  }, []);

  const updateOrderStatus = async () => {
    let newStatus = "";
    let currentTime = "";
    if (order.orderStatus == "0") {
      newStatus = "1";
    } else {
      newStatus = "3";
      currentTime = Math.floor(new Date().getTime() / 1000.0);
    }

    await firebase
      .firestore()
      .collection("orders")
      .doc(order.id)
      .update({ orderStatus: newStatus, orderCompletedTime: currentTime })
      .then(() => {
        console.log("Update status");
        navigation.goBack();
      });
  };

  const rejectOrder = async () => {
    let reason = "Out of stock";

    await firebase
      .firestore()
      .collection("orders")
      .doc(order.id)
      .update({ orderStatus: "4", rejectReason: reason })
      .then(() => {
        console.log("Order rejected");
        navigation.goBack();
      });
  };

  const showUpdateAlert = () => {
    Alert.alert(
      "Alert",
      "Confirm to proceed the order?",
      [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Yes",
          onPress: () => updateOrderStatus(),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const showRejectAlert = () => {
    Alert.alert(
      "Alert",
      "Confirm to reject the order?",
      [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Yes",
          onPress: () => rejectOrder(),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <View style={sty.container}>
      {/* Header */}
      <View style={{ flex: 1, marginTop: 10 }}>
        <View style={{ flexDirection: "row", backgroundColor: "transparent" }}>
          <View style={{ flex: 5, flexDirection: "row" }}>
            <TouchableOpacity
              style={{ marginRight: 10, marginTop: 5 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="arrow-back-outline" size={30} color="grey" />
            </TouchableOpacity>
            <Text style={sty.titleText}>Order Detail</Text>
          </View>
        </View>
        <View style={sty.titleDivider} />
      </View>
      {/* Content */}
      <View style={{ flex: 9 }}>
        <Text style={localStyle.sectionHeader}>Order List</Text>
        <View style={{ flex: 2, backgroundColor: "transparent" }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={foodList}
            keyExtractor={(food) => food.id}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "transparent",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <Text style={[sty.normalText, {}]}>{item.foodName}</Text>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        sty.normalText,
                        {
                          alignSelf: "flex-end",
                        },
                      ]}
                    >
                      1
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={localStyle.sectionHeader}>Summary</Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={[
                sty.normalText,
                { flex: 1, backgroundColor: "transparent" },
              ]}
            >
              Total Amount
            </Text>
            <Text style={[sty.normalText]}>$ {order.orderTotal}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={[
                sty.normalText,
                { flex: 1, backgroundColor: "transparent" },
              ]}
            >
              Quantity
            </Text>
            <Text style={[sty.normalText]}>{order.orderFoods.length}</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1.5,
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          {order.orderStatus != "1" ? (
            <TouchableOpacity
              style={localStyle.button}
              onPress={showUpdateAlert}
            >
              <Text style={localStyle.buttonText}>
                {order.orderStatus == 0 ? "Accept" : "Done"}
              </Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
          {order.orderStatus == 2 ? (
            <View />
          ) : (
            <TouchableOpacity
              style={localStyle.button}
              onPress={showRejectAlert}
            >
              <Text style={localStyle.buttonText}>Decline</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const localStyle = StyleSheet.create({
  sectionHeader: {
    fontFamily: "inter-bold",
    fontSize: 20,
  },
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
  buttonText: {
    fontFamily: "inter-bold",
    color: "#fff",
    justifyContent: "center",
    fontSize: 20,
  },
});

export default OrderDetailScreen;
