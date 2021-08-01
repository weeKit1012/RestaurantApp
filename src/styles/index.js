import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
    // justifyContent: "center",
    // alignItems: "center",
  },
  headerFont: {
    fontFamily: "fredoka-one-regular",
  },
  titleText: {
    fontFamily: "inter-bold",
    fontSize: 30,
  },
  titleDivider: {
    marginTop: 5,
    height: 1,
    backgroundColor: "black",
    opacity: 0.2,
  },
  normalText: {
    fontFamily: "inter-regular",
    fontSize: 16,
  },
});

export default Styles;
