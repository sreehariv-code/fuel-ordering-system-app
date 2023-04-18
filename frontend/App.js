import React, { Component, useState, useEffect, useCallback } from "react";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Entypo } from "@expo/vector-icons";
import HomeScreen from "./screens/Home/HomeScreen";
// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

//Keep the splash screen visible while we fetch the resources
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

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

  // const LoadFonts = async () => {
  //   await useFonts();
  // };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: "#eee",
              },
              headerTitle: "",
              headerLeft: () => (
                <TouchableOpacity>
                  <Entypo name="chevron-left" size={24} color="black" />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: "#eee",
              },
            }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShadowVisible: false,
              headerTitle: "",
              headerStyle: {
                padding: 100,
                backgroundColor: "#eee",
              },

              header: () => (
                <SafeAreaView
                  style={{
                    paddingTop: 60,
                    paddingHorizontal: 15,
                    paddingBottom: 10,
                    backgroundColor: "#eee",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 50,
                      height: 50,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                    }}
                  >
                    <Image
                      source={require("./assets/images/profile.jpg")}
                      resizeMode="cover"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 10,
                      }}
                    />
                  </TouchableOpacity>
                </SafeAreaView>
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
