import { StyleSheet } from "react-native";
import { backgroundColor } from "styled-system";

const Styles = StyleSheet.create({
kitchenOrderContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 15,
    borderRadius: 5,
    flex:1,
    flexDirection:'column'
  },

  kitchenOrderSectionHeader: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 10,
    backgroundColor:'#ff9966',
    fontSize:24,
    color:'#ffffff',
  },

  kitchenOrderSectionHeaderText: {
    fontSize:24,
    color:'#ffffff',
  },

  kitchenCardContainer:{
    borderColor:'black', 
    borderWidth:1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 1,
    backgroundColor:'#f2f2f2',
    borderRadius:15,
  },

  kitchenOrderDetailCardContainer:{
    borderColor:'black', 
    borderWidth:1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 1,
    flex:1,
    backgroundColor:'#f2f2f2',
    borderRadius:15,
    flexDirection:'row',
    marginVertical: 10,    
  },

  kitchenButton:{
    height:60,
    backgroundColor: "#f98640",
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    margin:20,
  },
  kitchenSectionDivider:{
      backgroundColor: '#f2f2f2',
      height:2,
  },
  kitchenButtonText:{
    fontFamily: "inter-bold",
    color: "#fff",
    justifyContent: "center",
    fontSize: 20,
  },

  kitchenDetailsOrderHeaderContainer:{
    borderColor:'black', 
    borderWidth:1,
    backgroundColor:'#ff9966',
    borderRadius:5,
    color:'#ff9966',
    fontSize:24,
    flex:0.1,
  },

  kitchenDetailsOrderHeaderText:{
    fontSize:24,
    margin: 5,

  },

  kitchenButton: {
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
 
  kitchenButtonText: {
    fontFamily: "inter-bold",
    color: "#fff",
    justifyContent: "center",
    fontSize: 20,
  },
  buttonReject: {
    height: 60,
    width: 250,
    backgroundColor: "red",
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 40,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  kitchenTextInput: {
    alignSelf: "stretch",
    padding: 10,
    paddingBottom: 5,
    marginLeft: 0,
    borderBottomColor: "#474747",
    margin: 5,
    marginRight: 0,
    borderBottomWidth: 2, 

    fontFamily: "inter-regular",
    fontSize: 18,
  },
})

export default Styles;