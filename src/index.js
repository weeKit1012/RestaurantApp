import React, { useState } from "react";
import { LogBox } from "react-native";
import _ from "lodash";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { ThemeProvider } from "styled-components";
import { ToastProvider } from "react-native-styled-toast";

// import Navigator from "_navigations";
// import theme from "_styles/theme";
import Navigator from "./navigations";
import theme from "./styles/theme";

const fetchFonts = () => {
  return Font.loadAsync({
    "fredoka-one-regular": require("./assets/fonts/FredokaOne-Regular.ttf"),
    "inter-bold": require("./assets/fonts/Inter-Bold.otf"),
    "inter-regular": require("./assets/fonts/Inter-Regular.otf"),
  });
};

const App = () => {
  // LogBox.ignoreLogs(["Setting a timer"]);
  // const _console = _.clone(console);
  // console.warn = (message) => {
  //   if (message.indexOf("Setting a timer") <= -1) {
  //     _console.warn(message);
  //   }
  // };

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <Navigator />
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
