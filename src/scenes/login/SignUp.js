import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  Text,
} from "react-native";

import sty from "_styles";
import firebase from "./FirebaseConfig";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          userRole: "Customer",
          lastLogin: "",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <SafeAreaView style={sty.container}>
      <Text>This is sign up screen</Text>
      <Text>Login Email</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />
      <TouchableHighlight
        style={{
          backgroundColor: "#f98640",
          paddingHorizontal: 110,
          paddingVertical: 20,
          borderRadius: 10,
        }}
        underlayColor="#acacac"
        onPress={() => FirebaseRegister()}
      >
        <Text>Register</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

export default SignUpScreen;
