import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import firebase from "../login/FirebaseConfig";
import sty from "_styles";

const HistoryDetailScreen = ({ navigation }) => {
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
            <Text style={sty.titleText}>History Detail</Text>
          </View>
        </View>
        <View style={sty.titleDivider} />
      </View>
      {/* Content */}
      <View style={{ flex: 13, marginTop: 10 }}>
        <Text style={localStyle.sectionHeader}>Food List</Text>
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
                      1 * $ {item.foodPrice}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <View style={{ flex: 2, marginBottom: 20 }}>
          <Text style={localStyle.sectionHeader}>Summary</Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
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

export default HistoryDetailScreen;
