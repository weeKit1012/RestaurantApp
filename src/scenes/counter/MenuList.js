import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import sty from "_styles";
import firebase from "../login/FirebaseConfig";
import MenuItemCard from "../../components/counter/MenuItemCard";
import SearchBar from "../../components/counter/SearchBar";

const MenuListScreen = ({ navigation }) => {
  const [results, setResults] = useState([]);
  const [fullList, setFullList] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    try {
      console.log("run");
      getFoodsFromFirebase();
    } catch (error) {}
  }, []);

  const getFoodsFromFirebase = async () => {
    await firebase
      .firestore()
      .collection("foods")
      .get()
      .then((querySnapshot) => {
        const foodArray = [];
        querySnapshot.forEach((documentSnapshot) => {
          var obj = documentSnapshot.data();
          obj.id = documentSnapshot.id;
          foodArray.push(obj);
        });

        setResults(foodArray);
        setFullList(foodArray);
      });
  };

  const filterResults = () => {
    if (term.length == 0) {
      setResults(fullList);
    } else {
      let arrayFiltered = results.filter((result) =>
        result.foodName.toLowerCase().includes(term.toLowerCase())
      );

      setResults(arrayFiltered);
    }
  };

  return (
    <View style={sty.container}>
      {/* Header */}
      <View style={{ flex: 1, marginTop: 10, backgroundColor: "transparent" }}>
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
            <Text style={sty.titleText}>Menu List</Text>
          </View>
          <TouchableOpacity
            style={{ marginTop: 5 }}
            onPress={() => {
              navigation.navigate("MenuAddScreen");
            }}
          >
            <Ionicons name="add-circle-outline" size={30} color="#f98640" />
          </TouchableOpacity>
        </View>
        <View style={sty.titleDivider} />
      </View>
      {/* Content */}
      <View
        style={{
          flex: 9,
          alignItems: "stretch",
          backgroundColor: "transparent",
          marginBottom: 50,
        }}
      >
        <View style={{ marginBottom: 20, backgroundColor: "transparent" }}>
          <SearchBar
            term={term}
            onTermChange={(newTerm) => setTerm(newTerm)}
            onTermSubmit={() => {
              filterResults();
            }}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={results}
          keyExtractor={(result) => result.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MenuModifyScreen", { food: item });
                }}
              >
                <MenuItemCard result={item} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

const localStyle = StyleSheet.create({
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

export default MenuListScreen;
