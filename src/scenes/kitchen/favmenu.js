import * as React from "react";
import { Text, View } from "react-native";

function FavMenuTab() {
  return (
    <SafeAreaView style={Styles.container}>
      <TouchableHighlight onPress={() => navigation.navigate("Login")}>
        <Text style={Styles.subTitle}>Go to Login</Text>
      </TouchableHighlight>

      
      <Text style={Styles.title}>{user.userId}</Text>
      <Text style={Styles.title}>{user.lastLogin}</Text>
    </SafeAreaView>
  );
}

export default FavMenuTab;
