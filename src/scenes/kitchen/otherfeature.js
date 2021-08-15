import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

import Styles from "../../styles/kitchenStyling"
import sty from "../../styles";

const OtherFeatureTab = ({navigation}) => {

  const showLogOutAlert = () => {
    Alert.alert(
      "Alert",
      "Are you sure you wanna sign out?",
      [
        { text: "No Thanks", onPress: () => {} },
        { text: "Yes", onPress: () => navigation.navigate("Login") },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
<View
      style={[
        sty.container,
      ]}
    >
      
      <View style={{ flex: 9, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={Styles.kitchenButton}
          onPress={() => {
            navigation.navigate("FavMenuTab");
          }}>
          <Text style={Styles.kitchenButtonText}>Popular Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.kitchenButton} onPress={showLogOutAlert}>
          <Text style={Styles.kitchenButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OtherFeatureTab;
