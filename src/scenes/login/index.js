//WARNING: DONT SIMPLY MODIFY THIS FILE

import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableHighlight,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import { Root } from "react-native-popup-confirm-toast";

import sty from "_styles";
import firebase from "./FirebaseConfig";
import global from "./Global";
import { bottomToast } from "_utils/ToastMessage";
import { unixToLocale } from "../../utils/TimeConverter";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [route, setRoute] = useState(null);

  let userId = "";
  let userObj = {};

  const login = async () => {
    try {
      await firebaseAuth();
      await updateTimestamp();
      await firestoreGet();
    } catch (error) {
      console.log(error.message);
    }
  };

  const firebaseAuth = async () => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;

        userId = user.uid;
      })
      .catch((err) => {
        var errorCode = err.code;
        console.log(errorCode + ": " + err.message);
      });
  };

  const firestoreGet = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((documentSnapshot) => {
        userObj = documentSnapshot.data();
        userObj.userId = userId;

        setUser(userObj);

        if (userObj.userRole == "Counter") {
          setRoute("CounterTab");
        }
        if (userObj.userRole == "Kitchen") {
          setRoute("KitchenHomeScreen");
        }
        if (userObj.userRole == "Customer") {
          setRoute("CustomerHomeScreen");
        }
      })
      .catch((err) => {
        var errorCode = err.code;
        console.log(errorCode + ": " + err.message);
      });
  };

  const updateTimestamp = async () => {
    let currentTime = Math.floor(new Date().getTime() / 1000.0);
    await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .update({ lastLogin: currentTime })
      .then(() => {
        console.log("Timestamp updated!");
      });
  };

  useEffect(() => {
    if (route != null) {
      global.user = user;
      navigation.navigate(route, { userObj: user });
    }
  }, [route]);

  return (
    <Root>
      <SafeAreaView style={sty.container}>
        <View style={localStyle.iconArea}>
          <View style={{ flex: 0.1 }}></View>
          <View style={{ flex: 0.4 }}>
            <Image
              source={require("../../assets/images/chef_icon.png")}
              style={{ height: 50, width: 50 }}
            />
          </View>
          <View style={{ flex: 0.1 }}></View>

          <View style={{ flex: 0.4 }}>
            <Text style={sty.title}>Sign In</Text>
          </View>
        </View>
        <View style={localStyle.textArea}>
          <TextInput
            style={localStyle.textInput}
            value={email}
            onChangeText={setEmail}
            placeholder="Login ID"
          />
          <TextInput
            style={localStyle.textInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        <View style={localStyle.buttonArea}>
          <TouchableHighlight
            onPress={() => login()}
            style={localStyle.button}
            underlayColor="#acacac"
          >
            <Text style={localStyle.buttonText}>Sign In</Text>
          </TouchableHighlight>

          <View style={{ flex: 0.2 }}>
            <View style={{ flex: 4 }}></View>
            <View
              style={{ flex: 3, flexDirection: "row", alignItems: "center" }}
            >
              <View style={localStyle.divider} />
              <View>
                <Text style={{ width: 50, textAlign: "center", opacity: 0.5 }}>
                  OR
                </Text>
              </View>
              <View style={localStyle.divider} />
            </View>
            <View style={{ flex: 4 }}></View>
          </View>

          <TouchableHighlight
            style={localStyle.button}
            underlayColor="#acacac"
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={localStyle.buttonText}>Go to Register</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    </Root>
  );
};

const localStyle = StyleSheet.create({
  iconArea: {
    flex: 0.2,
    flexDirection: "column",
    // backgroundColor: "green",
  },
  textArea: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  buttonArea: {
    flex: 0.2,
    flexDirection: "column",
    // backgroundColor: "cyan",
  },
  button: {
    flex: 0.4,
    backgroundColor: "#f98640",
    paddingHorizontal: 0,
    paddingVertical: 0,
    // borderWidth: 2,
    borderRadius: 40,
    // borderColor: "#f98640",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "inter-bold",
    color: "#fff",
    justifyContent: "center",
    fontSize: 20,
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
  divider: { flex: 1, height: 1, backgroundColor: "black", opacity: 0.2 },
});

export default LoginScreen;
