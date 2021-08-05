import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
const styles = StyleSheet.create({
  bookItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#AAAAAA",
    borderBottomWidth: 2,
    padding: 5,
    height: 175,
  },
  cover: { flex: 1, height: 150, resizeMode: "contain" },
  info: {
    flex: 3,
    alignItems: "flex-end",
    flexDirection: "column",
    alignSelf: "center",
    padding: 20,
  },
  author: { fontSize: 18, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(193, 250, 35,1.0)",
  },

  cardLayout:{
    flexDirection: "row",
    padding:20,
    height:300,
  },

  cardImage:{
    flex:0.4,
    marginRight:10,
    resizeMode: 'contain'
  },
  cardContent:{
    flex:0.6,
    marginLeft:10,
    flexDirection:"column"
  },
});

class KitchenDetailOrderitem extends Component {
  render() {
    return (
        <View style={styles.cardLayout}>
            <Image style={styles.cardImage} source={this.props.coverURL} c/>
            <View style={styles.cardContent}>
            <Text style={styles.author}> {this.props.author} </Text>
          <Text style={styles.title}> {this.props.title} </Text>
          </View>
        </View>
    );
  }
}

export default KitchenDetailOrderitem;
