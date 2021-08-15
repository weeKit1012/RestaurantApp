import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Dimensions  } from "react-native";

import { Text} from "react-native-elements";
import firebase from "../login/FirebaseConfig";
import {
  PieChart
} from "react-native-chart-kit";

const FavMenuTab = ({ navigation }) => {
  const screenWidth = Dimensions.get('window').width;
    useEffect(() => {
      getDiagram();
  }, []);

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
        }
  const [foodList, setFoodList] = useState([]);
  
  const getDiagram = async () => {
    await firebase
      .firestore()
      .collection("foods")
      .get()
      .then((querySnapshot) => {
        const orderArray = [];
        querySnapshot.forEach((documentSnapshot) => {
          const color = getRandomColor();
          var obj = documentSnapshot.data();
          obj.id = documentSnapshot.id;
          orderArray.push({
            name:obj.foodName,
            orderQuantity: parseInt(obj.foodPopularity),
            color: color,
            legendFontColor: color,
          });
        });
        setFoodList(orderArray);
        console.log("complete")
      });
  };

  return (
<SafeAreaView style={{flex:1, flexDirection:'column'}}>
<View style={{flex:0.1}}>
  <Text style={{fontWeight:'bold', fontSize:24}}>Popular Product</Text>
  <Text style={{fontSize:18}}>This diagram show the popularity of the food where it shown total order of each foods</Text>
          </View>          
  <View style ={{flex:0.8}}>   
<PieChart
  data={foodList}
  width={screenWidth}
  height={500}
  chartConfig={chartConfig}
  accessor={"orderQuantity"}
  backgroundColor={"transparent"}
  paddingLeft={"15"}
  center={[10, 50]}
  absolute
/>
</View>
</SafeAreaView>
  );
};

export default FavMenuTab;
