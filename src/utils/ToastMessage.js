import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Toast } from "react-native-popup-confirm-toast";

const bottomToast = (title, text) => {
  Toast.show({
    title: title,
    text: text,
    backgroundColor: "#18A558",
    timeColor: "#ffff",
    timing: 3000,
    icon: <AntDesign name="check" size={24} color="white" />,
    position: "bottom",
  });
};

export { bottomToast };
