//WARNING: DONT SIMPLY MODIFY THIS FILE

import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import sty from "_styles";
import firebase from "./FirebaseConfig";
import { ModalPicker } from "../../components/ModalPicker";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Select a role ...");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool);
  };

  const setData = (option) => {
    setSelectedRole(option);
  };

  const FirebaseRegister = async () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        console.log("Acc created");

        const dbh = firebase.firestore();

        dbh.collection("users").doc(user.uid).set({
          userStatus: "1",
          userRole: selectedRole,
          lastLogin: "",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <SafeAreaView style={sty.container}>
      <View style={localStyle.screenLayout}>
        <View style={localStyle.titleArea}>
          <Text style={[sty.title, localStyle.titleLabel]}>Sign Up</Text>
        </View>
        <View style={localStyle.textArea}>
          <Text style={localStyle.textLabel}>Login Email</Text>
          <TextInput
            style={localStyle.textInput}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
          <Text style={localStyle.textLabel}>Password</Text>
          <TextInput
            style={localStyle.textInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
          />
          <Text style={localStyle.textLabel}>Role</Text>
          <TouchableOpacity
            style={localStyle.touchableOpacity}
            onPress={() => changeModalVisibility(true)}
          >
            <Text style={localStyle.touchableOpacityText}>{selectedRole}</Text>
          </TouchableOpacity>
          <Modal
            transparent={true}
            animationType="fade"
            visible={isModalVisible}
            nRequestClose={() => changeModalVisibility(false)}
          >
            <ModalPicker
              changeModalVisibility={changeModalVisibility}
              setData={setData}
            />
          </Modal>
        </View>
        <View style={localStyle.buttonArea}>
          <TouchableHighlight
            style={localStyle.button}
            underlayColor="#acacac"
            onPress={() => FirebaseRegister()}
          >
            <Text style={localStyle.buttonText}>Register</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={localStyle.button}
            underlayColor="#acacac"
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={localStyle.buttonText}>Back to Login</Text>
          </TouchableHighlight>
        </View>
        <View style={{ flex: 3 }}></View>
      </View>
    </SafeAreaView>
  );
};

const localStyle = StyleSheet.create({
  screenLayout: {
    flex: 1,
    justifyContent: "center",
  },
  titleArea: {
    flex: 2,
    // backgroundColor: "red",
  },
  textArea: {
    flex: 4,
    // backgroundColor: "blue",
  },
  buttonArea: {
    flex: 2,
    // backgroundColor: "green",
  },
  buttonText: {
    fontFamily: "inter-bold",
    color: "#fff",
    justifyContent: "center",
    fontSize: 20,
  },
  button: {
    // flex: 0.4,
    height: 60,
    backgroundColor: "#f98640",
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 40,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    alignSelf: "stretch",
    padding: 10,
    paddingBottom: 5,
    marginLeft: 0,
    borderBottomColor: "#474747",
    margin: 5,
    marginRight: 0,
    borderBottomWidth: 2, // Add this to specify bottom border thickness

    fontFamily: "inter-regular",
    fontSize: 18,
  },
  textLabel: {
    opacity: 0.2,
    fontFamily: "inter-regular",
  },
  titleLabel: {
    marginTop: 40,
  },
  touchableOpacity: {
    backgroundColor: "orange",
    alignSelf: "stretch",
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 20,
  },
  touchableOpacityText: {
    marginVertical: 20,
    fontSize: 18,
  },
});

export default SignUpScreen;
