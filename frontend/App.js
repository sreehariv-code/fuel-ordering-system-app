import React, { useCallback } from "react";

import { View, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import UserContextProvider from "./context/userContext/context";

import Routes from "./routes/routes";

//Keep the splash screen visible while we fetch the resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "unbound-regular": require("./assets/fonts/Unbounded-Regular.ttf"),
    "unbound-bold": require("./assets/fonts/Unbounded-Bold.ttf"),
    "IBMPlexSans-Bold": require("./assets/fonts/IBMPlexSans-Bold.ttf"),
    "IBMPlexSans-Medium": require("./assets/fonts/IBMPlexSans-Medium.ttf"),
    "IBMPlexSans-Regular": require("./assets/fonts/IBMPlexSans-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <UserContextProvider>
        <Routes />
      </UserContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
