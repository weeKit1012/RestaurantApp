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
  title: {
    fontFamily: "inter-bold",
    fontSize: 30,
  },
  subTitle: {
    fontFamily: "inter-regular",
  },

  sectionHeader: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: "bold",
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
