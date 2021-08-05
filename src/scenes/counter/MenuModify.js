import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useToast } from "react-native-styled-toast";
import { RadioButton } from "react-native-paper";

// import sty from "_styles";
import sty from "../../styles";
import firebase from "../login/FirebaseConfig";
import { fontSize } from "styled-system";

const MenuModifyScreen = ({ navigation }) => {
  const food = navigation.getParam("food");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [localUrl, setLocalUrl] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }

      setName(food.foodName);
      setPrice(food.foodPrice);
      setStatus(food.foodStatus);
      setLocalUrl(food.foodImageUrl);
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setLocalUrl(result.uri);
    }
  };

  const uploadToStorage = async () => {
    let downloadUrl = "";
    if (localUrl == food.foodImageUrl) {
      downloadUrl = localUrl;
    } else {
      const filename = localUrl.substring(localUrl.lastIndexOf("/") + 1);

      let blob = await fetch(localUrl).then((r) => r.blob());

      await firebase.storage().ref(filename).put(blob);

      downloadUrl = await firebase.storage().ref(filename).getDownloadURL();
    }

    await updateFoodFirebase(downloadUrl);
  };

  const updateFoodFirebase = async (downloadUrl) => {
    await firebase
      .firestore()
      .collection("foods")
      .doc(food.id)
      .update({
        foodPrice: price,
        foodName: name,
        foodImageUrl: downloadUrl,
        foodStatus: status,
      })
      .then(() => {
        console.log("Update successfully");
        toast({ message: "Food is updated" });
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err.message);
      });
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
            <Text style={sty.titleText}>Update food</Text>
          </View>
        </View>
        <View style={sty.titleDivider} />
      </View>
      {/* Content */}
      <View style={{ flex: 9 }}>
        <View style={localStyle.image}>
          <TouchableOpacity style={{ flex: 1 }} onPress={pickImage}>
            <Image
              style={localStyle.selectedImage}
              source={{ uri: localUrl }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={localStyle.label}>Food Name</Text>
          <TextInput
            style={localStyle.textInput}
            value={name}
            onChangeText={setName}
          />
          <Text style={localStyle.label}>Price</Text>
          <TextInput
            style={localStyle.textInput}
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
          />
          <View style={{ marginBottom: 15 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <RadioButton
                value="Active"
                status={status == "1" ? "checked" : "unchecked"}
                onPress={() => {
                  setStatus("1");
                }}
              />
              <Text style={sty.normalText}>Active</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <RadioButton
                color="red"
                value="Inactive"
                status={status == "0" ? "checked" : "unchecked"}
                onPress={() => {
                  setStatus("0");
                }}
              />
              <Text style={sty.normalText}>Inactive</Text>
            </View>
          </View>
          <TouchableOpacity
            style={localStyle.button}
            onPress={async () => {
              await uploadToStorage();
            }}
          >
            <Text style={localStyle.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const localStyle = StyleSheet.create({
  image: {
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 10,
    flex: 1,
    marginBottom: 20,
  },
  textInput: {
    alignSelf: "stretch",
    padding: 10,
    paddingBottom: 5,
    marginLeft: 0,
    borderBottomColor: "#474747",
    margin: 20,
    marginTop: 0,
    marginRight: 0,
    borderBottomWidth: 2, // Add this to specify bottom border thickness

    fontFamily: "inter-regular",
    fontSize: 18,
  },
  label: {
    fontFamily: "inter-bold",
    opacity: 0.3,
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
    alignSelf: "center",
  },
  buttonText: {
    fontFamily: "inter-bold",
    color: "#fff",
    justifyContent: "center",
    fontSize: 20,
  },
  selectedImage: {
    flex: 1,
    borderRadius: 10,
    // height: 200,
    // width: 200,
  },
});

export default MenuModifyScreen;
